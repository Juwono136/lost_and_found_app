import AdminRoutes from "./AdminRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

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
