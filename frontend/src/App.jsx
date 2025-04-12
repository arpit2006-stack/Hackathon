import { Route,Routes } from 'react-router-dom'
import SignupForm from './components/orgsignup'
import CommitteeLogin from './components/committeelogin'
import DashboardLayout from './components/comdash'
import NomineeForm from './components/nominee'
import NominationForm from './components/application'

function App() {
  

  return (
    <>
    <div>
    <main>
      <Routes>
          <Route path="/create" element={<SignupForm/>} />
          <Route path='/login' element={<CommitteeLogin/>} />
          <Route path='/committe/dashboard' element={<DashboardLayout/>} />
          <Route path='/candidate' element={<NomineeForm/>} />
          <Route path='/apply' element={<NominationForm/>} />

      </Routes>
      </main>
    </div>
          </>
  )
}

export default App
