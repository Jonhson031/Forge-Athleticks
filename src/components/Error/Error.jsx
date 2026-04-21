import Button from '../Button/Button';
import styles from './Error.module.css';

export default function ErrorPage() {
  return (
    <div className={styles.error}>
      <h1>404. Page not found!</h1>
      <Button to="/" text="Go back"></Button>
    </div>
  );
}
