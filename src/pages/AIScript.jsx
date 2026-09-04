import { useEffect, useState } from "react";
import { Bot, RefreshCw, Sparkles } from "lucide-react";

import { getFollowups, generateScript } from "../services/api";

function AIScript() {
  const [followups, setFollowups] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFollowups, setLoadingFollowups] = useState(true);
  const [message, setMessage] = useState("");

  async function loadFollowups() {
    try {
      setLoadingFollowups(true);

      const data = await getFollowups();

      setFollowups(data);

      if (data.length > 0 && !selectedId) {
        setSelectedId(String(data[0].id));
      }

      setMessage("");
    } catch (error) {
      setMessage("Unable to load follow-ups.");
    } finally {
      setLoadingFollowups(false);
    }
  }

  useEffect(() => {
    loadFollowups();
  }, []);

  async function handleGenerate() {
    if (!selectedId) {
      setMessage("Please select a follow-up.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setScript("");

      const data = await generateScript(selectedId);

      setScript(data.script);

      setMessage("AI script generated successfully.");
    } catch (error) {
      setMessage("Failed to generate AI script.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-content">

      <div className="page-header">

        <div>
          <h1>AI Script</h1>
          <p>
            Generate a professional follow-up script using AI.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={loadFollowups}
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

      <div className="ai-script-layout">

        <div className="panel">

          <div className="panel-header">
            <h3>Select Follow-up</h3>
          </div>

          {loadingFollowups ? (

            <div className="empty-state">
              <p>Loading follow-ups...</p>
            </div>

          ) : followups.length === 0 ? (

            <div className="empty-state">
              <Bot size={40} />
              <h4>No follow-ups available</h4>
              <p>
                Create a follow-up before generating a script.
              </p>
            </div>

          ) : (

            <>
              <div className="form-group">

                <label>Follow-up</label>

                <select
                  value={selectedId}
                  onChange={(event) =>
                    setSelectedId(event.target.value)
                  }
                >

                  {followups.map((followup) => (
                    <option
                      key={followup.id}
                      value={followup.id}
                    >
                      Follow-up #{followup.id} — Client ID{" "}
                      {followup.client_id}
                    </option>
                  ))}

                </select>

              </div>

              <button
                className="primary-button generate-button"
                onClick={handleGenerate}
                disabled={loading}
              >
                <Sparkles size={18} />

                {loading
                  ? "Generating..."
                  : "Generate AI Script"}
              </button>
            </>

          )}

        </div>

        <div className="panel">

          <div className="panel-header">
            <h3>Generated Script</h3>
          </div>

          {script ? (

            <div className="script-box">
              {script}
            </div>

          ) : (

            <div className="empty-state">
              <Bot size={40} />
              <h4>No script generated</h4>
              <p>
                Select a follow-up and generate an AI script.
              </p>
            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default AIScript;
