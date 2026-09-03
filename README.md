# Путь Авто — сайт

Лендинг компании **Путь Авто** (Иркутск): подбор и доставка авто из Японии, Кореи и Китая.

Живая демо-версия (GitHub Pages): https://teassty.github.io/put-auto/

## Стек

- [Astro](https://astro.build) (static)
- Vanilla JS + CSS
- Деплой: **GitHub Pages** (Actions) и опционально Netlify

## Локальный запуск

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

Сборка как для GitHub Pages (с `base: /put-auto`):

```bash
# Windows PowerShell
$env:GITHUB_PAGES="true"; npm run build
```

## Контакты в коде

| Поле | Значение |
|------|----------|
| Телефон | +7 (950) 144-44-18 |
| WhatsApp | https://wa.me/79501444418 |
| Telegram | https://t.me/putavto38 |
| VK | https://vk.ru/put_auto |
| Адрес | Иркутск, ул. Дзержинского, 32 стр. 1, оф. 323, ТЦ «Пассаж» |

## Заявки (формы)

1. **GitHub Pages** — Netlify Forms недоступны; форма открывает **WhatsApp** с предзаполненным текстом (fallback).
2. **Netlify** — форма `name="lead"` с `data-netlify="true"` и honeypot. В кабинете Netlify: Forms → уведомления на email / Slack / Telegram-бот через интеграцию.

Переменные окружения для кастомного домена / Telegram-бота (на будущее):

```env
PUBLIC_PHONE=+79501444418
PUBLIC_WHATSAPP=79501444418
PUBLIC_TELEGRAM=putavto38
# TELEGRAM_BOT_TOKEN=...
# TELEGRAM_CHAT_ID=...
```

Скопируйте `.env.example` → `.env` при подключении бэкенда уведомлений.

## GitHub Pages

Workflow: `.github/workflows/deploy-pages.yml`

После первого пуша в `main`:

1. Repo → **Settings → Pages**
2. Source: **GitHub Actions**
3. Дождаться успешного workflow **Deploy to GitHub Pages**

## Шаги для владельца бизнеса

1. Проверить тексты, цифру «400+» и часы работы.
2. Прислать фирменный HEX логотипа (если акцент `#C45C26` нужно заменить).
3. Подключить свой домен (GitHub Pages → Custom domain или Netlify DNS).
4. Настроить уведомления о заявках (WhatsApp/Telegram уже работают как fallback).
5. Добавить свежие фото выдач в `public/images/` и обновить блок «Выдачи».

## Медиа

Фото взяты из публичной галереи / отзывов карточки на Яндекс.Картах. Стоковые лица не используются.
