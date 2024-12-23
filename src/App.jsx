// In App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentsPage from "./pages/StudentsPage";
import AddStudentPage from "./pages/AddStudentPage";
import DashboardPage from "./pages/DashboardPage";
import ChapterPage from "./pages/ChapterPage";
import HelpPage from "./pages/HelpPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><StudentsPage /></Layout>} />
        <Route path="/add-student" element={<Layout><AddStudentPage /></Layout>} />
        <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
        <Route path="/studentsPage" element={<Layout><StudentsPage /></Layout>} />
        <Route path="/chapter" element={<Layout><ChapterPage /></Layout>} />
        <Route path="/help" element={<Layout><HelpPage /></Layout>} />
        <Route path="/reports" element={<Layout><ReportsPage /></Layout>} />
        <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
