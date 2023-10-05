import { Route } from '../../src/router'
import { FormView } from './views/FormView'
import { HomeView } from './views/HomeView'

export const routes: Route[] = [
    {
        path: '/',
        exact: true,
        component: HomeView
    },
    {
        path: '/form',
        component: FormView
    }
]