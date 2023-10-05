import { Link } from "../../../src/router";

export function NavbarComponent() {
    return (
        <header className="bg-white shadow">
            <div
                className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
            >
                <Link className="block text-purple-600 cursor-pointer" to="/">
                   React Utils
                </Link>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link className="text-purple-400 transition cursor-pointer hover:text-gray-500/75" to="/form">
                                    Form
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}