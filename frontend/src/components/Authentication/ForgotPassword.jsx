import { useState } from "react";
import { Link, Form, useActionData, useNavigation } from "react-router-dom";
import styles from "./auth.module.css";
import AuthHeading from "./AuthHeading";

export default function ForgotPassword() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const isSubmitting = navigation.state === "submitting";
  const [error, setError] = useState("");
  const submitted = actionData?.data.status === "success";

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {!submitted ? (
          <>
            <AuthHeading
              title="Forgot password?"
              subtitle={`Enter your account email and we'll send you a verification code.`}
            ></AuthHeading>

            {actionData?.error && (
              <p className={styles.error}>{actionData.error}</p>
            )}

            {error && <p className={styles.error}>{error}</p>}

            <Form method="post" className={styles.form} noValidate>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="fp-email">
                  Email Address
                </label>
                <input
                  id="fp-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  className={styles.input}
                  value={email}
                  onChange={(e) => {
                    setError("");
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                className={`${styles.submitBtn} ${!email ? styles.submitBtnDisabled : ""}`}
                disabled={!email || isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.spinner} />
                ) : (
                  "SEND CODE"
                )}
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
            </Form>
          </>
        ) : (
          <div className={styles.successBlock}>
            <div className={styles.successIcon}>
              <svg
                width="28"
                height="28"
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
            </div>
            <h2 className={styles.successTitle}>Check your inbox.</h2>
            <p className={styles.successText}>
              We sent a 6-digit code to <strong>{email}</strong>. It expires in
              10 minutes.
            </p>
            <Link
              to={`/verify-code/${email}`}
              state={{ email }}
              className={styles.submitBtn}
              style={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              ENTER CODE →
            </Link>
          </div>
        )}

        <p className={styles.switchText}>
          Remember it?{" "}
          <Link to="/login" className={styles.switchBtn}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
