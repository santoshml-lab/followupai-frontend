import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>FollowUpAI</h1>
      <p>AI-powered automated follow-up system 🚀</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
