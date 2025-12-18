# Chaos Bag Probability Calculation: Algorithms and Optimizations

## Table of Contents

1. [What Does This System Do?](#what-does-this-system-do)
2. [Simple Examples for Understanding](#simple-examples-for-understanding)
3. [Core Algorithms (Detailed)](#core-algorithms-detailed)
4. [How Data is Stored (Bit Packing)](#how-data-is-stored-bit-packing)
5. [How Probabilities are Calculated (Step by Step)](#how-probabilities-are-calculated-step-by-step)
6. [How Duplicate Calculations are Avoided (Deduplication)](#how-duplicate-calculations-are-avoided-deduplication)
7. [Speed Optimizations](#speed-optimizations)
8. [Memory Optimizations](#memory-optimizations)
9. [Parallel Processing](#parallel-processing)

---

## What Does This System Do?

### The Problem

You have a bag of tokens. Each token has:
- **A value** (+2, -1, 0) — modifier for skill checks
- **Additional draws (reveal)** — some tokens require drawing more tokens

**What are tokens with additional draws:**
In the game, some tokens require drawing additional tokens when drawn. For example:
- Token "bless" with reveal=1 means: drew bless → need to draw 1 more token
- Token "tablet" with reveal=2 means: drew tablet → need to draw 2 more tokens
- In the fan scenario Strange Moons from The Dark Matter expansion, there's a token with reveal=2

These tokens are called **tokens with additional draws** (or reveal tokens). Regular tokens have reveal=0 and don't require additional draws.

**Question:** What are all possible final outcomes and their probabilities?

### Example

**Bag:**
- 2 tokens "bless" (value +2, reveal=1) — token with additional draws, requires drawing 1 more token
- 1 token "curse" (value -2, reveal=1) — token with additional draws, requires drawing 1 more token
- 3 tokens "0" (value 0, reveal=0) — regular tokens without additional draws

**What needs to be computed:**
1. All possible final modifiers (+2, -2, +4, -4, 0, +2-2=0, etc.)
2. Probability of each modifier
3. A 100×100 matrix: for each skill (0-99) and difficulty (0-99) combination — success probability

### Why

A player wants to know: "If I have skill 5 and difficulty 3, what's my success probability?" The system precomputes this for all combinations.

---

## Simple Examples for Understanding

### Example 1: Simple Tokens Without Reveal

**Bag:** 2 tokens "+1" and 1 token "-1"

**Possible outcomes:**
- Draw "+1": probability = 2/3 = 0.666... (66.7%)
- Draw "-1": probability = 1/3 = 0.333... (33.3%)

**Result:**
- Modifier +1 with probability 66.7%
- Modifier -1 with probability 33.3%

### Example 2: Tokens With Additional Draws

**Bag:** 1 token "bless" (reveal=1, +2) and 2 tokens "0" (reveal=0, 0)

**What happens:**
1. Draw "bless" (probability 1/3)
   - This is a token with additional draws, need to draw 1 more token
   - Remaining: 2 tokens "0"
   - Draw "0" (probability 2/2 = 1.0)
   - **Result:** modifier +2, probability = (1/3) × 1.0 = 1/3

2. Draw "0" (probability 2/3)
   - reveal=0, this is a regular token, nothing more needed
   - **Result:** modifier 0, probability = 2/3

**Result:**
- Modifier +2: 33.3%
- Modifier 0: 66.7%

### Example 3: Chain of Additional Draws

**Bag:**
- 1 token "tablet" (reveal=2, 0) — token with additional draws, requires drawing 2 tokens
- 1 token "bless" (reveal=1, +2) — token with additional draws, requires drawing 1 token
- 1 token "curse" (reveal=1, -2) — token with additional draws, requires drawing 1 token
- 2 tokens "0" (reveal=0, 0) — regular tokens

**Possible paths:**

**Path 1:** Draw tablet (1/5)
- This is a token with additional draws (reveal=2), need to draw 2 tokens
- Remaining: bless, curse, 0, 0
- Draw bless (1/4) — also a token with additional draws (reveal=1), need to draw 1 more
- Draw curse (1/3)
- **Result:** modifier 0+2-2=0, probability = (1/5) × (1/4) × (1/3) = 1/60

**Path 2:** Draw tablet (1/5)
- Draw bless (1/4), then 0 (1/3)
- **Result:** modifier 0+2+0=+2, probability = (1/5) × (1/4) × (1/3) = 1/60

...and so on for all combinations.

**Problem:** The number of paths grows exponentially. We need a smart algorithm.

---

## Core Algorithms (Detailed)

### Algorithm 1: Depth-First Search (DFS) — Main Algorithm

**Idea:** Systematically enumerate all possible token drawing paths using a "stack" to store states.

#### What Is a "State"?

A state is a "snapshot" of the situation:
- Which tokens are still available in the bag
- Which tokens have been drawn
- Current accumulated modifier
- Current probability of this path
- How many more tokens need to be drawn (pending_reveal)

#### How DFS Works (Step by Step):

**Step 1: Initialization**
- Create initial states for each token with additional draws (reveal > 0)
- For example, if there's 1 token "bless" (reveal=1):
  - State: drew bless, 1 additional draw remaining, modifier = +2, probability = 1/total_count

**Step 2: Processing**
- Take a state from the stack
- If pending_reveal == 0 — final state, save result
- Otherwise: for each available token, create a new state:
  - Decrease count of this token in bag
  - Increase counter of drawn tokens of this type
  - Update modifier: old + token value
  - Update probability: old × (token_count / total_remaining)
  - Update pending_reveal: old - 1 + token_reveal
  - Put new state on stack

**Step 3: Deduplication**
- If we've already processed the same state, don't create duplicate
- Accumulate probability in the existing state

**Step 4: Finalization**
- When pending_reveal == 0, apply multinomial coefficient
- Save result in cache

#### DFS Visualization:

```
Start: [bless(1), curse(1), 0(2)]
       ↓
  Draw bless (probability 1/4)
       ↓
State 1: [curse(1), 0(2)], modifier=+2, pending=1
       ↓
  Draw curse (probability 1/3)
       ↓
State 2: [0(2)], modifier=+2-2=0, pending=0 ← FINAL
       ↓
  Draw 0 (probability 2/3)
       ↓
State 3: [curse(1), 0(1)], modifier=+2, pending=0 ← FINAL
```

### Algorithm 2: Multinomial Coefficients

#### Why Are They Needed?

When we draw multiple identical tokens, the order doesn't matter, but we counted them as different paths.

**Example:**
- Drew: 2×bless and 1×curse
- Possible orders: (bless, bless, curse), (bless, curse, bless), (curse, bless, bless)
- All 3 paths give the same result, but we counted them separately!

**Solution:** Multiply probability by number of permutations.

#### Formula:

```
Number of permutations = n! / (k₁! × k₂! × ... × kₘ!)
```

where:
- `n` — total tokens drawn
- `k₁, k₂, ...` — count of each type drawn

**Example:**
- Drew: 2×bless, 1×curse (total 3 tokens)
- Permutations: 3! / (2! × 1!) = 6 / 2 = 3
- If each path had probability P, final probability = P × 3

#### How This Is Computed Quickly:

**Fast Path (Small Numbers):**
- Precomputed factorials for numbers ≤ 20
- Direct computation: 3! = 6, 2! = 2, 1! = 1 → 6/(2×1) = 3

**Slow Path (Large Numbers):**
- Use logarithms to avoid overflow
- ln(100!) is too large, but ln(100!) - ln(50!) - ln(50!) can be computed
- Then take exp() of result

**Caching:**
- All computed coefficients are saved in cache
- If we encounter the same combination — get from cache

---

## How Data is Stored (Bit Packing)

### Problem

Need to store lots of information compactly. Normally we would use arrays:
```rust
available_counts: [3, 2, 1, 0, ...]  // How many tokens of each type available
drawn_counts: [1, 0, 2, 0, ...]       // How many tokens of each type drawn
```

But this takes a lot of memory. Instead, we use **bit packing**.

### What Is Bit Packing

Instead of storing numbers in separate memory cells, we "pack" them into one large number.

**Example:**
- Want to store 4 numbers from 0 to 3 (each takes 2 bits)
- Numbers: [2, 1, 3, 0]
- Packing: `2 | (1 << 2) | (3 << 4) | (0 << 6) = 2 + 4 + 48 + 0 = 54`
- Unpacking: `(54 >> 0) & 3 = 2`, `(54 >> 2) & 3 = 1`, etc.

### What Are Bit Masks

**Bit mask** — a number where each bit represents some property. If a bit is set (equals 1), the property is active.

**Simple example:**
- We have 4 token groups: 0, 1, 2, 3
- Groups 0, 1, and 3 are available (have tokens), group 2 is not
- Mask: `0b1011` (binary) = 11 (decimal)
  - Bit 0 = 1 → group 0 is available
  - Bit 1 = 1 → group 1 is available
  - Bit 2 = 0 → group 2 is not available
  - Bit 3 = 1 → group 3 is available

**How to work with masks:**

```rust
// Set bit (mark group as available)
mask |= (1 << 2);  // Set bit 2: mask = 0b1011 | 0b0100 = 0b1111

// Clear bit (mark group as unavailable)
mask &= !(1 << 1);  // Clear bit 1: mask = 0b1111 & 0b1101 = 0b1101

// Check if bit is set
if (mask & (1 << 0)) != 0 { 
    // Bit 0 is set, group 0 is available
}

// Find first set bit (fast CPU operation)
let group_idx = mask.trailing_zeros();  // For 0b1011 returns 0 (first set bit)
mask &= mask - 1;  // Clear lowest set bit: 0b1011 → 0b1010
```

**Why this is useful:**
- Instead of checking all 32 groups, we only check those where the bit is set
- Much faster: O(available_groups) instead of O(all_groups)

### How This Works in Our System:

#### state1 (128 bits = 16 bytes):

```
Bits 0-31:   available_mask (32 bits)
             Each bit = 1 if group has available tokens
             
Bits 32-127: reveal (96 bits)
             Each group = 4 bits (max 15 tokens)
             Max 24 groups: 24 × 4 = 96 bits
```

**Example:**
- Groups: 0, 1, 2, 3 (4 groups)
- available_mask: bits 0, 1, 3 set → `0b1011` = 11
- reveal: group 0 drawn 2 times, group 1 — 1 time
- reveal = `(2 << 32) | (1 << 36)` = huge number, but it's just 1 number!

#### state2 (128 bits = 16 bytes):

```
Bits 0-62:   available_counts (63 bits)
             Each group = 3 bits (max 7 tokens)
             Max 21 groups: 21 × 3 = 63 bits
```

**Example:**
- Group 0: 3 tokens → `3` (3 bits: `011`)
- Group 1: 2 tokens → `2` (3 bits: `010`)
- state2 = `3 | (2 << 3)` = `3 + 16 = 19`

### Advantages:

1. **Compactness:** 2 numbers (32 bytes) instead of arrays (hundreds of bytes)
2. **Speed:** Bit operations are very fast (1-2 CPU cycles)
3. **Cache:** Less memory = better fit in CPU cache
4. **Hashing:** Easy to create hash from two numbers for deduplication

### How to Extract Data:

**Get available token count for group i:**
```rust
count = (state2 >> (i * 3)) & 0x7
// Shift right by i*3 bits, take lower 3 bits
```

**Set bit in mask:**
```rust
mask |= (1 << i)  // Set bit i
```

**Check if bit is set:**
```rust
if (mask & (1 << i)) != 0 { ... }  // Bit i is set
```

---

## How Probabilities are Calculated (Step by Step)

### Basic Probability Formula

When we draw a token from the bag, probability of drawing a specific token:

```
P(draw_token_type_X) = (count_of_type_X_tokens_in_bag) / (total_tokens_in_bag)
```

**Example:**
- In bag: 3 tokens "+1", 2 tokens "-1"
- Total: 5 tokens
- Probability of drawing "+1": 3/5 = 0.6 (60%)
- Probability of drawing "-1": 2/5 = 0.4 (40%)

### Accumulating Probabilities Along a Path

When we follow a path (chain of draws), probabilities **multiply**:

```
P(path) = P(step1) × P(step2) × P(step3) × ... × P(stepN)
```

**Step-by-Step Example:**

**Bag:** 1×bless (reveal=1), 2×0 (reveal=0)

**Path: Draw bless, then 0**

1. **Step 1:** Draw bless
   - Probability: 1/3 = 0.333...
   - Remaining in bag: 2×0
   - Need to draw: 1 token (reveal=1)

2. **Step 2:** Draw 0
   - Probability: 2/2 = 1.0
   - Remaining in bag: 1×0
   - Need to draw: 0 tokens (reveal=1-1+0=0) ← FINAL

3. **Final path probability:**
   - P = (1/3) × 1.0 = 1/3 = 0.333... (33.3%)

### Optimization: Precomputed Reciprocals

**Problem:** Division is slow (10-20 CPU cycles)

**Solution:** Instead of `a / b`, use `a × (1/b)`, where `1/b` is computed once in advance.

**Example:**
- Normal: `probability = count / total` (division every time)
- Optimized: `reciprocal = 1.0 / total` (once), then `probability = count × reciprocal` (multiplication — faster!)

### Probability Table

For even more speed, we create a table of all possible probabilities in advance:

```
prob_table[group_idx][available_count - 1][available] = available / available_count
```

**Example:**
- Group 0, available_count = 5, available = 3
- prob_table[0][4][3] = 3/5 = 0.6

**Table Size:**
- 32 groups × 100 available_count values × 8 available values = 25,600 values
- Each value = 4 bytes (f32) = 102,400 bytes ≈ 100 KB
- Fits in L2 CPU cache (usually 256 KB - 1 MB)

**Why f32 instead of f64?**
- f32 = 4 bytes, f64 = 8 bytes
- Savings: 50% memory (100 KB instead of 200 KB)
- f32 precision is sufficient for availability checks
- Final computations still in f64 for precision

---

## Deduplication

### Problem

Same state can be reached by different paths.

**Example:**
- **Path 1:** Draw bless, then curse
- **Path 2:** Draw curse, then bless

Both paths lead to the same final state:
- Drew: 1×bless, 1×curse
- Modifier: +2-2 = 0
- But probabilities are different: P₁ and P₂

**Solution:** Accumulate probabilities in one place, don't process state twice.

### How It Works

#### Step 1: Create Index from State

Use a hash function to convert state to a number from 0 to 127,999:

```rust
index = hash(state1, state2, pending_reveal) % 128000
```

**How hash works:**
- Combine state1, state2, and pending_reveal
- Use XOR and multiplication by constants for uniform distribution
- Take remainder when divided by 128,000

#### Step 2: Store Probabilities in Array

```rust
dedup_array[index] = accumulated_probability
dedup_used[index] = true/false (whether this index is used)
```

**Example:**
- State → index = 42,345
- First time: `dedup_array[42345] = 0.1`, `dedup_used[42345] = true`
- Second time (same state): `dedup_array[42345] += 0.05` → now 0.15

#### Step 3: Optimizations

**Local Cache (L1):**
- Store 16 most recently used indices in small array on stack (256 bytes)
- If index is in local cache — get from there (fast, no main memory access)
- If not — go to main array

**Last Index Cache:**
- Save last used index and its probability
- Often sequential accesses to the same index
- If index matches — update immediately, no checks

**Batch Processing:**
- Accumulate up to 4 (index, probability) pairs before writing
- Enables SIMD (processing multiple values simultaneously)

### Deduplication Visualization:

```
Path 1: bless → curse
  ↓
State: [bless:1, curse:1], pending=0
  ↓
Hash → index = 12345
  ↓
dedup_array[12345] = 0.1 (first time)

Path 2: curse → bless
  ↓
State: [bless:1, curse:1], pending=0 (SAME!)
  ↓
Hash → index = 12345 (SAME!)
  ↓
dedup_array[12345] += 0.05 → now 0.15 (accumulated!)
```

---

## Speed Optimizations

### 1. Iterate Only Over Available Groups

**Problem:** If we have 32 groups but only 3 are available, why check all 32?

**Solution:** Use bit mask and iterate only over set bits.

**Normal Way (Slow):**
```rust
for i in 0..32 {
    if available[i] > 0 {  // Check every time
        // process group i
    }
}
```

**Optimized Way (Fast):**
```rust
let mut mask = available_mask;  // Bit mask: bit i = 1 if group i available
while mask != 0 {
    let i = mask.trailing_zeros();  // Find first set bit (fast CPU instruction)
    mask &= mask - 1;  // Clear this bit
    // process group i (already know it's available!)
}
```

**Speed:** O(available_groups) instead of O(all_groups)

### 2. Precomputed Flags

**Problem:** String comparisons are slow (10-50 CPU cycles)

**Example of Slow Code:**
```rust
if token.token_type == "frost" {  // String comparison - slow!
    // ...
}
```

**Solution:** Precompute array of boolean values once:

```rust
// Once at start:
group_is_frost[i] = (groups[i].token.token_type == "frost")

// In hot loop:
if group_is_frost[i] {  // Boolean comparison - 1 cycle!
    // ...
}
```

### 3. Caching Intermediate Values

**Problem:** Repeatedly extracting data from packed state

**Example:**
```rust
// Bad: extract reveal twice
let reveal1 = get_reveal(state1);
let reveal2 = get_reveal(state1);  // Repeated operation!
```

**Solution:** Cache extracted values:

```rust
let reveal = get_reveal(state1);  // Once
// Use reveal everywhere needed
```

### 4. Early Exit from Loops

**Problem:** Processing states that won't lead to results anyway

**Solution:** Check conditions early:

```rust
if available_count == 0 {
    continue;  // No available tokens - skip
}

if token.is_fail {
    continue;  // Fail tokens not processed
}
```

### 5. SIMD Optimization

**What Is SIMD:**
- Single Instruction, Multiple Data
- Process multiple values simultaneously with one instruction
- Simpler: CPU can add 2 numbers at once instead of one after another

**Example:**
```rust
// Normal: process one at a time
array[0] += prob0;
array[1] += prob1;

// With SIMD: process 2 simultaneously
let probs = f64x2::from_array([prob0, prob1]);
let existing = f64x2::from_array([array[0], array[1]]);
let result = existing + probs;  // One operation for two values!
array[0] = result[0];
array[1] = result[1];
```

**Speedup:** Up to 2-4× for suitable operations

---

## Memory Optimizations

### 1. Fixed Stack Instead of Dynamic

**What is a stack:**
A stack is a data structure where elements are added and removed using "last in, first out" (LIFO) principle. Think of a stack of plates: you put on top, you take from top.

In the DFS algorithm, the stack stores states that need to be processed:
- Put a new state on the stack (push)
- Take a state from the stack for processing (pop)
- Process and add new states back to the stack

**Problem:** Dynamic stack (Vec) requires heap allocation, which is slow (100-1000 CPU cycles)

**Normal Way:**
```rust
let mut stack: Vec<State> = Vec::new();  // Heap allocation
stack.push(state);  // May require memory reallocation
```

**Solution:** Fixed array on stack (fast, 1-2 cycles):

```rust
struct FixedStack {
    items: [State; 64],  // 64 elements on stack (2 KB)
    head: usize,
    tail: usize,
    len: usize,
}
```

**Advantages:**
- Zero heap allocations
- 2 KB fits in L1 CPU cache (very fast)
- Ring buffer for efficient operations

**Limitation:** Maximum 64 states simultaneously (sufficient for most cases)

**What is a ring buffer:**
- Think of the array as a circle: when we reach the end, we wrap around to the beginning
- We use two pointers: head (where we read from) and tail (where we write to)
- When tail reaches the end of the array, it "wraps around" to the beginning
- This allows efficient use of a fixed array without reallocation

**Ring buffer example:**
```
Array of size 4: [_, _, _, _]
                  ↑
                head=0, tail=0

Add element: [A, _, _, _]
              ↑     ↑
            head=0 tail=1

Add more:    [A, B, _, _]
              ↑        ↑
            head=0   tail=2

Pop:         [_, B, _, _]
                   ↑  ↑
                head=1 tail=2

Add:         [_, B, C, _]
                   ↑     ↑
                head=1  tail=3

Add (wrap!): [D, B, C, _]
              ↑  ↑
           tail=0 head=1
```

### 2. Packed Bit Arrays

**Problem:** `Vec<bool>` stores each flag as 1 byte (8 bits), but we only need 1 bit!

**Normal Way:**
```rust
let used: Vec<bool> = vec![false; 128000];  // 128,000 bytes = 128 KB
```

**Solution:** Pack 32 flags into one number:

```rust
let used: Vec<u32> = vec![0; 4000];  // 128000/32 = 4000 elements = 16 KB
// Savings: 8× less memory!
```

**How to Check Bit:**
```rust
fn is_used(&self, idx: usize) -> bool {
    let word_idx = idx / 32;  // Which number stores it
    let bit_idx = idx % 32;   // Which bit in that number
    (self.used[word_idx] & (1u32 << bit_idx)) != 0
}
```

### 3. Data Type Selection

#### f32 vs f64 for Tables

**Probability Table:**
- Use `f32` (4 bytes) instead of `f64` (8 bytes)
- Savings: 50% memory (100 KB instead of 200 KB)
- f32 precision sufficient for checks
- Final computations in `f64` for precision

#### SmallVec for Small Arrays

**Problem:** Small arrays (≤16 elements) shouldn't be stored on heap

**Solution:** `SmallVec<[T; 16]>` — if ≤16 elements, stores on stack, otherwise on heap

```rust
let key: SmallVec<[usize; 16]> = ...;
// If elements ≤ 16: on stack (fast)
// If > 16: automatically moves to heap
```

### 4. Per-Thread Local Contexts

**Problem:** If multiple threads work with same data, need synchronization (locks), which is slow

**Solution:** Each thread has its own context:

```rust
struct WorkerContext {
    dedup_array: Vec<f64>,        // Own array for each thread
    dedup_used: Vec<u32>,         // Own flag array
    local_cache: HashMap<...>,   // Own cache
    // ...
}
```

**Advantages:**
- No synchronization (lock-free)
- Each thread works with its own data (better cache locality)
- Parallel processing without locks

**At End:** Results from all threads are merged in one thread

---

## Parallel Processing

### Why Is Parallelization Needed?

If we have 4 CPU cores, we can process 4 states simultaneously instead of 1 — theoretically 4× faster!

### How It Works:

#### Step 1: Split Work into Chunks

Instead of processing all root states sequentially, split them into "chunks":

```rust
let chunk_size = if roots.len() <= num_threads {
    1  // Little work - 1 element per chunk
} else {
    (roots.len() / (num_threads * 2)).max(1).min(4)  // 2-4 elements per chunk
};
```

**Logic:**
- If few roots (≤ number of threads): small chunks for maximum flexibility
- If many roots: larger chunks (2-4) for better cache locality

#### Step 2: Work-Stealing

Uses **Rayon** library, which implements work-stealing algorithm:

**How It Works:**
1. Each thread has its own task queue
2. Thread processes tasks from its queue
3. If queue is empty, thread "steals" tasks from other threads
4. This ensures even load distribution across all threads

**Visualization:**
```
Thread 1: [task1, task2, task3] ← processing
Thread 2: [task4, task5] ← processing
Thread 3: [] ← queue empty, "steals" task4 from thread 2
Thread 4: [task6] ← processing
```

#### Step 3: Merging Results

After all threads finish, results are merged:

```rust
let mut final_cache = HashMap::new();
for local_result in results_from_all_threads {
    for (key, item) in local_result {
        final_cache
            .entry(key)
            .and_modify(|e| e.probability += item.probability)  // Accumulate probabilities
            .or_insert(item);
    }
}
```

### Scalability

**Real Results:**
- **1 core:** baseline speed (100%)
- **2 cores:** ~1.8× faster (180%)
- **4 cores:** ~3.5× faster (350%)
- **8 cores:** ~6× faster (600%)

**Why Not Perfect?**
- Overhead from synchronization
- Not all parts of algorithm can be parallelized
- Memory constraints (CPU cache)

---

## Performance Characteristics

### Performance

- **Execution Time:** < 10 seconds for large bags (50+ tokens, multiple reveal tokens)
- **Memory:** ~500 KB working memory per thread
- **Scalability:** Linear speedup up to 4-8 cores

### Precision

- **Probabilities:** Computed in `f64` (double precision) for maximum precision
- **Rounding:** Only at final conversion to percentages (0-100)
- **Error Accumulation:** Minimized through precomputed reciprocals

### Reliability

- **Deduplication:** Prevents infinite loops
- **Limits:** Maximum sizes to prevent overflow
- **Validation:** Tests cover all major scenarios

---

## Conclusion

The system uses a combination of smart algorithms and many optimizations for fast and accurate probability computation. Key principles:

1. **Compact Data Representation** — bit packing instead of arrays
2. **Precomputation** — tables and caches for frequently used values
3. **Memory Locality** — data stored close together for better cache
4. **Parallelization** — using all CPU cores
5. **Precision** — right balance between speed and computation accuracy

All these optimizations work together to provide fast and accurate calculations even for complex bags with multiple tokens with additional draws.

---

## What Are L1/L2 Cache

**In simple terms:**
- CPU works very fast, but memory (RAM) is slow
- Cache is fast memory inside the CPU
- L1 cache — fastest, but small (32-64 KB)
- L2 cache — slightly slower, but larger (256 KB - 1 MB)
- L3 cache — even slower, but even larger (several MB)

**Why:**
- If data is in cache, CPU gets it instantly
- If data is not in cache, need to go to main memory (slow)
- So it's important that frequently used data fits in cache

**In our case:**
- Stack of 2 KB fits in L1 cache — very fast
- Probability table of 100 KB fits in L2 cache — fast
- Large deduplication array (128K elements) doesn't fit in cache — slower
