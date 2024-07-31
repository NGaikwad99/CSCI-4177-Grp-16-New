import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from '../assets/img/logo.png';
import React, { useContext, useState } from 'react';
import { AuthContext } from './authContext';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
    const { isLoggedIn, logout, userRole } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const navigate = useNavigate();

    const toLogin = () => {
        navigate('/Login');
    };

    const toSignup = () => {
        navigate('/Signup');
    };

    const toMeet = () => {
        if (userRole === 'therapist') {
            navigate('/MeetingScheduler', { state: { userType: 'Therapist' } });
        } else {
            navigate('/MeetingScheduler', { state: { userType: 'Patient' } });
        }
    };

    return (
        <header className="header">
            <div className="logo-div">
                <img src={logo} alt='logo of the app'></img>
                <Link to="/"><h1>SafeSpace</h1></Link>
            </div>

            {isLoggedIn ? (
                <div className="nav-auth">
                    <nav className="nav">
                        <Link to="/Dashboard">Dashboard</Link>
                        <button className="meet" onClick={toMeet}>Meet</button>
                        <Link to="/Forum">Forum</Link>
                        <Link to="/Journal">Journal</Link>
                    </nav>
                    <button onClick={toggleDropdown} className='profile-btn'><FaUserCircle size={40} color="#EB4C2C" /></button>
                    {isOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => { logout(); toLogin(); }}>Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="nav-auth">
                    <nav className="nav">
                        <Link to="/">About us</Link>
                        <Link to="/LocalResources">Local Resources</Link>
                        <Link to="/OnlineResources">Online Resources</Link>
                    </nav>
                    <div className="auth">
                        <button className="signup" onClick={toSignup}>Sign up</button>
                        <button className="login" onClick={toLogin}>Log in</button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;