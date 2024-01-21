import { Link } from 'react-router-dom';
import '../../assets/styles/NavigationBar.css';

function NavigationBar() {
    return (
        <nav>
            <h1>Navigation Bar</h1>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    );
}

export default NavigationBar;