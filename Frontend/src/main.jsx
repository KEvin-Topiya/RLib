import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// const router=createBrowserRouter([
//   {path: '/',
//     element:<App/>,
//     children:[
//       {
//         path:"",
//         element:<Login/>
//       }
//       ,{
//         path:"ruAdmin",
//         element:<Admin/>
//       },
//       {
//         path:"stud",
//         element:<Student/>
//       },
//       {
//         path:"librarian",
//         element:<Librarian/>
//       }
//     ]
//   }
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <RouterProvider router={router}/> */}
    
  </StrictMode>,
)
