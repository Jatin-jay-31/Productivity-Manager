import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store.js'
import './index.css'
import App from './App.jsx'
import Archive from './Pages/Archive.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Notes from './Pages/Notes.jsx'
import Signup from './Pages/Signup.jsx'
import Trash from './Pages/Trash.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Protected from './Components/AuthLayout.jsx'
import NotesForm from './Components/NotesForm.jsx'
import Settings from './Pages/Settings.jsx'


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
        path: "/archived-notes",
        element: (<Protected authentication>
          <Archive/>
        </Protected>)
      },
      {
        path: "/all-notes",
        element: (<Protected authentication>
          <Notes/>
        </Protected>)
      },
      {
        path: "/trash",
        element: (<Protected authentication>
          <Trash/>
        </Protected>)
      },
      {
        path: "/add-note",
        element: (<Protected authentication>
          <NotesForm/>
        </Protected>)
      },
      {
        path: "/edit-note/:id",
        element: (<Protected authentication>
          <EditNote/>
        </Protected>)
      },
      {
        path: "/note/:id",
        element: (<Protected authentication>
          <Note/>
        </Protected>)
      },
      {
        path: "/settings",
        element: (<Protected authentication>
          <Settings/>
        </Protected>)
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider  router={router}/>
    </Provider>
  </StrictMode>,
)
