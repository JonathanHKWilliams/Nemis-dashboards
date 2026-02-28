import { useState } from 'react'
import Login from './pages/Login'
import StudentApp from './pages/student/StudentApp'
import TeacherApp from './pages/teacher/TeacherApp'
import ParentApp from './pages/parent/ParentApp'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import Messages from './pages/Messages'
import SchoolApproval from './pages/SchoolApproval'
import Districts from './pages/Districts'
import Schools from './pages/Schools'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import TeacherOversight from './pages/TeacherOversight'
import Reports from './pages/Reports'
import NotificationsPage from './pages/NotificationsPage'
import Settings from './pages/Settings'
import PlaceholderPage from './pages/PlaceholderPage'

const PAGE_META = {
  dashboard:           { title: 'Dashboard Overview',  breadcrumb: 'Home / Dashboard Overview' },
  districts:           { title: 'Districts',            breadcrumb: 'Home / Districts' },
  schools:             { title: 'Schools',              breadcrumb: 'Home / Schools' },
  'school-approval':   { title: 'School Approval',      breadcrumb: 'Home / School Approval' },
  students:            { title: 'Students',             breadcrumb: 'Home / Students' },
  teachers:            { title: 'Teachers',             breadcrumb: 'Home / Teachers' },
  'teacher-oversight': { title: 'Teacher Oversight',    breadcrumb: 'Home / Teacher Oversight' },
  enrollment:          { title: 'Enrollment',           breadcrumb: 'Home / Enrollment' },
  users:               { title: 'User Management',      breadcrumb: 'Home / Users' },
  reports:             { title: 'Reports & Analytics',  breadcrumb: 'Home / Reports' },
  messages:            { title: 'Messages',             breadcrumb: 'Home / Messages' },
  notifications:       { title: 'Notifications',        breadcrumb: 'Home / Notifications' },
  settings:            { title: 'Settings',             breadcrumb: 'Home / Settings' },
}

function renderPage(activePage) {
  switch (activePage) {
    case 'dashboard':          return <Dashboard />
    case 'users':              return <UserManagement />
    case 'messages':           return <Messages />
    case 'school-approval':    return <SchoolApproval />
    case 'districts':          return <Districts />
    case 'schools':            return <Schools />
    case 'students':           return <Students />
    case 'teachers':           return <Teachers />
    case 'teacher-oversight':  return <TeacherOversight />
    case 'reports':            return <Reports />
    case 'notifications':      return <NotificationsPage />
    case 'settings':           return <Settings />
    default:                   return <PlaceholderPage pageName={activePage} />
  }
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dashboardMode, setDashboardMode] = useState('ceo')
  const [activePage, setActivePage] = useState('dashboard')
  const meta = PAGE_META[activePage] || PAGE_META.dashboard

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  if (dashboardMode === 'student') {
    return <StudentApp onSwitch={(mode) => setDashboardMode(mode)} />
  }

  if (dashboardMode === 'teacher') {
    return <TeacherApp onSwitch={(mode) => setDashboardMode(mode)} />
  }

  if (dashboardMode === 'parent') {
    return <ParentApp onSwitch={(mode) => setDashboardMode(mode)} />
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: '#F4F6F8' }}
    >
      {/* Fixed Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} onSwitchDashboard={(mode) => setDashboardMode(mode)} />

      {/* Main Content (offset by sidebar width) */}
      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{ marginLeft: 260 }}
      >
        <Header
          title={meta.title}
          breadcrumb={meta.breadcrumb}
          setActivePage={setActivePage}
        />

        <main
          className="flex-1 overflow-y-auto"
          style={{ padding: activePage === 'messages' ? '20px 24px' : '24px 28px' }}
        >
          {renderPage(activePage)}
        </main>
      </div>
    </div>
  )
}
