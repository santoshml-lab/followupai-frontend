import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Bot,
  Phone,
  ClipboardList,
  Bell,
} from "lucide-react";

import "./index.css";
import Clients from "./pages/Clients";

function Dashboard() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back to FollowUpAI 👋</p>
        </div>

        <button className="notification-button">
          <Bell size={20} />
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={22} />
          </div>
          <p>Total Clients</p>
          <h2>0</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CalendarClock size={22} />
          </div>
          <p>Scheduled Follow-ups</p>
          <h2>0</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Phone size={22} />
          </div>
          <p>Processed Calls</p>
          <h2>0</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Bot size={22} />
          </div>
          <p>AI Scripts</p>
          <h2>0</h2>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Recent Follow-ups</h3>
            <span>View all</span>
          </div>

          <div className="empty-state">
            <CalendarClock size={38} />
            <h4>No follow-ups yet</h4>
            <p>Create a follow-up to see it here.</p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Quick Actions</h3>
          </div>

          <div className="quick-actions">
            <button>
              <Users size={18} />
              Add Client
            </button>

            <button>
              <CalendarClock size={18} />
              Schedule Follow-up
            </button>

            <button>
              <Bot size={18} />
              Generate AI Script
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <div>
          <h1>{title}</h1>
          <p>This section is coming next.</p>
        </div>
      </div>

      <div className="panel">
        <div className="empty-state">
          <ClipboardList size={38} />
          <h4>{title}</h4>
          <p>We will connect this page with the FastAPI backend next.</p>
        </div>
      </div>
    </div>
  );
}

function Layout() {
  const menuItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/clients",
      label: "Clients",
      icon: Users,
    },
    {
      path: "/followups",
      label: "Follow-ups",
      icon: CalendarClock,
    },
    {
      path: "/ai-script",
      label: "AI Script",
      icon: Bot,
    },
    {
      path: "/calls",
      label: "Calls",
      icon: Phone,
    },
    {
      path: "/call-logs",
      label: "Call Logs",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">F</div>

          <div>
            <h2>FollowUpAI</h2>
            <span>AI Follow-up CRM</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <p>FollowUpAI</p>
          <span>Version 1.0</span>
        </div>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
          path="/clients"
          element={<Clients />}
         />
            
            
          
          <Route
            path="/followups"
            element={<Placeholder title="Follow-ups" />}
          />
          <Route
            path="/ai-script"
            element={<Placeholder title="AI Script" />}
          />
          <Route
            path="/calls"
            element={<Placeholder title="Calls" />}
          />
          <Route
            path="/call-logs"
            element={<Placeholder title="Call Logs" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
