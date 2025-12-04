# ChaosOdds Module Documentation Index

## 📖 Полный список документации

### Начало работы

1. **[START_HERE.md](../START_HERE.md)** 🎯  
   Начните отсюда! Краткий обзор и навигация по документации.

2. **[QUICK_REFERENCE.md](../QUICK_REFERENCE.md)** ⚡  
   Быстрая шпаргалка - все самое важное на одной странице.

3. **[SETUP.md](../SETUP.md)** 🛠  
   Инструкции по установке, сборке и первому запуску.

### Разработка

4. **[ARCHITECTURE.md](../ARCHITECTURE.md)** 🏗  
   Детальное описание архитектуры Rust + JSI.

5. **[CONTRIBUTING.md](../CONTRIBUTING.md)** 🤝  
   Руководство для разработчиков - как добавлять функциональность.

6. **[example.ts](../example.ts)** 💡  
   Готовые примеры использования модуля.

### Справочная информация

7. **[README.md](../README.md)** 📚  
   Полная документация модуля.

8. **[CHANGELOG.md](../CHANGELOG.md)** 📝  
   История изменений и версий.

9. **[INTEGRATION_SUMMARY.md](../INTEGRATION_SUMMARY.md)** ✅  
   Итоговый отчет о проделанной интеграции.

---

## 🎓 Рекомендуемый порядок изучения

### Уровень 1: Быстрый старт (30 минут)
1. START_HERE.md
2. QUICK_REFERENCE.md
3. example.ts (пробежаться глазами)

**Результат:** Вы можете использовать модуль в своем приложении.

### Уровень 2: Практика (2 часа)
1. SETUP.md (полностью)
2. example.ts (попробовать все примеры)
3. README.md (разделы Usage)

**Результат:** Вы уверенно работаете с API модуля.

### Уровень 3: Понимание (4 часа)
1. ARCHITECTURE.md (полностью)
2. Изучение исходников (`cpp/`, `rust/src/`)
3. README.md (полностью)

**Результат:** Вы понимаете как все работает изнутри.

### Уровень 4: Мастерство (8+ часов)
1. CONTRIBUTING.md (полностью)
2. Добавление собственных функций
3. Оптимизация и профилирование

**Результат:** Вы можете расширять и модифицировать модуль.

---

## 🎯 Документация по задачам

### Я хочу...

#### ...быстро начать использовать модуль
→ START_HERE.md → QUICK_REFERENCE.md → example.ts

#### ...понять архитектуру
→ ARCHITECTURE.md → исходники в `cpp/` и `rust/src/`

#### ...добавить новую функцию
→ CONTRIBUTING.md раздел "Making Changes"

#### ...решить проблему со сборкой
→ SETUP.md раздел "Troubleshooting"

#### ...посмотреть примеры
→ example.ts

#### ...узнать все возможности
→ README.md

---

## 📊 Структура документации

```
docs/
└── index.md                  ← Вы здесь

../
├── START_HERE.md            ← Главная точка входа
├── QUICK_REFERENCE.md       ← Шпаргалка
├── SETUP.md                 ← Setup guide
├── ARCHITECTURE.md          ← Архитектура
├── CONTRIBUTING.md          ← Для разработчиков
├── README.md                ← Полная документация
├── CHANGELOG.md             ← История
├── INTEGRATION_SUMMARY.md  ← Итоги
└── example.ts               ← Примеры
```

---

## 🔗 Внешние ресурсы

### React Native & JSI
- [JSI Documentation](https://reactnative.dev/docs/the-new-architecture/pillars-turbomodules)
- [New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)
- [Fabric Renderer](https://reactnative.dev/docs/the-new-architecture/pillars-fabric-components)

### Rust
- [Rust Book](https://doc.rust-lang.org/book/)
- [Rust FFI Guide](https://doc.rust-lang.org/nomicon/ffi.html)
- [Serde Documentation](https://serde.rs/)
- [Cargo Book](https://doc.rust-lang.org/cargo/)

### Expo
- [Expo Modules API](https://docs.expo.dev/modules/overview/)
- [Creating Native Modules](https://docs.expo.dev/modules/get-started/)
- [Module Config](https://docs.expo.dev/modules/module-config/)

### Build Tools
- [CMake Tutorial](https://cmake.org/cmake/help/latest/guide/tutorial/)
- [CocoaPods Guides](https://guides.cocoapods.org/)
- [Gradle User Manual](https://docs.gradle.org/current/userguide/userguide.html)

### Platform-Specific
- [JNI Specification](https://docs.oracle.com/javase/8/docs/technotes/guides/jni/)
- [Android NDK Guide](https://developer.android.com/ndk/guides)
- [iOS Development](https://developer.apple.com/documentation/)

---

## 🏷 Теги и категории

### По сложности
- 🟢 **Beginner**: START_HERE, QUICK_REFERENCE, example.ts
- 🟡 **Intermediate**: SETUP, README, CONTRIBUTING
- 🔴 **Advanced**: ARCHITECTURE, исходники C++/Rust

### По типу
- 📖 **Tutorial**: START_HERE, SETUP
- 📚 **Reference**: QUICK_REFERENCE, README, ARCHITECTURE
- 💡 **Examples**: example.ts
- 🔧 **Development**: CONTRIBUTING
- 📝 **Meta**: CHANGELOG, INTEGRATION_SUMMARY

### По платформе
- 🍎 **iOS**: разделы iOS в ARCHITECTURE, SETUP
- 🤖 **Android**: разделы Android в ARCHITECTURE, SETUP
- 🌐 **Cross-platform**: все остальное

---

## 📞 Где искать помощь

| Проблема | Где искать |
|----------|------------|
| Не знаю с чего начать | START_HERE.md |
| Нужна быстрая справка | QUICK_REFERENCE.md |
| Ошибка сборки | SETUP.md → Troubleshooting |
| Как использовать API | example.ts, README.md |
| Как добавить функцию | CONTRIBUTING.md |
| Почему так сделано | ARCHITECTURE.md |
| Что изменилось | CHANGELOG.md |

---

## 🎓 Глоссарий

- **JSI** - JavaScript Interface, прямой доступ к JS runtime
- **FFI** - Foreign Function Interface, взаимодействие между языками
- **Bridge** - старый механизм RN (медленный, async)
- **Rust** - системный язык программирования
- **serde** - Rust библиотека для сериализации
- **JNI** - Java Native Interface
- **CMake** - система сборки C++
- **XCFramework** - формат iOS библиотеки
- **Turbo Modules** - новая архитектура RN

---

## ✨ Следующие шаги

1. Откройте **START_HERE.md**
2. Следуйте инструкциям быстрого старта
3. Изучайте остальную документацию по необходимости

---

<div align="center">

**Удачи в изучении!** 📖

</div>

