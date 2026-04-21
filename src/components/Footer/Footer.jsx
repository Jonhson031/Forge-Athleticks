import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

// ── Data ──────────────────────────────────────

const navColumns = [
  {
    title: 'Shop',
    links: [
      {
        title: "Men's Gear",
        link: '/mens-gear',
      },
      {
        title: "Women's Gear",
        link: '/womens-gear',
      },
      {
        title: 'Accessories',
        link: '/accessories',
      },
      {
        title: 'Sale',
        link: '/sale',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        title: 'About Us',
        link: '/about',
      },
      {
        title: 'Careers',
        link: '/careers',
      },
      {
        title: 'Press',
        link: '/press',
      },
      {
        title: 'Affiliates',
        link: '/affiliates',
      },
    ],
  },
  {
    title: 'Support',
    links: ['FAQ', 'Shipping', 'Returns', 'Contact Us'],
    links: [
      {
        title: 'FAQ',
        link: '/faq',
      },
      {
        title: 'Shipping',
        link: '/shipping',
      },
      {
        title: 'Returns',
        link: '/returns',
      },
      {
        title: 'Contact Us',
        link: '/contact',
      },
    ],
  },
];

const socials = [
  { icon: 'icon-facebook', href: '#' },
  { icon: 'icon-instagram', href: '#' },
  { icon: 'icon-twitter', href: '#' },
];

const contact = {
  phone: '+1 (800) 555-FORGE',
  address: 'Chicago, IL, USA',
};

const copyrightLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Settings'];

// ── Footer ────────────────────────────────────

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.mainRow}>
          <div className={styles.brand}>
            <Link to="/" className={styles.brandTitle}>
              FORGE ATHLETICKS
            </Link>
            <p className={styles.brandSub}>Built for Champions.</p>
          </div>

          <nav className={styles.navigation}>
            {navColumns.map((col) => (
              <div key={col.title} className={styles.navCol}>
                <p className={styles.colTitle}>{col.title}</p>
                <ul className={styles.linkList}>
                  {col.links.map((link) => (
                    <li key={link.title}>
                      <Link to={link.link} className={styles.link}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className={styles.infoCol}>
            <p className={styles.colTitle}>Follow Us</p>
            <ul className={styles.socialList}>
              {socials.map((social) => (
                <li key={social.icon}>
                  <Link to={social.href} className={`${styles.socialLink} ${social.icon}`}></Link>
                </li>
              ))}
            </ul>
            <div className={styles.contactBlock}>
              <p className={styles.contactItem}>{contact.phone}</p>
              <p className={styles.contactItem}>{contact.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyrightRow}>
        <div className={styles.copyrightContainer}>
          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} Forge Athleticks. All rights reserved.
          </p>
          <ul className={styles.copyrightLinks}>
            {copyrightLinks.map((link) => (
              <li key={link}>
                <Link to={`/${link.toLowerCase()}`} className={styles.copyrightLink}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
