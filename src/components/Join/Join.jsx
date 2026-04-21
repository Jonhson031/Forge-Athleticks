import Button from '../Button/Button';
import styles from './Join.module.css';

export default function Join() {
  return (
    <section className={styles.join}>
      <div className={styles.container}>
        <h3>READY TO TRAIN?</h3>
        <h2 className={styles.title}>JOIN THE MOVEMENT.</h2>
        <Button text="SHOP THE COLLECTION"></Button>
      </div>
    </section>
  );
}
