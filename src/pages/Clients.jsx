import { useEffect, useState } from "react";
import { Plus, Users, X } from "lucide-react";
import { createClient, getClients } from "../services/api";

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  async function loadClients() {
    try {
      setLoading(true);

      const data = await getClients();

      setClients(data);
    } catch (error) {
      setMessage("Unable to load clients.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.phone) {
      setMessage("Name and phone are required.");
      return;
    }

    try {
      setMessage("");

      await createClient(formData);

      setFormData({
        name: "",
        phone: "",
        product: "",
        notes: "",
      });

      setShowForm(false);

      await loadClients();

      setMessage("Client added successfully.");
    } catch (error) {
      setMessage("Failed to create client.");
    }
  }

  return (
    <div className="dashboard-content">

      <div className="page-header">

        <div>
          <h1>Clients</h1>
          <p>Manage your customers and their follow-ups.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add Client
        </button>

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
                <h2>Add Client</h2>
                <p>Create a new customer record.</p>
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
                <label>Name *</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter client name"
                />
              </div>

              <div className="form-group">
                <label>Phone *</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label>Product</label>

                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="e.g. Loan"
                />
              </div>

              <div className="form-group">
                <label>Notes</label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add notes about the client"
                  rows="4"
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
                  Add Client
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      <div className="panel">

        <div className="panel-header">

          <div>
            <h3>All Clients</h3>
            <span>{clients.length} clients</span>
          </div>

        </div>

        {loading ? (
          <div className="empty-state">
            <p>Loading clients...</p>
          </div>
        ) : clients.length === 0 ? (

          <div className="empty-state">

            <Users size={40} />

            <h4>No clients yet</h4>

            <p>
              Add your first client to get started.
            </p>

          </div>

        ) : (

          <div className="client-list">

            {clients.map((client) => (

              <div
                className="client-row"
                key={client.id}
              >

                <div className="client-avatar">
                  {client.name?.charAt(0)?.toUpperCase()}
                </div>

                <div className="client-info">

                  <h4>{client.name}</h4>

                  <p>{client.phone}</p>

                </div>

                <div className="client-product">

                  <span>
                    {client.product || "No product"}
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

export default Clients;
