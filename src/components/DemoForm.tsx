"use client";

import { FormEvent, useRef, useState } from "react";
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
    <form className="form-card" noValidate onSubmit={onSubmit} aria-busy={status === "sending"}>
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

      <p className={`form-status is-${status}`} role="status" aria-live="polite">
        {message}
      </p>
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
