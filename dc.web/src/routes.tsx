
import { createBrowserRouter } from 'react-router-dom'
import { getPolls } from './services'
import { Layout } from './components/'
import { HomeScreen, LoginScreen } from './screens'

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomeScreen />,
        loader: async () =>  {
          const polls = await getPolls()
          return { polls }
        },   
      },
      {
        path: '/login',
        element: <LoginScreen />,
      }
    ]

  }
])