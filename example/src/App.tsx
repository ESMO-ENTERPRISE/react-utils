import { RouteSettings, createRouter } from '../../src/router'
import { I18nProvider } from '../../src/i18n'
import { routes } from './routes'
import en from './i18n/en.json'
import es from './i18n/es.json'
import { HomeView } from './views/HomeView';
import { NavbarComponent } from './components/NavbarComponent';
import { ILocale } from 'vira-i18n'

function App() {

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

  const routeSettings: RouteSettings = {
    routes: routes,
    fallback: HomeView
  }

  const [Router, RouterView] = createRouter(routeSettings);

  return (
    <I18nProvider language='es' locales={locales}>
      <Router>
        <div className='flex flex-1 flex-col'>
          <NavbarComponent />
          <div className='p-4'>
            <RouterView />
          </div>
        </div>
      </Router>
    </I18nProvider>
  )
}

export default App
