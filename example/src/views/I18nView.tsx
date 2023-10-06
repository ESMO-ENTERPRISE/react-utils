import { useEsmoI18n } from "../../../src/i18n"

export function I18nView() {
    const { t } = useEsmoI18n()

    return (
        <div className="flex flex-1">
            <p className="text-justify">
                {t("i18n_text")}
            </p>
        </div>
    )
}