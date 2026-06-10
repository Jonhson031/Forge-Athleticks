import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export default function Button({ text, to, children, className }) {
  return (
    <Link to={to} className={`${styles.button} ${className || ''}`}>
      {text || children}
    </Link>
  );
}
