import { Route,Routes } from 'react-router-dom'
import SignupForm from './components/orgsignup'
import CommitteeLogin from './components/committeelogin'
import DashboardLayout from './components/comdash'
import NomineeForm from './components/nominee'
import NominationForm from './components/application'
import CandidateApproval from './components/approval'
import Header from './components/header'
import HomePage from './components/home'


function App() {
  

  return (
    <>
    <div>
      <header>
        <Header />
      </header>
    <main>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<SignupForm/>} />
          <Route path='/login' element={<CommitteeLogin/>} />
          <Route path='/committe/dashboard' element={<DashboardLayout/>} />
          <Route path='/candidate' element={<NomineeForm/>} />
          <Route path='/apply' element={<NominationForm/>} />
          <Route path='/committee/nominees' element={<CandidateApproval/>} />

      </Routes>
      </main>
    </div>
          </>
  )
}

export default App
