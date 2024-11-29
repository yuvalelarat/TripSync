import logo from '../../assets/images/logo.png';
import './NavBarLogo.css';
import { useNavigate } from 'react-router-dom';

function NavBarLogo() {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/');
    };

    return <img src={logo} alt="Logo" className="logo-img" onClick={handleNavigation} />;
}

export default NavBarLogo;
