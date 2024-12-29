import { useState } from 'react'
import './App.css'
import {NavLink,Link,Route,Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TaskList from './pages/TaskList'

import VerifyEmail from './pages/VerifyEmail'
import { useSelector } from 'react-redux'
import PageNotFound from './pages/PageNotFound'
import Dashboard from './pages/Dashboard'

function App() {
  const {token} = useSelector((state)=>state.auth);
  
  return (
    <>
    <div className="App">
        <Navbar/>
     
          <Routes>
            {
              token && (<Route path='/' element={<Dashboard/>}/>)
            }
            {
              !token && (<Route path='/' element={<Login/>}/>)
            }
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/verify-email' element={<VerifyEmail/>}/>
            <Route path='/tasklist' element={<TaskList/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
      
          
       
    </div>
    </>
  )
}

export default App













// import { useState } from 'react'
// import './App.css'
// import {NavLink,Link,Route,Routes} from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import TaskList from './pages/TaskList'
// import AddTasks from './components/AddTasks'
// import UpdateTask from './components/UpdateTask'
// import VerifyEmail from './pages/VerifyEmail'
// import { useSelector } from 'react-redux'

// function App() {
//   const {token}= useSelector((state)=>state.auth);
//   return (
//     <>
//     <div className="App">
//         <Navbar/>
//         <Routes>
//            <Route path='/login' element={<Login/>}/>
//            <Route path='/signup' element={<Signup/>}/>
//            <Route path='/tasklist' element={<TaskList/>}/>
//            <Route path='/verify-email' element={<VerifyEmail/>}/>
//         </Routes>
//         {/* <Login/> */}
//         {/* <Signup/> */}
//         {/* <TaskList/> */}
//         {/* <AddTasks/> */}
        
//     </div>
//     </>
//   )
// }

// export default App
