import styles from './TitleSection.module.css';

export default function TitleSection({ title, eyebrowText, bgWhite }) {
  return (
    <div>
      <p className={styles.eyebrow}>
        <span className={styles.eyebrowLine} />
        {eyebrowText}
      </p>
      <h2 className={`${styles.title} ${bgWhite && styles.titleBlack}`}>{title}</h2>
    </div>
  );
}
