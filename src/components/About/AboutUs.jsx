import TitleSection from '../TitleSection/TitleSection';
import styles from './AboutUs.module.css';

export default function AboutUs({ bgWhite }) {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.container}>
        <div className={styles.content}>
          <TitleSection
            title="Built for Those Who Never Stop."
            eyebrowText="ABOUT US"
            bgWhite={bgWhite}
          ></TitleSection>
          <p className={styles.paragraph}>
            Forge Athleticks was born from a simple belief: great gear should empower great
            performance. We design every product for athletes who demand more — more durability,
            more comfort, more style. Whether you're in the gym, on the track, or in the streets,
            Forge is with you.
          </p>
        </div>
        <div className={styles.statistics}>
          <ul className={styles.statisticsList}>
            <li className={styles.statisticsItem}>
              <span>10K+</span>
              Athletes
            </li>
            <li className={styles.statisticsItem}>
              <span>500+</span>
              Products
            </li>
            <li className={styles.statisticsItem}>
              <span>15+</span>
              Countries
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
