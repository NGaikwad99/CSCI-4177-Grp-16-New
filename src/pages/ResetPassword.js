import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/authContext';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confPassword, setConfPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (username === "") {
            setError('Username is required');
        } else if (password === "") {
            setError('Password is required');
        } else if (password !== confPassword) {
            setError('Passwords do not match. Please try again.');
        } else {
            try {
                const res = await axios.post('https://localhost:3001/resetPassword', { username, password });
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
    };

    return (
        <main className="login-main">
            <div className="loginPg">
                <h1>Reset Password</h1>
                
                <form className="inputForm loginForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username"  value={username} 
                            onChange={(e) => setUsername(e.target.value)} required/>

                    <input type="password" placeholder="New Password" value={password} 
                            onChange={(e) => setPassword(e.target.value)} required/>

                    <input type="password" placeholder="Confirm password" value={confPassword}  
                            onChange={(e) => setConfPassword(e.target.value)} required/>

                    {error && <p className="error-msg">{error}</p>}

                    <button type="submit" onClick={handleSubmit}><strong>SUBMIT</strong></button>
                    <button type="button" onClick={() => {console.log("reset password clicked")}}><strong>RESET PASSWORD</strong></button>
                </form>
            </div>
        </main>
    );
};

export default ResetPassword;
