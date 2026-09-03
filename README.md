# Путь Авто — сайт

Одностраничный лендинг компании **Путь Авто** (Иркутск): подбор и доставка авто из Японии, Кореи и Китая.

Живая версия: https://teassty.github.io/put-auto/

## Стек

- Один файл `index.html` (Tailwind CDN + custom CSS + vanilla JS + GSAP)
- Фото в `images/`
- Деплой: **GitHub Pages** (Actions) — артефакт из `index.html` + `images/`

## Локальный просмотр

Откройте `index.html` в браузере или поднимите статический сервер из корня репозитория:

```bash
npx --yes serve .
```

## Контакты

| Поле | Значение |
|------|----------|
| Телефон | +7 (950) 144-44-18 |
| WhatsApp | https://wa.me/79501444418 |
| Telegram | https://t.me/putavto38 |
| VK | https://vk.ru/put_auto |
| Адрес | Иркутск, ул. Дзержинского, 32 стр. 1, оф. 323, ТЦ «Пассаж» |

## Заявки

На GitHub Pages форма открывает **WhatsApp** с предзаполненным текстом. На Netlify — `data-netlify="true"` Forms.

## GitHub Pages

Workflow: `.github/workflows/deploy-pages.yml` собирает `_site/` из корневого `index.html` и папки `images/`.

## Медиа

Фото взяты из публичной галереи / отзывов карточки на Яндекс.Картах.
