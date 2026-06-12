import { useState } from "react";
import { Link, useNavigation, useActionData, Form } from "react-router-dom";
import styles from "./auth.module.css";
import { EyeIcon, EyeOffIcon } from "../../assets/icons/icons.jsx";

export default function ResetPassword() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [show, setShow] = useState({ password: false, confirm: false });
  const [error, setError] = useState("");
  const submitted = actionData?.data.status === "success";
  const isSubmitting = navigation.state === "submitting";

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return null;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return { label: "Weak", level: 1 };
    if (score === 2) return { label: "Fair", level: 2 };
    if (score === 3) return { label: "Good", level: 3 };
    return { label: "Strong", level: 4 };
  })();

  const passwordsMatch = form.confirm === form.password;
  const confirmTouched = form.confirm.length > 0;
  const isValid =
    form.password.length >= 8 && passwordsMatch && form.confirm.length > 0;

  function handleChange(e) {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleShow(field) {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {!submitted ? (
          <>
            <div className={styles.heading}>
              <h1 className={styles.title}>Reset password.</h1>
              <p className={styles.subtitle}>
                Choose a new password for your account
              </p>
            </div>

            {actionData?.error && (
              <p style={{ color: "red" }}>{actionData.error}</p>
            )}
            {error && <p className={styles.error}>{error}</p>}

            <Form method="post" className={styles.form} noValidate>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="rp-password">
                  New Password
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="rp-password"
                    name="password"
                    type={show.password ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    className={styles.input}
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => toggleShow("password")}
                    aria-label={
                      show.password ? "Hide password" : "Show password"
                    }
                  >
                    {show.password ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                {passwordStrength && (
                  <div className={styles.strengthMeter}>
                    <div className={styles.strengthBars}>
                      {[1, 2, 3, 4].map((n) => (
                        <span
                          key={n}
                          className={`${styles.strengthBar} ${
                            n <= passwordStrength.level
                              ? styles[`strength${passwordStrength.level}`]
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className={styles.strengthLabel}>
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="rp-confirm">
                  Confirm Password
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="rp-confirm"
                    name="confirm"
                    type={show.confirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Repeat new password"
                    className={`${styles.input} ${
                      confirmTouched && !passwordsMatch ? styles.inputError : ""
                    }`}
                    value={form.confirm}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => toggleShow("confirm")}
                    aria-label={
                      show.confirm ? "Hide password" : "Show password"
                    }
                  >
                    {show.confirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                {confirmTouched && !passwordsMatch && (
                  <p className={styles.errorText}>Passwords do not match.</p>
                )}
              </div>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting || !isValid}
                className={`${styles.submitBtn} ${isSubmitting || !isValid ? styles.submitBtnDisabled : ""}`}
              >
                {isSubmitting ? (
                  <span className={styles.spinner} />
                ) : (
                  "SET NEW PASSWORD"
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
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                />
              </svg>
            </div>
            <h2 className={styles.successTitle}>Password updated.</h2>
            <p className={styles.successText}>
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>
            <Link
              to="/login"
              className={styles.submitBtn}
              style={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              SIGN IN NOW →
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
