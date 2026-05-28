import {
  BsCircle,
  BsFillTrashFill,
  BsCheckCircleFill
} from "react-icons/bs";

function PendingTasks({
  todos,
  onComplete,
  onDelete
}) {

  const pendingTodos =
    todos.filter((t) => !t.completed);

  return (

    <div className="task_box">

      <div className="section_header">

        <h2>⏳ Pending Tasks</h2>

        <span>
          {pendingTodos.length}
        </span>

      </div>

      {
        pendingTodos.length === 0 ? (

          <div className="empty_state">

            <h3>No Pending Tasks</h3>

            <p>
              Add new tasks to start tracking 🚀
            </p>

          </div>

        ) : (

          pendingTodos.map((todo) => (

            <div
              className="task slide_task"
              key={todo._id}
            >

              {/* LEFT */}

              <div className="task_left">

                {/* CHECK BUTTON */}

                <div
                  className="check_btn"
                  onClick={() =>
                    onComplete(todo._id)
                  }
                >

                  {
                    todo.completed ? (

                      <BsCheckCircleFill
                        className="checked_icon"
                      />

                    ) : (

                      <BsCircle
                        className="unchecked_icon"
                      />

                    )
                  }

                </div>

                {/* TASK INFO */}

                <div className="task_content">

                  <p>{todo.task}</p>

                  <small>

                    📅 {todo.date}
                    {" | "}
                    ⏰ {todo.time}

                  </small>

                </div>

              </div>

              {/* DELETE */}

              <div
                className="delete_btn"
                onClick={() =>
                  onDelete(todo._id)
                }
              >

                <BsFillTrashFill />

              </div>

            </div>
          ))
        )
      }

    </div>
  );
}

export default PendingTasks;