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
    <EsmoI18nProvider language='en' locales={locales}>
      // Other components
    </EsmoI18nProvider>
)
```

```ts
// Navbar component
export function NavbarComponent() {
    const { t, language, setLanguage } = useEsmoI18n()

    return (
        // ...
        <input type="checkbox" value="" className="sr-only peer" checked={language === 'en'} onChange={() => setLanguage(language === 'en' ? 'es' : 'en')} />
    )
```

```javascript
// Some component
const { t } = useEsmoI18n()

return (
  <h1>t("example_text")</h1>
)
```
