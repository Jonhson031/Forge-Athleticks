import { useState, useEffect, useCallback } from "react";
import styles from "./auth.module.css";
import { Link, Form } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(true);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

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

  const validateForm = useCallback(
    function validateForm() {
      const { firstName, lastName, email, password, confirm } = form;
      if (!firstName || !lastName || !email || !password || !confirm)
        return false;
      if (password !== confirm) return false;
      if (!agreed) return false;
      return true;
    },
    [agreed, form],
  );

  useEffect(() => {
    setBtnDisabled(!validateForm());
  }, [validateForm]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Create account.</h1>
          <p className={styles.subtitle}>
            Join the movement. Start training smarter.
          </p>
        </div>

        <Form method="post" className={styles.form}>
          <div className={styles.nameRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="signup-first">
                First Name
              </label>
              <input
                id="signup-first"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="John"
                className={styles.input}
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="signup-last">
                Last Name
              </label>
              <input
                id="signup-last"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Smith"
                className={styles.input}
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="signup-email">
              Email Address
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="john@example.com"
              className={styles.input}
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="signup-password">
              Password
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                className={styles.input}
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                    />
                  </svg>
                )}
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
            <label className={styles.label} htmlFor="signup-confirm">
              Confirm Password
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="signup-confirm"
                name="confirm"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat password"
                className={`${styles.input} ${
                  form.confirm && form.confirm !== form.password
                    ? styles.inputError
                    : ""
                }`}
                value={form.confirm}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirm((p) => !p)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? (
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {form.confirm && form.confirm !== form.password && (
              <p className={styles.errorText}>Passwords do not match.</p>
            )}
          </div>

          <label className={styles.agreeLabel}>
            <input
              type="checkbox"
              className={styles.agreeInput}
              checked={agreed}
              onChange={() => setAgreed((p) => !p)}
            />
            <span className={styles.agreeBox}>
              {agreed && <span className={styles.agreeCheck}>✓</span>}
            </span>
            <span className={styles.agreeText}>
              I agree to the{" "}
              <a href="#" className={styles.agreeLink}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className={styles.agreeLink}>
                Privacy Policy
              </a>
            </span>
          </label>

          <button
            type="submit"
            className={`${styles.submitBtn} ${btnDisabled ? styles.submitBtnDisabled : ""}`}
            disabled={btnDisabled}
          >
            CREATE ACCOUNT
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
        </Form>
        <p className={styles.switchText}>
          Already have an account?{" "}
          <Link to="/login" type="button" className={styles.switchBtn}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
