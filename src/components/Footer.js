import './footer.css';
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <NavLink to="/ContactUs" activeClassName="active-link">Contact us</NavLink>
            <NavLink to="/FAQ" activeClassName="active-link">FAQ</NavLink>
            <p>© 2024 Group 16</p>
        </footer>
    );
}

export default Footer;
