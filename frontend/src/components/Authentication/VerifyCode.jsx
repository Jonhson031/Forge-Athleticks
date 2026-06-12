import { useState, useRef, useEffect } from "react";
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  useFetcher,
  useParams,
} from "react-router-dom";
import styles from "./auth.module.css";
import AuthButton from "./AuthButton.jsx";

const CODE_LENGTH = 6;

export default function VerifyCode() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const resendFetcher = useFetcher();
  const { email } = useParams();
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const inputRefs = useRef([]);

  const [countdown, setCountdown] = useState(60);

  const isSubmitting = navigation.state === "submitting";
  const isResending = resendFetcher.state !== "idle";
  const resentOk = resendFetcher.data?.ok === true;
  const isFilled = digits.every((d) => d !== "");

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  useEffect(() => {
    if (resentOk) {
      setCountdown(60);
      setDigits(Array(CODE_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }
  }, [resentOk]);

  function handleDigit(index, value) {
    const cleaned = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = cleaned;
    setDigits(next);
    if (cleaned && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1)
      inputRefs.current[index + 1]?.focus();
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    const next = [...digits];
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  }

  function handleResend() {
    if (countdown > 0 || isResending) return;
    console.log(email);
    resendFetcher.submit(
      { email, intent: "resend" },
      { method: "post", action: "/forgot-password" },
    );
  }
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Enter code.</h1>
          <p className={styles.subtitle}>
            We sent a 6-digit code to{" "}
            <span className={styles.emailHighlight}>
              {email || "your email"}
            </span>
            .
          </p>
        </div>

        {actionData?.error && (
          <p className={styles.error}>{actionData.error}</p>
        )}

        {resentOk && (
          <p className={styles.successInline}>✓ A new code has been sent.</p>
        )}

        {resendFetcher.data?.error && (
          <p className={styles.error}>{resendFetcher.data.error}</p>
        )}

        <Form method="post" className={styles.form} noValidate>
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="code" value={digits.join("")} />

          <div className={styles.otpRow} onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`${styles.otpInput} ${d ? styles.otpInputFilled : ""}`}
                value={d}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                autoFocus={i === 0}
                autoComplete="one-time-code"
                aria-label={`Digit ${i + 1}`}
                name={`digit-${i}`}
              />
            ))}
          </div>
          <AuthButton
            text="VERIFY CODE"
            disabled={isSubmitting || !isFilled}
            isSubmitting={isSubmitting}
          ></AuthButton>
        </Form>

        <div className={styles.resendRow}>
          <span className={styles.resendText}>Didn't receive it?</span>
          <button
            type="button"
            className={`${styles.resendBtn} ${
              countdown > 0 || isResending ? styles.resendBtnDisabled : ""
            }`}
            onClick={handleResend}
            disabled={countdown > 0 || isResending}
          >
            {isResending
              ? "Sending..."
              : countdown > 0
                ? `Resend in ${countdown}s`
                : "Resend code"}
          </button>
        </div>

        <p className={styles.switchText}>
          Wrong email?{" "}
          <Link to="/forgot-password" className={styles.switchBtn}>
            Go back
          </Link>
        </p>
      </div>
    </div>
  );
}
