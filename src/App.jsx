import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [donors, setDonors] = useState([]);
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newDonor = {
      id: Date.now().toString(),
      name: formData.get("name"),
      age: formData.get("age"),
      bloodGroup: formData.get("bloodGroup"),
      city: formData.get("city"),
      type: "Donor", // to differentiate profiles
    };
    setDonors((prev) => [...prev, newDonor]);
    setShowForm(false);
    event.target.reset();
  }

  function handleRequestSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newRequest = {
      id: Date.now().toString(),
      patientName: formData.get("patientName"),
      bloodGroup: formData.get("bloodGroup"),
      urgencyLevel: formData.get("urgencyLevel"),
      hospital: formData.get("hospital"),
      city: formData.get("city"),
      type: "Receiver",
    };
    setUrgentRequests((prev) => [...prev, newRequest]);
    setShowRequestForm(false);
    event.target.reset();
  }

  // Filter donors and urgent requests by blood group or name (searchTerm)
  const filteredDonors = donors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUrgentRequests = urgentRequests.filter(
    (r) =>
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simple blood bank branch tree (static data example)
  const bloodBankBranches = {
    Mumbai: ["South Mumbai Branch", "Andheri Branch", "Borivali Branch"],
    Pune: ["Camp Branch", "Kothrud Branch"],
    Nashik: ["Main Branch"],
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 10, fontFamily: "Arial, sans-serif" }}>
      <h1>Blood Donation Management System</h1>
      <p>Donate blood, save lives.</p>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setShowForm(true)}>Register as a Donor</button>{" "}
        <button onClick={() => setShowRequestForm(true)}>Add Urgent Blood Request</button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by name or blood group"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "60%", padding: 5 }}
        />
      </div>

      {/* Donor Registration Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10 }}>
          <h2>Donor Registration</h2>

          <input name="name" placeholder="Full name" required style={{ marginBottom: 10, width: "100%" }} />
          <input
            name="age"
            type="number"
            placeholder="Age"
            min="18"
            max="65"
            required
            style={{ marginBottom: 10, width: "100%" }}
          />
          <select name="bloodGroup" required defaultValue="" style={{ marginBottom: 10, width: "100%" }}>
            <option value="" disabled>
              Select blood group
            </option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
          <input name="city" placeholder="City" required style={{ marginBottom: 10, width: "100%" }} />

          <button type="submit">Submit Registration</button>{" "}
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}

      {/* Urgent Request Form */}
      {showRequestForm && (
        <form onSubmit={handleRequestSubmit} style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10 }}>
          <h2>Urgent Blood Request</h2>

          <input
            name="patientName"
            placeholder="Patient Name"
            required
            style={{ marginBottom: 10, width: "100%" }}
          />
          <select name="bloodGroup" required defaultValue="" style={{ marginBottom: 10, width: "100%" }}>
            <option value="" disabled>
              Select blood group
            </option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
          <select name="urgencyLevel" required defaultValue="" style={{ marginBottom: 10, width: "100%" }}>
            <option value="" disabled>
              Select urgency level
            </option>
            <option>High (within 24 hrs)</option>
            <option>Medium (2-3 days)</option>
            <option>Low (1+ week)</option>
          </select>
          <input name="hospital" placeholder="Hospital Name" required style={{ marginBottom: 10, width: "100%" }} />
          <input name="city" placeholder="City" required style={{ marginBottom: 10, width: "100%" }} />

          <button type="submit">Submit Request</button>{" "}
          <button type="button" onClick={() => setShowRequestForm(false)}>
            Cancel
          </button>
        </form>
      )}

      {/* Search Results and Profiles */}
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Donors ({filteredDonors.length})</h3>
          {filteredDonors.length === 0 && <p>No donors found.</p>}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredDonors.map((d) => (
              <li
                key={d.id}
                onClick={() => setSelectedProfile(d)}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  padding: "5px 0",
                }}
              >
                {d.name} - {d.bloodGroup} - {d.city}
              </li>
            ))}
          </ul>

          <h3>Urgent Requests ({filteredUrgentRequests.length})</h3>
          {filteredUrgentRequests.length === 0 && <p>No urgent requests.</p>}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredUrgentRequests.map((r) => (
              <li
                key={r.id}
                onClick={() => setSelectedProfile(r)}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  padding: "5px 0",
                }}
              >
                {r.patientName} - {r.bloodGroup} - {r.urgencyLevel}
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Profile Details */}
        <div style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: 10 }}>
          {selectedProfile ? (
            <div>
              <h3>{selectedProfile.type} Profile</h3>
              {selectedProfile.type === "Donor" ? (
                <>
                  <p><b>Name:</b> {selectedProfile.name}</p>
                  <p><b>Age:</b> {selectedProfile.age}</p>
                  <p><b>Blood Group:</b> {selectedProfile.bloodGroup}</p>
                  <p><b>City:</b> {selectedProfile.city}</p>
                </>
              ) : (
                <>
                  <p><b>Patient Name:</b> {selectedProfile.patientName}</p>
                  <p><b>Blood Group Needed:</b> {selectedProfile.bloodGroup}</p>
                  <p><b>Urgency Level:</b> {selectedProfile.urgencyLevel}</p>
                  <p><b>Hospital:</b> {selectedProfile.hospital}</p>
                  <p><b>City:</b> {selectedProfile.city}</p>
                </>
              )}
              <button onClick={() => setSelectedProfile(null)}>Close</button>
            </div>
          ) : (
            <p>Select a donor or request to see details.</p>
          )}
        </div>
      </div>

      {/* Blood Bank Branch Tree */}
      <div style={{ marginTop: 30 }}>
        <h3>Blood Bank Branches</h3>
        <ul>
          {Object.entries(bloodBankBranches).map(([city, branches]) => (
            <li key={city}>
              <b>{city}</b>
              <ul>
                {branches.map((branch) => (
                  <li key={branch}>{branch}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
