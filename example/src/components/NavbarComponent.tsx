import { useEsmoI18n } from "../../../src/i18n";
import { Link } from "../../../src/router";

export function NavbarComponent() {
    const { t, language, setLanguage } = useEsmoI18n()

    return (
        <header className="bg-white shadow">
            <div
                className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
            >
                <Link className="block text-purple-600 cursor-pointer" to="/">
                    React Utils
                </Link>

                <div className="flex flex-1 items-center justify-between">
                    <nav aria-label="Global">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link className="text-purple-400 transition cursor-pointer hover:text-gray-500/75" to="/form">
                                    {t("navbar_form")}
                                </Link>
                            </li>
                            <li>
                                <Link className="text-purple-400 transition cursor-pointer hover:text-gray-500/75" to="/i18n">
                                    {t("navbar_i18n")}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-end">
                    <nav aria-label="Global">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <label className="relative inline-flex items-center mr-5 cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" checked={language === 'en'} onChange={() => setLanguage(language === 'en' ? 'es' : 'en')} />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{language === 'en' ? 'EN' : 'ES'}</span>
                                </label>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}