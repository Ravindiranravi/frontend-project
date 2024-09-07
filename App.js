import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './Components/SignInPage';
import StudentNewUser from './Components/StudentNewUser';
import AdminDashboard from './Components/AdminDashboard';
import StudentDashboard from './Components/StudentDashboard';
import TraineeDashboard from './Components/TraineeDashboard';

function App() {
  return (
   <Router>
    <Routes>
    <Route path="/" element={<SignInPage />} />
    <Route path="/student-new-user" element={<StudentNewUser />} />
    <Route path="/AdminDashboard" element={<AdminDashboard />}/>
    <Route path="/studentDashboard/:id" element={<StudentDashboard />} />
    <Route path="trainee-new-user" element={<TraineeDashboard />} />
    </Routes>
   </Router>
  );
}

export default App;
