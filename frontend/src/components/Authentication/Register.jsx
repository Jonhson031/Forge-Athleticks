import { useState, useEffect, useCallback } from "react";
import styles from "./auth.module.css";
import { Link, Form, useNavigation, useActionData } from "react-router-dom";
import AuthHeading from "./AuthHeading.jsx";
import { EyeIcon, EyeOffIcon } from "../../assets/icons/icons.jsx";
import AuthButton from "./AuthButton.jsx";

export default function Register() {
  const actionData = useActionData();
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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
        <AuthHeading
          title="Create account."
          subtitle="Join the movement. Start training smarter."
        ></AuthHeading>

        {actionData?.error && (
          <p className={styles.error}>{actionData.error}</p>
        )}

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
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
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
                {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
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
          <AuthButton
            text="CREATE ACCOUNT"
            disabled={btnDisabled || isSubmitting}
            isSubmitting={isSubmitting}
          ></AuthButton>
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
