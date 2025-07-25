
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/signin' element={<SignIn/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
