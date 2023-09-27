
import { createBrowserRouter } from 'react-router-dom'
import { getPoll, getPolls } from './services'
import { Layout, ProtectedRoute } from './components/'
import { DashboardScreen, HomeScreen, LoginScreen } from './screens'
import { PollScreen } from './screens/poll-screen/PollScreen'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getVotedChoice } from './services/votes'

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
      },
      {
        path: '/poll/:pollId',
        element: <PollScreen />,
        loader: async ({ params }) => {
          const author = localStorage.getItem('guestName')

          if (!params.pollId || !author) {
            return { poll: null }
          }
          const poll = await getPoll(params.pollId);


          const votedChoice = await getVotedChoice(params.pollId, JSON.parse(author))

          return { poll, votedChoice }
        }
      }
    ]

  }
])