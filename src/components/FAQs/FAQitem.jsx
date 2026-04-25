import { useSelector, useDispatch } from 'react-redux';
import styles from './FAQs.module.css';
import { uiActions } from '../../store/uiSlice';

export default function FAQItem({ faq }) {
  const dispatch = useDispatch();
  const openId = useSelector((state) => state.ui.faqOpenId);

  function handleToggle(id) {
    dispatch(uiActions.setFaqOpenId(id));
  }

  const isOpen = openId === faq.id;

  return (
    <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => handleToggle(faq.id)}
        aria-expanded={isOpen}
      >
        <span className={styles.question}>{faq.question}</span>
        <span className={styles.icon} aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className={styles.answer}>
          <p className={styles.answerText}>{faq.answer}</p>
        </div>
      )}
    </div>
  );
}
