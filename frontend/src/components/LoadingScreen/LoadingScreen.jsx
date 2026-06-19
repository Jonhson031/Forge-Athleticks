import Button from "../Button/Button";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <div className={styles.loader}>
      <h1>Starting server...</h1>
      <p>
        This demo is hosted on Render's free tier and may take up to 60 seconds
        to wake up.
      </p>
      <Button to="/" text="Go back"></Button>
    </div>
  );
}
