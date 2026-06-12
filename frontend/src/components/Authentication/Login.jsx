import { useState, useEffect } from "react";
import { useActionData, useNavigation } from "react-router-dom";
import styles from "./auth.module.css";
import { Link, Form } from "react-router-dom";
import AuthHeading from "./AuthHeading";
import { EyeIcon, EyeOffIcon } from "../../assets/icons/icons";
import AuthButton from "./AuthButton";

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const isSubmitting = navigation.state === "submitting";

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    const { email, password } = form;
    if (!email || !password) setBtnDisabled(true);
    else setBtnDisabled(false);
  }, [form]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AuthHeading
          title="Welcome back."
          subtitle="Sign in to your account to continue."
        ></AuthHeading>

        {actionData?.error && (
          <p className={styles.error}>{actionData.error}</p>
        )}

        <Form method="post" className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
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
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="login-password">
                Password
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>
            <div className={styles.inputWrapper}>
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
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
          </div>
          <AuthButton
            text="SIGN IN"
            disabled={btnDisabled || isSubmitting}
            isSubmitting={isSubmitting}
          ></AuthButton>
        </Form>
        <p className={styles.switchText}>
          Don't have an account?{" "}
          <Link to="/register" type="button" className={styles.switchBtn}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
