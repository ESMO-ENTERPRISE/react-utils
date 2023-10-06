import { Route } from '../../src/router'
import { FormView } from './views/FormView'
import { HomeView } from './views/HomeView'
import { I18nView } from './views/I18nView'

export const routes: Route[] = [
    {
        path: '/',
        exact: true,
        component: HomeView
    },
    {
        path: '/form',
        component: FormView
    },
    {
        path: '/i18n',
        component: I18nView
    }
]