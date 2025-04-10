import { useState } from 'react'
import SignupForm from './components/orgsignup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <SignupForm />
    </div>
          </>
  )
}

export default App
