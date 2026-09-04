import { useEffect, useState } from "react";
import {
  Plus,
  CalendarClock,
  RefreshCw,
  X,
} from "lucide-react";

import {
  getFollowups,
} from "../services/api";

function Followups() {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [clientId, setClientId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const [message, setMessage] = useState("");

  async function loadFollowups() {
    try {
      setLoading(true);

      const data = await getFollowups();

      setFollowups(data);
      setMessage("");
    } catch (error) {
      setMessage("Unable to load follow-ups.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFollowups();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!clientId || !scheduledAt) {
      setMessage("Client ID and scheduled time are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://followupai-gvfs.onrender.com/followups",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: Number(clientId),
            scheduled_at: new Date(scheduledAt).toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || "Failed to create follow-up"
        );
      }

      setClientId("");
      setScheduledAt("");
      setShowForm(false);

      setMessage("Follow-up scheduled successfully.");

      await loadFollowups();
    } catch (error) {
      setMessage(error.message);
    }
  }

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
          <h1>Follow-ups</h1>

          <p>
            Manage scheduled customer follow-ups.
          </p>
        </div>

        <div className="header-actions">

          <button
            className="secondary-button"
            onClick={loadFollowups}
          >
            <RefreshCw size={17} />
            Refresh
          </button>

          <button
            className="primary-button"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} />
            Schedule Follow-up
          </button>

        </div>

      </div>

      {message && (
        <div className="message-box">
          {message}
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>
                <h2>Schedule Follow-up</h2>

                <p>
                  Schedule a follow-up for an existing client.
                </p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>Client ID *</label>

                <input
                  type="number"
                  value={clientId}
                  onChange={(event) =>
                    setClientId(event.target.value)
                  }
                  placeholder="Example: 1"
                />

              </div>

              <div className="form-group">

                <label>Scheduled Date & Time *</label>

                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(event) =>
                    setScheduledAt(event.target.value)
                  }
                />

              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Schedule
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      <div className="panel">

        <div className="panel-header">

          <div>
            <h3>All Follow-ups</h3>

            <span>
              {followups.length} follow-ups
            </span>
          </div>

        </div>

        {loading ? (

          <div className="empty-state">
            <p>Loading follow-ups...</p>
          </div>

        ) : followups.length === 0 ? (

          <div className="empty-state">

            <CalendarClock size={40} />

            <h4>No follow-ups yet</h4>

            <p>
              Schedule your first customer follow-up.
            </p>

          </div>

        ) : (

          <div className="followup-list">

            {followups.map((followup) => (

              <div
                className="followup-row"
                key={followup.id}
              >

                <div className="followup-icon">
                  <CalendarClock size={20} />
                </div>

                <div className="followup-info">

                  <h4>
                    Follow-up #{followup.id}
                  </h4>

                  <p>
                    Client ID: {followup.client_id}
                  </p>

                </div>

                <div className="followup-date">

                  <span>
                    {formatDate(
                      followup.scheduled_at
                    )}
                  </span>

                </div>

                <div>

                  <span
                    className={`status-badge ${followup.status}`}
                  >
                    {followup.status}
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

export default Followups;
