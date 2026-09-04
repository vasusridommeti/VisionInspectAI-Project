import React from "react";

function Profile() {
  const user =
    JSON.parse(localStorage.getItem("loggedInUser")) ||
    JSON.parse(localStorage.getItem("visionInspectUser"));

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>No Profile Found</h2>
          <p>Please login first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">
          👩‍💻
        </div>

        <h2>{user.name}</h2>

        <p className="profile-role">
          {user.role}
        </p>

        <div className="profile-info">

          <div className="info-row">
            <span>📧 Email</span>
            <span>{user.email}</span>
          </div>

          <div className="info-row">
            <span>🏢 Department</span>
            <span>{user.department}</span>
          </div>

          <div className="info-row">
            <span>🛡 Role</span>
            <span>{user.role}</span>
          </div>

          <div className="info-row">
            <span>📅 Joined</span>
            <span>{user.joined}</span>
          </div>

        </div>

        <button
          className="profile-btn"
          onClick={() => alert("Profile details are managed from your account.")}
        >
          ✏️ Edit Profile
        </button>

      </div>
    </div>
  );
}

export default Profile;