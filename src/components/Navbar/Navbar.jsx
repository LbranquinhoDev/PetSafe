// src/components/Navbar.jsx
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <Link to="/"className='{styles.logo}'>PetSafe</Link>
      <nav>
        <ul className={styles.navLinks}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
        </ul>
      </nav>
    </header>
  );
}
