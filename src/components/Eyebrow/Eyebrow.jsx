import styles from './Eyebrow.module.css';

export default function Eyebrow({ text }) {
  return (
    <p className={styles.eyebrow}>
      <span className={styles.eyebrowLine} />
      {text}
    </p>
  );
}
