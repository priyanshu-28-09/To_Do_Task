function Charts({
  completed,
  pending,
  total
}) {

  const completedPercent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const pendingPercent = total === 0 ? 0 : Math.round((pending / total) * 100);

  return (

    <div className="charts_container">

      <h2>
        📊 Productivity Analytics
      </h2>

      {/* PIE CHART - SIMPLE BAR VERSION */}

      <div className="chart_card">

        <h3>
          Task Distribution
        </h3>

        <div style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span>Completed</span>
              <span>{completedPercent}%</span>
            </div>
            <div style={{ 
              width: "100%", 
              height: "20px", 
              backgroundColor: "rgba(0,255,200,0.2)", 
              borderRadius: "10px",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${completedPercent}%`,
                height: "100%",
                backgroundColor: "#00ff88",
                transition: "width 0.3s"
              }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span>Pending</span>
              <span>{pendingPercent}%</span>
            </div>
            <div style={{ 
              width: "100%", 
              height: "20px", 
              backgroundColor: "rgba(255,77,109,0.2)", 
              borderRadius: "10px",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${pendingPercent}%`,
                height: "100%",
                backgroundColor: "#ff4d6d",
                transition: "width 0.3s"
              }}></div>
            </div>
          </div>
        </div>

      </div>

      {/* BAR CHART - SIMPLE VERSION */}

      <div className="chart_card">

        <h3>
          Productivity Overview
        </h3>

        <div style={{ marginTop: "20px", display: "flex", gap: "20px", justifyContent: "center", alignItems: "flex-end", height: "150px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "50px",
              height: `${total === 0 ? 10 : (completed / Math.max(total, 10)) * 120}px`,
              backgroundColor: "#00ff88",
              borderRadius: "5px",
              marginBottom: "10px"
            }}></div>
            <div style={{ fontSize: "12px" }}>Completed</div>
            <div style={{ fontWeight: "bold", marginTop: "5px" }}>{completed}</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "50px",
              height: `${total === 0 ? 10 : (pending / Math.max(total, 10)) * 120}px`,
              backgroundColor: "#ff4d6d",
              borderRadius: "5px",
              marginBottom: "10px"
            }}></div>
            <div style={{ fontSize: "12px" }}>Pending</div>
            <div style={{ fontWeight: "bold", marginTop: "5px" }}>{pending}</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "50px",
              height: `${total === 0 ? 10 : (total / Math.max(total, 10)) * 120}px`,
              backgroundColor: "#00c9ff",
              borderRadius: "5px",
              marginBottom: "10px"
            }}></div>
            <div style={{ fontSize: "12px" }}>Total</div>
            <div style={{ fontWeight: "bold", marginTop: "5px" }}>{total}</div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Charts;