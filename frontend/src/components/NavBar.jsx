import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.jsx';

function NavBar() {
  const { theme, toggle } = useTheme();
  return (
    <nav className="navbar">
      <h1>BCX Connect</h1>
      <div className="links">
        <Link to="/">Dashboard</Link>
        <Link to="/knowledge">Knowledge</Link>
        <button onClick={toggle}>Theme: {theme}</button>
      </div>
    </nav>
  );
}

export default NavBar;
