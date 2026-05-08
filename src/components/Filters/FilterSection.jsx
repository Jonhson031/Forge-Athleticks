import { useState } from "react";
import styles from "./FilterSection.module.css";

export default function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  
  return (
    <div className={styles.filterSection}>
      <button
        type="button"
        className={styles.filterSectionTitle}
        onClick={() => setOpen((p) => !p)}
      >
        <span>{title}</span>
        <span
          className={`${styles.filterChevron} ${open ? styles.filterChevronOpen : ""}`}
        >
          +
        </span>
      </button>
      {open && <div className={styles.filterSectionBody}>{children}</div>}
    </div>
  );
}
