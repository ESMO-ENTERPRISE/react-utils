import { RouteSettings, createEsmoRouter } from '../../src/router'
import { EsmoI18nProvider } from '../../src/i18n'
import { EsmoQueryProvider } from '../../src/fetch'
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

  const [Router, RouterView] = createEsmoRouter(routeSettings);

  return (
    <EsmoI18nProvider language='es' locales={locales}>
      <EsmoQueryProvider>
      <Router>
        <div className='flex flex-1 flex-col'>
          <NavbarComponent />
          <div className='p-4'>
            <RouterView />
          </div>
        </div>
      </Router>
      </EsmoQueryProvider>
    </EsmoI18nProvider>
  )
}

export default App
