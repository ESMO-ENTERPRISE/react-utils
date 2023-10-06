import { useI18n } from "../../../src/i18n"

export function I18nView() {
    const { i18n } = useI18n()

    return (
        <div className="flex flex-1">
            <p className="text-justify">
                {i18n("i18n_text")}
            </p>
        </div>
    )
}