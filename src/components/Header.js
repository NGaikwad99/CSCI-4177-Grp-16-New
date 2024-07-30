import { Link, useNavigate } from 'react-router-dom';
import './header.css'
import logo from '../assets/img/logo.png';
import React, { useContext, useState } from 'react';
import { AuthContext } from './authContext';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const navigate = useNavigate();

    const toLogin = () => {
        navigate('/Login');
    }

    const toSignup = () => {
        navigate('/Signup');
    }

    return (
        <header className="header">
            <div className="logo-div">
                <img src={logo} alt='logo of the app'></img>
                <Link to="/"><h1>SafeSpace</h1></Link>
            </div>

            {isLoggedIn ? (
                <>
                    <button className="dashboard" onClick={toSignup}>Dashboard</button>
                    <button className="meet" onClick={toLogin}>Meet</button>
                    <button className="forum" onClick={toLogin}>Forum</button>
                    <button className="journal" onClick={toLogin}>My Journal</button>
                    <button onClick={toggleDropdown} className='profile-btn'><FaUserCircle size={40} color="#EB4C2C" /></button>
                    {isOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => {logout(); toLogin();}}>Logout</button>
                        </div>
                    )}
                </>
            ) : (
                <div class="nav-auth">
                    <nav className="nav">
                        <Link to="/LocalResources">Local Resources</Link>
                        <Link to="/OnlineResources">Online Resources</Link>
                        <Link to="/">About us</Link>
                        <Link to="/Dashboard">Dashboard</Link>
                    </nav>
                    <div className="auth">
                        <button className="signup" onClick={toSignup}>Sign up</button>
                        <button className="login" onClick={toLogin}>Log in</button>
                    </div>
                </div>
                
            )}
        </header>
    )
}

export default Header;
