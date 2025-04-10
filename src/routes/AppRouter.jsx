import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import ContactsPage from '../pages/ContactsPage'
import MainLayout from '../layouts/MainLayout'
import ProjectsPage from '../pages/ProjectsPage'
import AiAgentPage from '../pages/AiAgentPage'
import LeadsPage from '../pages/LeadsPage'
import InboxPage from '../pages/InboxPage'
import AddProjectPage from '../pages/AddProjectPage'
import Chatbot from '../pages/chatbot/ChatItem'
import PendingApprovalPage from '../pages/PendingApprovalPage'
import SearchContactPage from '../pages/SearchContactPage'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import NewPassword from '../pages/NewPassword'
import Settings from '../pages/settings/Settings'
import MainAgent from '../pages/agent/mainAgent'




const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/aiagent" element={<AiAgentPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/mainagent" element={<MainAgent />} />
          
          <Route path="/addProject" element={<AddProjectPage />} />
          <Route path="/searchContact" element={<SearchContactPage/>} />
          <Route path="/pendingApproval" element={<PendingApprovalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter