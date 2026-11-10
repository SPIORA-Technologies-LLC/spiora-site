"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { copy } from "@/content/en";
import { emptyDemoInput, hasErrors, validateDemo, type DemoInput, type FieldErrors } from "@/lib/demo";

type Status = "idle" | "sending" | "success" | "error";

export function DemoForm() {
  const [values, setValues] = useState<DemoInput>(emptyDemoInput);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const keyRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    let observer: IntersectionObserver | null = null;
    let timer = 0;

    const play = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const run = () => {
        form.classList.remove("is-marked");
        void form.offsetWidth;
        form.classList.add("is-marked");
        window.clearTimeout(timer);
        timer = window.setTimeout(() => form.classList.remove("is-marked"), 1700);
      };

      observer?.disconnect();
      const rect = form.getBoundingClientRect();
      const seen = rect.top < window.innerHeight * 0.72 && rect.bottom > 0;
      if (seen) {
        run();
        return;
      }

      observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer?.disconnect();
        observer = null;
        run();
      }, { threshold: 0.35 });
      observer.observe(form);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href !== "/#demo" && href !== "#demo") return;
      play();
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      observer?.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  function update(field: keyof DemoInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const result = validateDemo(values);
    setErrors(result.errors);
    if (hasErrors(result.errors)) {
      setStatus("error");
      setMessage(copy.demo.checkFields);
      return;
    }

    if (!keyRef.current) keyRef.current = crypto.randomUUID();
    setStatus("sending");
    setMessage(copy.demo.sending);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": keyRef.current,
        },
        body: JSON.stringify(result.value),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        fields?: FieldErrors;
      } | null;

      if (response.ok && data?.ok) {
        setValues(emptyDemoInput());
        setErrors({});
        setStatus("success");
        setMessage(data.message || copy.demo.success);
        keyRef.current = "";
        return;
      }

      if (data?.fields) setErrors(data.fields);
      setStatus("error");
      setMessage(data?.message || copy.demo.failed);
    } catch {
      setStatus("error");
      setMessage(copy.demo.failed);
    }
  }

  return (
    <form
      ref={formRef}
      className="form-card"
      noValidate
      onSubmit={onSubmit}
      aria-busy={status === "sending"}
    >
      <div className="form-pair">
        <Field
          id="demo-name"
          name="name"
          label={copy.demo.name}
          autoComplete="name"
          maxLength={80}
          value={values.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
        />
        <Field
          id="demo-company"
          name="company"
          label={copy.demo.company}
          autoComplete="organization"
          maxLength={120}
          value={values.company}
          error={errors.company}
          onChange={(value) => update("company", value)}
        />
      </div>
      <Field
        id="demo-email"
        name="email"
        type="email"
        label={copy.demo.email}
        autoComplete="email"
        inputMode="email"
        maxLength={254}
        value={values.email}
        error={errors.email}
        onChange={(value) => update("email", value)}
      />

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? copy.demo.sending : copy.demo.submit}
        </button>
        <p className="form-privacy">
          <Link href="/privacy">{copy.demo.privacy}</Link>
          <span>{copy.demo.privacyHint}</span>
        </p>
      </div>

      {message ? (
        <p className={`form-status is-${status}`} role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  name,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  maxLength,
  inputMode,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete: string;
  maxLength: number;
  inputMode?: "email" | "text";
}) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
