# 🔧 TurboGarage — сайт-визитка автосервиса

Статический сайт на HTML5 + CSS3 + JavaScript (без фреймворков), размещается на GitHub Pages.

## 🚀 Функциональность
- [x] Адаптивный дизайн (телефон, планшет, ПК), бургер-меню
- [x] Тёмная/светлая тема (запоминается в localStorage)
- [x] Анимации: езда машины, появление заголовка, счётчики, бегущая строка, свет за курсором
- [x] Калькулятор стоимости (localStorage)
- [x] Лайки и поиск в блоге (localStorage)
- [x] Форма записи, заявки сохраняются в localStorage
- [x] Учитывается `prefers-reduced-motion`

## 📁 Структура
```
index.html  about.html  blog.html  contact.html
css/style.css   js/script.js   img/ (logo, favicon)
```

## 🗺️ Диаграммы проекта

### Структура сайта и работа скрипта

```mermaid
flowchart TD
    V(["Посетитель"]) --> H["Header: логотип, меню, кнопка темы"]
    H --> I["index.html - Главная"]
    H --> A["about.html - О нас"]
    H --> B["blog.html - Блог"]
    H --> C["contact.html - Контакты"]

    I --> I1["Hero: анимация машины"]
    I --> I2["Услуги, статистика, новости"]
    I --> I3["Калькулятор стоимости"]
    A --> A1["Цели, команда, история"]
    B --> B1["Статьи, лайки, поиск"]
    C --> C1["Форма записи и контакты"]

    subgraph Assets["Общие ресурсы"]
        CSS["css/style.css: темы, адаптив, анимации"]
        JS["js/script.js: header/footer, тема, эффекты"]
        IMG["img/: logo.svg, favicon.svg"]
    end

    I & A & B & C -.-> CSS
    I & A & B & C -.-> JS
    I & A & B & C -.-> IMG

    JS --> LS[("localStorage")]
    LS --- L1["theme: тема"]
    LS --- L2["calc: выбор в калькуляторе"]
    LS --- L3["likes: лайки блога"]
    LS --- L4["bookings: заявки"]
```

### Git-ветки и деплой

```mermaid
gitGraph
    commit id: "feat: initial site"
    branch development
    branch test
    checkout development
    commit id: "feat: rubles and RU contacts"
    commit id: "fix: tire price"
    checkout test
    merge development
    checkout main
    merge development
    commit id: "GitHub Pages deploy" type: HIGHLIGHT
```

## 🌿 Git-ветки
`main` — стабильная версия · `development` — разработка · `test` — эксперименты

## 🌐 GitHub Pages
`https://lokifarm13.github.io/static-site_work/` — Settings → Pages → Branch `main`, папка `/ (root)`.

## 📄 Лицензия
MIT
