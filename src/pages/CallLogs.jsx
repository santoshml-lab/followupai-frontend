import { useEffect, useState } from "react";
import {
  Phone,
  RefreshCw,
  Plus,
} from "lucide-react";

import { getCallLogs } from "../services/api";

function CallLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadLogs() {
    try {
      setLoading(true);

      const data = await getCallLogs();

      setLogs(data);
      setMessage("");
    } catch (error) {
      setMessage("Unable to load call logs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <div className="dashboard-content">

      <div className="page-header">

        <div>
          <h1>Call Logs</h1>

          <p>
            Track customer follow-up call activity.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={loadLogs}
        >
          <RefreshCw size={17} />
          Refresh
        </button>

      </div>

      {message && (
        <div className="message-box">
          {message}
        </div>
      )}

      <div className="panel">

        <div className="panel-header">

          <div>
            <h3>Call History</h3>

            <span>
              {logs.length} calls
            </span>
          </div>

        </div>

        {loading ? (

          <div className="empty-state">
            <p>Loading call logs...</p>
          </div>

        ) : logs.length === 0 ? (

          <div className="empty-state">

            <Phone size={40} />

            <h4>No call logs yet</h4>

            <p>
              Call activity will appear here.
            </p>

          </div>

        ) : (

          <div className="call-log-list">

            {logs.map((log) => (

              <div
                className="call-log-row"
                key={log.id}
              >

                <div className="call-log-icon">
                  <Phone size={19} />
                </div>

                <div className="call-log-info">

                  <h4>
                    Call #{log.id}
                  </h4>

                  <p>
                    Follow-up #{log.followup_id}
                  </p>

                </div>

                <div className="call-phone">

                  <span>
                    {log.phone}
                  </span>

                </div>

                <div>

                  <span
                    className={`status-badge ${log.status}`}
                  >
                    {log.status}
                  </span>

                </div>

                <div className="call-outcome">

                  <span>
                    {log.outcome || "—"}
                  </span>

                </div>

                <div className="call-date">

                  <span>
                    {formatDate(log.created_at)}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default CallLogs;
