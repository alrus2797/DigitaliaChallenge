
import { createBrowserRouter } from 'react-router-dom'
import { getPolls } from './services'
import { Layout, ProtectedRoute } from './components/'
import { DashboardScreen, HomeScreen, LoginScreen } from './screens'

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
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute>
          <DashboardScreen />
        </ProtectedRoute>,
        loader: async () =>  {
          const polls = await getPolls()
          return { polls }
        }
      }
    ]

  }
])