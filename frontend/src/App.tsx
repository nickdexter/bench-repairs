import './App.css'
import { Route, Routes } from 'react-router'
import Dashboard from './views/Dashboard'
import Sidebar from './components/Sidebar'
import Devices from './views/Devices'
import Parts from './views/Parts'
import Repairs from './views/Repairs'

function App() {

  return (
    <>
      <div>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/repairs" element={<Repairs />} />
        </Routes>
      </div>
    </>
  )
}

export default App
