import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import meeting from "../assets/img/meeting.jpg";
import forum from "../assets/img/community.jpg";
import friends from "../assets/img/friends.jpg";
import journal from "../assets/img/journal.jpg";
import profile from "../assets/img/my_profile.jpg";
import settings from "../assets/img/settings.jpg";

function Dashboard() {
  const navigate = useNavigate();

  const toMeet = () => {
    const role = localStorage.getItem('role'); 
    if (role) {
        navigate('/MeetingScheduler', { state: { userType: role } });
    } else {
        console.error('User role is not defined');
    }
};

  return (
    <div className="dashboard">
      <div className="grid-container">
        <div className="grid-item meetings" onClick={toMeet}>
          <div className="image">
            <img src={meeting} alt="Meetings" />
          </div>
          <h3>Meetings</h3>
          <span>Click here to schedule or join a meeting.</span>
        </div>
        <Link to="/forum" className="grid-item forum">
          <div className="image">
            <img src={forum} alt="Forum" />
          </div>
          <h3>Forum</h3>
          <span>Click here to enter our community forum.</span>
        </Link>
        <Link to="/journal" className="grid-item journal">
          <div className="image">
            <img src={journal} alt="Journal" />
          </div>
          <h3>My Journal</h3>
          <span>Click here to create a new journal log.</span>
        </Link>
        <Link to="/profile" className="grid-item profile">
          <div className="image">
            <img src={profile} alt="Profile" />
          </div>
          <h3>My Profile</h3>
          <span>Click here to visit and modify your profile page.</span>
        </Link>
        <Link to="/friends" className="grid-item friends">
          <div className="image">
            <img src={friends} alt="Friends" />
          </div>
          <h3>Friends</h3>
          <span>Click here to manage your friends list.</span>
        </Link>
        <Link to="/settings" className="grid-item settings">
          <div className="image">
            <img src={settings} alt="Settings" />
          </div>
          <h3>Settings</h3>
          <span>Click here to edit your settings.</span>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;