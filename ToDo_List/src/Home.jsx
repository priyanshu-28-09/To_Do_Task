import { useEffect, useState } from "react";
import axios from "axios";

import Create from "./Create";
import CompletedTasks from "./components/CompletedTasks";
import Records from "./components/Records";
import Roadmap from "./components/Roadmap";
import Charts from "./components/Charts";
import Progress from "./components/Progress";
import PendingTasks from "./components/PendingTasks";

function Home() {

  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  // FETCH TODOS

  useEffect(() => {

    axios
      .get("http://localhost:3001/get")

      .then((result) => setTodos(result.data))

      .catch((err) => console.log(err));

  }, []);

  // SAVE LOCAL STORAGE

  useEffect(() => {

    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );

  }, [todos]);

  // DELETE TASK

  const handleDelete = (id) => {

    axios
      .delete("http://localhost:3001/delete/" + id)

      .then(() => {

        setTodos((prev) =>
          prev.filter((t) => t._id !== id)
        );

      })

      .catch((err) => console.log(err));
  };

  // TOGGLE TASK

  const toggleTask = (id) => {

    axios
      .put("http://localhost:3001/update/" + id)

      .then(() => {

        setTodos((prev) =>
          prev.map((t) =>
            t._id === id
              ? {
                  ...t,
                  completed: !t.completed
                }
              : t
          )
        );

      })

      .catch((err) => console.log(err));
  };

  // ANALYTICS

  const completedTasks =
    todos.filter((t) => t.completed).length;

  const totalTasks = todos.length;

  const pendingTasks =
    totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  const streak =
    completedTasks === 0
      ? 0
      : completedTasks;

  // RENDER SECTION CONTENT
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="section-content">
            <div className="content-header">
              <h2>📊 Dashboard</h2>
            </div>
            <Create setTodos={setTodos} />
            
            <div className="metrics-grid">
              <div className="streak_box">
                <h3>🔥 Current Streak</h3>
                <p className="metric-value">{streak}</p>
                <p className="metric-label">Completed Tasks</p>
              </div>

              <div className="metric-card">
                <h3>📌 Total Tasks</h3>
                <p className="metric-value">{totalTasks}</p>
              </div>

              <div className="metric-card">
                <h3>✅ Completed</h3>
                <p className="metric-value">{completedTasks}</p>
              </div>

              <div className="metric-card">
                <h3>⏳ Pending</h3>
                <p className="metric-value">{pendingTasks}</p>
              </div>
            </div>

            <div className="progress_container">
              <h3>Overall Progress: {progress}%</h3>
              <div className="progress_bar">
                <div
                  className="progress_fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <Progress todos={todos} />

            <PendingTasks
              todos={todos}
              onComplete={(id) => toggleTask(id)}
              onDelete={(id) => handleDelete(id)}
            />

            <CompletedTasks
              todos={todos}
              onComplete={(id) => toggleTask(id)}
              onDelete={(id) => handleDelete(id)}
            />
          </div>
        );

      case "analytics":
        return (
          <div className="section-content">
            <div className="content-header">
              <h2>📈 Analytics</h2>
            </div>
            <Charts
              completed={completedTasks}
              pending={pendingTasks}
              total={totalTasks}
            />
          </div>
        );

      case "records":
        return (
          <div className="section-content">
            <div className="content-header">
              <h2>📅 Records</h2>
            </div>
            <Records todos={todos} />
          </div>
        );

      case "roadmap":
        return (
          <div className="section-content">
            <div className="content-header">
              <h2>🎓 Career Roadmap</h2>
            </div>
            <Roadmap />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>📊 Dashboard</h1>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveSection("dashboard")}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Dashboard</span>
          </button>

          <button
            className={`nav-item ${activeSection === "analytics" ? "active" : ""}`}
            onClick={() => setActiveSection("analytics")}
          >
            <span className="nav-icon">📈</span>
            <span className="nav-label">Analytics</span>
          </button>

          <button
            className={`nav-item ${activeSection === "records" ? "active" : ""}`}
            onClick={() => setActiveSection("records")}
          >
            <span className="nav-icon">📅</span>
            <span className="nav-label">Records</span>
          </button>

          <button
            className={`nav-item ${activeSection === "roadmap" ? "active" : ""}`}
            onClick={() => setActiveSection("roadmap")}
          >
            <span className="nav-icon">🎓</span>
            <span className="nav-label">Roadmap</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  );
}

export default Home;