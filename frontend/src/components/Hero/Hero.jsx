import styles from './Hero.module.css';
import Button from '../Button/Button.jsx';

export default function Hero({ title, btnText }) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1>{title}</h1>
        <Button text={btnText}></Button>
      </div>
    </section>
  );
}
