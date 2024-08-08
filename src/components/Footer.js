import './footer.css';
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <NavLink to="/ContactUs">Contact us</NavLink>
            <NavLink to="/FAQ">FAQ</NavLink>
            <p>© 2024 Group 16</p>
        </footer>
    );
}

export default Footer;
