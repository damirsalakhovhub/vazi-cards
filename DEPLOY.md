# Инструкция по деплою проекта Cards

## Описание проекта

Проект Kanban-доски с карточками задач. Реализован на Vanilla JS без фреймворков.

## Локальный запуск

```bash
# Перейти в директорию проекта
cd /Users/damirsalakhov/Work/!\ VAIZ/Figma\ Vibe/Cards

# Запустить локальный сервер (Python)
python3 -m http.server 4000

# Открыть в браузере
open http://localhost:4000
```

## Деплой на Cloudflare Pages

Проект деплоится в раздел `damirsalakhov.com/vaiz/board/` через основной проект portfolio.

### Процесс деплоя:

1. **Скопировать файлы проекта в portfolio:**
```bash
# Создать директорию (если не существует)
mkdir -p /Users/damirsalakhov/portfolio/site/vaiz/board

# Скопировать все файлы проекта
cp -r /Users/damirsalakhov/Work/!\ VAIZ/Figma\ Vibe/Cards/* /Users/damirsalakhov/portfolio/site/vaiz/board/
```

2. **Задеплоить через wrangler:**
```bash
cd /Users/damirsalakhov/portfolio
wrangler pages deploy site --project-name=damirsalakhov --commit-dirty=true
```

3. **Проверить результат:**
- Открыть `damirsalakhov.com/vaiz/board/`
- Убедиться что проект загружается корректно

## Структура проекта

```
Cards/
├── index.html          # Главная страница
├── main.js            # Точка входа приложения
├── components/        # Компоненты (Card, CardHeader, CardLabels и т.д.)
├── styles/           # Стили компонентов
├── tokens/           # Цветовые токены (HSL/HSLA)
├── generators/       # Генераторы данных (карточки, доска)
├── data/             # Конфигурация (колонки)
└── assets/           # Статические ресурсы
```

## Важные моменты

### Пути к файлам
- Все пути в HTML должны быть относительными или абсолютными от корня
- Пример: `href="/styles/main.css"` или `href="styles/main.css"`

### Главный файл
- Главный файл должен называться `index.html` (уже настроено)

### Git
- Проект имеет свой git репозиторий
- Перед деплоем рекомендуется сделать коммит изменений

### Основной проект portfolio
- **ВАЖНО:** Не изменять файлы основного проекта portfolio
- Только копировать файлы Cards в `site/vaiz/board/`
- Не трогать другие разделы в `site/vaiz/` (landing, pomodoro и т.д.)

## Команды для быстрого деплоя

```bash
# Полный процесс (из директории Cards)
cd /Users/damirsalakhov/Work/!\ VAIZ/Figma\ Vibe/Cards
git add -A && git commit -m "Update project"
mkdir -p /Users/damirsalakhov/portfolio/site/vaiz/board
cp -r * /Users/damirsalakhov/portfolio/site/vaiz/board/
cd /Users/damirsalakhov/portfolio
wrangler pages deploy site --project-name=damirsalakhov --commit-dirty=true
```

## Проверка после деплоя

1. Открыть `damirsalakhov.com/vaiz/board/`
2. Проверить что:
   - Страница загружается
   - Стили применяются
   - JavaScript работает
   - Генератор карточек работает
   - Все интерактивные элементы функционируют

## Документация проекта

Подробное описание задач и этапов разработки находится в файле `TASK.md`.

