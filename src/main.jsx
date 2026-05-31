import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store.js'
import './index.css'
import App from './App.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Protected from './Components/layout/AuthLayout.jsx'
import NotesForm from './Components/notes/NotesForm.jsx'
import EditNote from './Pages/EditNote.jsx'
import Trash from './Pages/Trash.jsx'
import Archive from './Pages/Archive.jsx'

const router= createBrowserRouter([
  {
    path: "/",
    element : <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: (<Protected authentication={false}>
          <Login/>
        </Protected>)
      },
      {
        path: "/signup",
        element: (<Protected authentication={false}>
          <Signup/>
        </Protected>)
      },
      {
        path: "/note/:id",
        element: (<Protected authentication>
          <EditNote/>
        </Protected>)
      },
      {
        path: "/note/trash",
        element: (<Protected authentication>
          <Trash/>
        </Protected>)
      },
      {
        path: "/note/archive",
        element: (<Protected authentication>
          <Archive/>
        </Protected>)
      },

    ]
  }
])
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider  router={router}/>
    </Provider>
)
