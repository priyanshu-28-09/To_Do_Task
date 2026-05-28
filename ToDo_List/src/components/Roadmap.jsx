import { useState } from "react";

function Roadmap() {

  const [roadmap, setRoadmap] = useState([

    {
      id: 1,
      title: "Learn HTML & CSS",
      completed: true,
    },

    {
      id: 2,
      title: "Master JavaScript",
      completed: false,
    },

    {
      id: 3,
      title: "Learn React.js",
      completed: false,
    },

    {
      id: 4,
      title: "Build MERN Project",
      completed: false,
    },

    {
      id: 5,
      title: "Solve DSA Questions",
      completed: false,
    },

    {
      id: 6,
      title: "Create Resume",
      completed: false,
    },

    {
      id: 7,
      title: "Apply for Internship",
      completed: false,
    },

    {
      id: 8,
      title: "Prepare Aptitude",
      completed: false,
    },

    {
      id: 9,
      title: "Mock Interview Practice",
      completed: false,
    },

  ]);

  // TOGGLE CHECKBOX

  const toggleRoadmap = (id) => {

    setRoadmap((prev) =>

      prev.map((item) =>

        item.id === id

          ? {
              ...item,
              completed: !item.completed,
            }

          : item
      )
    );
  };

  // PROGRESS

  const completedCount =
    roadmap.filter((r) => r.completed).length;

  const totalCount = roadmap.length;

  const progress =
    Math.round(
      (completedCount / totalCount) * 100
    );

  return (

    <div className="roadmap">

      {/* HEADER */}

      <div className="roadmap_header">

        <h2>🎓 CS Roadmap</h2>

        <span>
          {progress}% Completed
        </span>

      </div>

      {/* PROGRESS BAR */}

      <div className="roadmap_progress">

        <div
          className="roadmap_fill"
          style={{
            width: `${progress}%`
          }}
        ></div>

      </div>

      {/* ITEMS */}

      <div className="roadmap_container">

        {roadmap.map((item) => (

          <div
            key={item.id}
            className={
              item.completed
                ? "roadmap_item completed_roadmap"
                : "roadmap_item"
            }
          >

            {/* LEFT */}

            <div className="roadmap_left">

              <input
                type="checkbox"
                checked={item.completed}
                onChange={() =>
                  toggleRoadmap(item.id)
                }
              />

              <p>
                {item.title}
              </p>

            </div>

            {/* STATUS */}

            <span>
              {
                item.completed
                  ? "✅ Done"
                  : "⏳ Pending"
              }
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Roadmap;