---
sidebar_position: 3
---

# Custom hook

With i18n custom hook you can get values from resources files based on locale, and change current locale.

```ts
const { t, language, setLanguage } = useEsmoI18n()

return (
    // ...
    <h1>t("example_text")</h1>
    <input type="checkbox" value="" className="sr-only peer" checked={language === 'en'} onChange={() => setLanguage(language === 'en' ? 'es' : 'en')} />
)
```