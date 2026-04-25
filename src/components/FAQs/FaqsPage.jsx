import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FAQs.module.css';
import Eyebrow from '../Eyebrow/Eyebrow';
import FAQItem from './FAQitem';
import { uiActions } from '../../store/uiSlice';

const categories = [
  {
    id: 'orders',
    label: 'Orders & Shipping',
    faqs: [
      {
        id: 1,
        question: 'How long does shipping take?',
        answer:
          'Standard shipping takes 5–7 business days. Express shipping (2–3 business days) is available at checkout. Orders over $100 qualify for free standard shipping automatically.',
      },
      {
        id: 2,
        question: 'Can I track my order?',
        answer:
          "Yes! Once your order ships, you'll receive a confirmation email with a tracking number. You can use it on our website or the carrier's site to follow your package in real time.",
      },
      {
        id: 3,
        question: 'Do you ship internationally?',
        answer:
          'We currently ship to 15+ countries. International shipping times vary between 7–14 business days depending on the destination. Duties and taxes may apply and are the responsibility of the customer.',
      },
      {
        id: 4,
        question: 'Can I change or cancel my order?',
        answer:
          'Orders can be modified or cancelled within 1 hour of placing them. After that, the order enters fulfilment and can no longer be changed. Please contact our support team as soon as possible at support@forgeathleticks.com.',
      },
    ],
  },
  {
    id: 'returns',
    label: 'Returns & Exchanges',
    faqs: [
      {
        id: 5,
        question: 'What is your return policy?',
        answer:
          'We accept returns within 30 days of delivery for unworn, unwashed items with original tags attached. Sale items are final sale and cannot be returned.',
      },
      {
        id: 6,
        question: 'How do I start a return?',
        answer:
          'Visit our Returns portal on the website, enter your order number and email, select the items you want to return, and print your prepaid label. Drop it off at any carrier location.',
      },
      {
        id: 7,
        question: 'How long do refunds take?',
        answer:
          'Once we receive your return, refunds are processed within 3–5 business days. Depending on your bank, it may take an additional 5–10 days to appear on your statement.',
      },
    ],
  },
  {
    id: 'product',
    label: 'Product & Sizing',
    faqs: [
      {
        id: 8,
        question: 'How do I find my size?',
        answer:
          "Each product page includes a detailed size guide with measurements in both inches and centimetres. If you're between sizes, we generally recommend sizing up for a relaxed fit or sizing down for a compression fit.",
      },
      {
        id: 9,
        question: 'How should I care for my Forge gear?',
        answer:
          'Machine wash cold with like colours. Do not bleach. Tumble dry low or hang to dry. Do not iron directly on prints or logos. Proper care ensures your gear lasts longer and keeps its shape.',
      },
      {
        id: 10,
        question: 'Are your products sustainable?',
        answer:
          "We're actively working toward more sustainable practices. Our packaging is 100% recyclable and several of our product lines use recycled polyester. We aim to have 50% of our range made from sustainable materials by 2027.",
      },
    ],
  },
];

export default function FaqsPage() {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.ui.faqActiveCategory);

  const currentFaqs = categories.find((c) => c.id === activeCategory)?.faqs ?? [];

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Eyebrow text="Support"></Eyebrow>
          <h2 className={styles.heading}>
            Frequently Asked
            <br />
            Questions.
          </h2>
          <p className={styles.subheading}>
            Can't find what you're looking for?{' '}
            <Link to="/contact" className={styles.contactLink}>
              Contact us
            </Link>
            .
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.tabs}>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`${styles.tab} ${activeCategory === category.id ? styles.tabActive : ''}`}
                onClick={() => dispatch(uiActions.setFaqActiveCategory(category.id))}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className={styles.list}>
            {currentFaqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>Still need help?</p>
          <Link to="/contact" className={styles.ctaBtn}>
            GET IN TOUCH →
          </Link>
        </div>
      </div>
    </div>
  );
}
