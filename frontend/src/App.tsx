import './App.css'
import { Route, Routes } from 'react-router'
import Dashboard from './views/Dashboard'
import Devices from './views/Devices'
import Parts from './views/Parts'
import Repairs from './views/Repairs'
import AppLayout from './components/AppLayout'
import RepairDetail from './views/RepairDetail'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/parts" element={<Parts />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/repairs/:repairId" element={<RepairDetail />} />
          </Route>

        </Routes>
      </div>
    </>
  )
}

export default App
