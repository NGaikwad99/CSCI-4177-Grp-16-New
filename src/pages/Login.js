import './Login.css';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/authContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        console.log(username + " " + password);

        e.preventDefault();

        // Checking the fields
        if (username === "") {
            setError('Username is required');
        } else if (password === "") {
            setError('Password is required');
        } else {
            try {
                // Logging in the user and getting token
                const res = await axios.post('https://csci-4177-grp-16-main.onrender.com/login', { username, password });
                console.log(res.data);
                const token = res.data.token;
    
                localStorage.setItem('token', token);
    
                login();
    
                console.log('Login successful. Token:', token);
                setError('');

                navigate('/Dashboard')
            } catch (err) {
                console.error(err);
                setError('Invalid username or password. Please try again.');
            }
        }
    }

    return (
        <main className="login-main">
            <div className="loginPg">
                <h1>Login</h1>

                <form className="inputForm loginForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username"  value={username} 
                            onChange={(e) => setUsername(e.target.value)} required/>

                    <input type="password" placeholder="Password" value={password} 
                            onChange={(e) => setPassword(e.target.value)} required/>

                    {error && <p className="error-msg">{error}</p>}

                    <button type="submit" onClick={handleSubmit}><strong>SUBMIT</strong></button>
                    <button type="button" onClick={() => {navigate('/ResetPassword');}}><strong>RESET PASSWORD</strong></button>
                </form>
            </div>
        </main>
    )
}

export default Login;
