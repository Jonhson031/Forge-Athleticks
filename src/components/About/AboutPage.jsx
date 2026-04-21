import Button from '../Button/Button';
import Eyebrow from '../Eyebrow/Eyebrow';
import styles from './AboutPage.module.css';

const stats = [
  { value: '50K+', label: 'Athletes Worldwide' },
  { value: '200+', label: 'Products' },
  { value: '15+', label: 'Countries' },
  { value: '2019', label: 'Founded' },
];

const values = [
  {
    id: 1,
    title: 'Performance First',
    body: 'Every stitch, every fabric, every cut is engineered to move with your body — not against it.',
  },
  {
    id: 2,
    title: 'Built to Last',
    body: "We don't do disposable. Our gear is made to survive the gym, the track, and everything in between.",
  },
  {
    id: 3,
    title: 'For Every Athlete',
    body: "Whether you're just starting out or chasing a podium, Forge was built with you in mind.",
  },
];

export default function AboutUs() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.textSide}>
            <Eyebrow text="Our Story"></Eyebrow>
            <h1 className={styles.heading}>
              Built for Those
              <br />
              Who Never Stop.
            </h1>
            <div className={styles.divider} />
            <p className={styles.body}>
              Forge Athleticks was born from a simple belief: great gear should empower great
              performance. We design every product for athletes who demand more — more durability,
              more comfort, more style.
            </p>
            <p className={styles.body}>
              Whether you're in the gym, on the track, or in the streets, Forge is with you every
              rep, every mile, every moment.
            </p>
          </div>
          <div className={styles.imageSide}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.imagePlaceholderText}>Athlete Photo</span>
            </div>
            <div className={styles.floatingBadge}>
              <span className={styles.badgeValue}>SS26</span>
              <span className={styles.badgeLabel}>New Season</span>
            </div>
          </div>
        </section>

        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <ul className={styles.valuesList}>
          {values.map((v) => (
            <li key={v.id} className={styles.valueItem}>
              <span className={styles.valueDot} />
              <div>
                <p className={styles.valueTitle}>{v.title}</p>
                <p className={styles.valueBody}>{v.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <Button to="/shop">
          SHOP THE COLLECTION
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
