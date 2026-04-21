import Eyebrow from '../Eyebrow/Eyebrow';
import styles from './Contact.module.css';

const infoCards = [
  {
    id: 1,
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
    label: 'Email Us',
    value: 'support@forgeathleticks.com',
  },
  {
    id: 2,
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
        />
      </svg>
    ),
    label: 'Call Us',
    value: '+1 (800) 555-FORGE',
  },
  {
    id: 3,
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z"
        />
      </svg>
    ),
    label: 'Find Us',
    value: 'Chicago, IL, USA',
  },
];

const subjectOptions = [
  'General Inquiry',
  'Order Issue',
  'Returns & Exchanges',
  'Press & Media',
  'Partnerships',
  'Other',
];

export default function Contact() {
  return (
    <div className={styles.page}>
      <div className={`${styles.container} ${'container'}`}>
        <section className={styles.hero}>
          <Eyebrow text="Contact Us"></Eyebrow>
          <h1 className={styles.heading}>GET IN TOUCH.</h1>
          <p className={styles.subheading}>We typically respond within&nbsp;24 hours.</p>
        </section>
        <section className={styles.cardsRow}>
          {infoCards.map((card) => (
            <div key={card.id} className={styles.card}>
              <span className={styles.cardIcon}>{card.icon}</span>
              <p className={styles.cardLabel}>{card.label}</p>
              <p className={styles.cardValue}>{card.value}</p>
            </div>
          ))}
        </section>
        <section className={styles.formSection}>
          <form className={styles.formWrapper}>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Smith"
                  className={styles.input}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className={styles.input}
                />
              </div>
              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label} htmlFor="subject">
                  Subject
                </label>
                <div className={styles.selectWrapper}>
                  <select id="subject" className={styles.select} defaultValue="">
                    <option value="" disabled>
                      Select a topic...
                    </option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className={styles.selectArrow}>↓</span>
                </div>
              </div>
              <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                <label className={styles.label} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us what's on your mind..."
                  className={styles.textarea}
                />
              </div>
            </div>
            <div className={styles.submitRow}>
              <p className={styles.notice}>We'll get back to you within 24 hours.</p>
              <button type="button" className={styles.submitBtn}>
                SEND MESSAGE
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
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
