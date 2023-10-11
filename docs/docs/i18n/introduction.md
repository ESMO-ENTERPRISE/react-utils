---
sidebar_position: 1
---

# Introduction

## Define I18n

```ts
// App.tsx
const locales: ILocale[] = [
    {
      language: 'en',
      resources: en
    },
    {
      language: 'es',
      resources: es
    }
]

return (
    <I18nProvider language='en' locales={locales}>
      // Other components
    </I18nProvider>
)
```

```ts
// Navbar component
export function NavbarComponent() {
    const { t, language, setLanguage } = useI18n()

    return (
        // ...
        <input type="checkbox" value="" className="sr-only peer" checked={language === 'en'} onChange={() => setLanguage(language === 'en' ? 'es' : 'en')} />
    )
```

```javascript
// Some component
const { t } = useI18n()

return (
  <h1>t("example_text")</h1>
)
```
