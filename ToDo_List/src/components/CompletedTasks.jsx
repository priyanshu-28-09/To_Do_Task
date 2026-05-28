import {
  BsCheckCircleFill,
  BsFillTrashFill,
  BsCircle
} from "react-icons/bs";

function CompletedTasks({
  todos,
  onComplete,
  onDelete
}) {

  const completedTodos =
    todos.filter((t) => t.completed);

  return (

    <div className="task_box">

      <div className="section_header">

        <h2>
          ✅ Completed Tasks
        </h2>

        <span>
          {completedTodos.length}
        </span>

      </div>

      {completedTodos.length === 0 ? (

        <div className="empty_state">

          <h3>
            No Completed Tasks
          </h3>

          <p>
            Complete tasks to see them here 🎯
          </p>

        </div>

      ) : (

        completedTodos.map((todo) => (

          <div
            className="task completed_task"
            key={todo._id}
          >

            {/* LEFT SIDE */}

            <div className="task_left">

              {/* CHECK BUTTON */}

              <div
                className="check_btn"
                onClick={() =>
                  onComplete(todo._id)
                }
              >

                {
                  todo.completed
                  ? (
                    <BsCheckCircleFill
                      className="checked_icon"
                    />
                  )
                  : (
                    <BsCircle
                      className="unchecked_icon"
                    />
                  )
                }

              </div>

              {/* TASK CONTENT */}

              <div className="task_content">

                <p>
                  {todo.task}
                </p>

                <small>
                  📅 {todo.date}
                  {" | "}
                  ⏰ {todo.time}
                </small>

              </div>

            </div>

            {/* DELETE BUTTON */}

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
      )}

    </div>
  );
}

export default CompletedTasks;