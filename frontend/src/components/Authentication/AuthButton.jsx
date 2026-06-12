import styles from "./auth.module.css";
export default function AuthButton({ disabled, isSubmitting, text }) {
  return (
    <button
      type="submit"
      className={styles.submitBtn}
      disabled={disabled}
      className={`${styles.submitBtn} ${disabled ? styles.submitBtnDisabled : ""}`}
    >
      {isSubmitting ? <span className={styles.spinner} /> : `${text}`}
      {!isSubmitting && (
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
      )}
    </button>
  );
}
