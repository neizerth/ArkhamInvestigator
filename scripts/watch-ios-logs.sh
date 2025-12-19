#!/bin/bash

# Скрипт для просмотра логов iOS симулятора
# Использование: ./scripts/watch-ios-logs.sh

echo "📱 Просмотр логов iOS симулятора для Investigator..."
echo "Нажмите Ctrl+C для выхода"
echo ""

# Получаем UDID запущенного симулятора
SIMULATOR_UDID=$(xcrun simctl list devices | grep Booted | head -1 | sed 's/.*(\(.*\))/\1/' | xargs)

if [ -z "$SIMULATOR_UDID" ]; then
    echo "❌ Нет запущенного симулятора"
    exit 1
fi

echo "✅ Симулятор найден: $SIMULATOR_UDID"
echo ""

# Показываем логи с фильтром
xcrun simctl spawn "$SIMULATOR_UDID" log stream \
    --predicate 'processImagePath contains "Investigator" OR eventMessage contains "ChaosOdds"' \
    --level debug \
    --style compact

