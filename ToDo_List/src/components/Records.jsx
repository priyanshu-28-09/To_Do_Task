function Records({ todos }) {

  // GROUP TASKS BY DATE

  const grouped = todos.reduce((acc, task) => {

    const date =
      task.date || "Unknown";

    if (!acc[date]) {

      acc[date] = [];

    }

    acc[date].push(task);

    return acc;

  }, {});

  // TOTAL DAYS

  const totalDays =
    Object.keys(grouped).length;

  // TOTAL COMPLETED

  const totalCompleted =
    todos.filter(
      (t) => t.completed
    ).length;

  // TOTAL PENDING

  const totalPending =
    todos.filter(
      (t) => !t.completed
    ).length;

  return (

    <div className="records">

      {/* HEADER */}

      <div className="records_header">

        <h2>
          📅 Day-wise Records
        </h2>

        <span>
          {totalDays} Days
        </span>

      </div>

      {/* STATS */}

      <div className="records_stats">

        <div className="record_stat_card">

          <h3>
            ✅ {totalCompleted}
          </h3>

          <p>
            Completed
          </p>

        </div>

        <div className="record_stat_card">

          <h3>
            ⏳ {totalPending}
          </h3>

          <p>
            Pending
          </p>

        </div>

      </div>

      {/* EMPTY STATE */}

      {totalDays === 0 ? (

        <div className="empty_state">

          <h3>
            No Records Yet
          </h3>

          <p>
            Complete tasks to build
            productivity history 🚀
          </p>

        </div>

      ) : (

        Object.keys(grouped)

          .reverse()

          .map((date) => (

            <div
              key={date}
              className="record_day"
            >

              {/* DATE */}

              <div className="record_date">

                <h4>
                  📌 {date}
                </h4>

                <span>
                  {
                    grouped[date].length
                  } Tasks
                </span>

              </div>

              {/* TASKS */}

              <div className="record_tasks">

                {grouped[date].map((t) => (

                  <div
                    key={t._id}

                    className={
                      t.completed
                        ? "record_task completed_record"
                        : "record_task"
                    }
                  >

                    {/* LEFT */}

                    <div>

                      <p>

                        {
                          t.completed
                            ? "✅"
                            : "⏳"
                        }

                        {" "}

                        {t.task}

                      </p>

                      <small>
                        ⏰ {t.time}
                      </small>

                    </div>

                    {/* STATUS */}

                    <span
                      className={
                        t.completed
                          ? "status_done"
                          : "status_pending"
                      }
                    >

                      {
                        t.completed
                          ? "Done"
                          : "Pending"
                      }

                    </span>

                  </div>

                ))}

              </div>

            </div>
          ))
      )}

    </div>
  );
}

export default Records;