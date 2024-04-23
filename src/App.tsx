import "./global.css"
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Button } from './components/ui/button'

export function App() {
  return (
    <HelmetProvider>
      <Helmet 
        titleTemplate='%s | pizza.shop'
      />
      <RouterProvider router={router}/>
    </HelmetProvider>
  )
}
