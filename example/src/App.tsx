import { RouteSettings, createRouter } from '../../src/router'
import { HomeView } from './views/HomeView';
import { routes } from './routes'
import { NavbarComponent } from './components/NavbarComponent';

function App() {

  const routeSettings: RouteSettings = {
    routes: routes,
    fallback: HomeView
  }

  const [Router, RouterView] = createRouter(routeSettings);

  return (
    <>
      <Router>
        <div className='flex flex-1 flex-col'>
          <NavbarComponent />
          <div className='p-4'>
            <RouterView />
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
