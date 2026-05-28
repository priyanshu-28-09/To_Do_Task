function Progress({ todos }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;

  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress_container">
      <h3>📊 Progress: {percent}%</h3>

      <div className="progress_bar">
        <div
          className="progress_fill"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <p>
        Total: {total} | Completed: {completed} | Pending:{" "}
        {total - completed}
      </p>
    </div>
  );
}

export default Progress;