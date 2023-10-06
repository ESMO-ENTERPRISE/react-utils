import { useEsmoI18n } from "../../../src/i18n"

export function HomeView() {
    const { t } = useEsmoI18n()

    return (
        <div>{t('hello_world')}</div>
    )
}