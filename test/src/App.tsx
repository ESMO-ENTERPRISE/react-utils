
import { createEsmoRouter } from '@esmo/react-utils/router'
import './App.css'

function App() {

  const [Router, RouterView] = createEsmoRouter({
    fallback: () => <div></div>,
    routes: [
      {
        path: "/",
        exact: true,
        component: () => <div>Hello world</div>
      }
    ]
  })

  return (
    <Router>
      <RouterView />
    </Router>
  )
}

export default App
