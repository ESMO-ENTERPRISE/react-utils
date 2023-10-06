import { useI18n } from "../../../src/i18n"

export function HomeView() {
    const { i18n } = useI18n()

    return (
        <div>{i18n('hello_world')}</div>
    )
}