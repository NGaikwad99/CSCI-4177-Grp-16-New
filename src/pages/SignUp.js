import { useState, useContext } from 'react';
import './SignUp.css';
import axios from 'axios';
import { AuthContext } from '../components/authContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const roles = ['patient', 'therapist']; 
    // Email and password regex for input validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    async function handleSubmit(e) {
        if (username === "" || password === "" || name === "" || email === "" || confPassword === "" || role === "") {
            setError('All fields are required.');
        } else if (password !== confPassword) {
            setError('Passwords do not match. Please try again.');
        } else if (!emailRegex.test(email)) {
            setError('Invalid email address.');
        } else if (!passwordRegex.test(password)) {
            setError('Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
        } else {
            setError('');
        }

        e.preventDefault();

        try {
            const res = await axios.post('https://csci-4177-grp-16-main.onrender.com/register', { name, email, username, password, role });
            const token = res.data.token;

            localStorage.setItem('token', token);
            login();
            navigate('/Dashboard');
        } catch (err) {
            console.error(err);
        }
    }

    function backtoLogin() {
        navigate('/Login');
    }

    return (
        <main className='signup-div'>
            <div className="signupPg">
                <h1>SignUp</h1>

                <form className="inputForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name"  value={name} 
                            onChange={(e) => setName(e.target.value)} required/>

                    <input type="email" placeholder="Email" value={email} 
                            onChange={(e) => setEmail(e.target.value)} required/>

                    <input type="text" placeholder="Username" value={username} 
                            onChange={(e) => setUsername(e.target.value)} required/>

                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a role</option>
                        {roles.map((roleOption, index) => (
                            <option key={index} value={roleOption}>{roleOption}</option>
                        ))}
                    </select>

                    <input type="password" placeholder="Password" value={password} 
                            onChange={(e) => setPassword(e.target.value)} required/>

                    <input type="password" placeholder="Confirm password" value={confPassword} 
                            onChange={(e) => setConfPassword(e.target.value)} required/>

                    <p className='error-msg'>{error}</p>

                    <button type="submit" onClick={handleSubmit}><strong>SUBMIT</strong></button>
                    <button type="button" onClick={backtoLogin}><strong>LOGIN</strong></button>
                </form>
            </div>
        </main>
    )
}

export default SignUp;