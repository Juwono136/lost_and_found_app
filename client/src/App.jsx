import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@material-tailwind/react'
import Datepicker from 'react-tailwindcss-datepicker'
import AdminRoutes from "./AdminRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });

  return (
    <Router>
      {/* <AuthProvider> */}
        <Routes>
            
            {/* Render admin routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          
          {/* </Route> */}
        
        </Routes>
      {/* </AuthProvider> */}
    
    </Router>
  )
}

export default App
