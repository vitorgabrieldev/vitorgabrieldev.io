"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const KIND_OPTIONS = [
  { v: "clt", labelKey: null, fallback: "CLT" },
  { v: "pj", labelKey: null, fallback: "PJ" },
  { v: "freelance", labelKey: "kind.freelance" },
  { v: "consult", labelKey: "kind.consult" },
  { v: "unsure", labelKey: "kind.unsure" },
] as const;

const FOCUS_OPTIONS = [
  { v: "backend", labelKey: null, fallback: "Backend / Laravel" },
  { v: "frontend", labelKey: null, fallback: "Frontend / React" },
  { v: "infra", labelKey: null, fallback: "DevOps / Infra" },
  { v: "fullstack", labelKey: null, fallback: "Full stack" },
  { v: "other", labelKey: "focus.other" },
] as const;

function formatBudget(v: number, unit: string) {
  if (v >= 30) return `R$ 30 000+ ${unit}`;
  return `R$ ${(v * 1000).toLocaleString("pt-BR")} ${unit}`;
}

export function ContactForm() {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [kind, setKind] = useState<string[]>([]);
  const [focus, setFocus] = useState<string[]>([]);
  const [budget, setBudget] = useState(12);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function toggle(list: string[], setList: (v: string[]) => void, v: string) {
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailOk = /^[^@]+@[^@]+\.[^@]+$/.test(email);
    const nextErrors = {
      f_name: !name.trim(),
      f_email: !email.trim() || !emailOk,
      f_msg: !message.trim(),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          budget_value: formatBudget(budget, t("budget_unit")),
          kind: kind.join(", ") || "—",
          focus: focus.join(", ") || "—",
        }),
      });
      const data = await res.json();
      setStatus(res.ok && data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const disabled = status === "sending" || status === "sent";

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      <div className="form__step">{t("step1")}</div>
      <div className={`field${errors.f_name ? " has-err" : ""}`}>
        <label htmlFor="f_name">{t("f_name")}</label>
        <input id="f_name" value={name} onChange={(e) => setName(e.target.value)} disabled={disabled} />
        <span className="err">{t("err.name")}</span>
      </div>
      <div className={`field${errors.f_email ? " has-err" : ""}`}>
        <label htmlFor="f_email">{t("form.email")}</label>
        <input
          id="f_email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
        />
        <span className="err">{t("err.email")}</span>
      </div>
      <div className="field">
        <label htmlFor="f_company">{t("f_company")}</label>
        <input
          id="f_company"
          placeholder={t("f_company_ph")}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="form__step" style={{ marginTop: 24 }}>
        {t("step2")}
      </div>
      <div className="field">
        <label>{t("kind_label")}</label>
        <div className="chips-select">
          {KIND_OPTIONS.map((o) => (
            <button
              key={o.v}
              type="button"
              className={kind.includes(o.v) ? "is-active" : undefined}
              onClick={() => toggle(kind, setKind, o.v)}
              disabled={disabled}
            >
              {o.labelKey ? t(o.labelKey) : o.fallback}
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        <label>{t("focus_label")}</label>
        <div className="chips-select">
          {FOCUS_OPTIONS.map((o) => (
            <button
              key={o.v}
              type="button"
              className={focus.includes(o.v) ? "is-active" : undefined}
              onClick={() => toggle(focus, setFocus, o.v)}
              disabled={disabled}
            >
              {o.labelKey ? t(o.labelKey) : o.fallback}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="budget-row">
          <span>{t("budget_label")}</span>
          <span>{formatBudget(budget, t("budget_unit"))}</span>
        </div>
        <input
          type="range"
          className="slider"
          min={3}
          max={30}
          step={1}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          disabled={disabled}
        />
        <span className="form__helper">{t("budget_helper")}</span>
      </div>

      <div className="form__step" style={{ marginTop: 24 }}>
        {t("step3")}
      </div>
      <div className={`field${errors.f_msg ? " has-err" : ""}`}>
        <label htmlFor="f_msg">{t("msg_label")}</label>
        <textarea
          id="f_msg"
          placeholder={t("msg_placeholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
        />
        <span className="err">{t("err.msg")}</span>
      </div>

      <div className="form__submit">
        <span className="form__helper">{t("submit_helper")}</span>
        <button type="submit" className="btn btn--primary" disabled={disabled}>
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </div>

      {status === "error" && <p style={{ color: "#c4513a", fontSize: 13 }}>{t("err.submit")}</p>}

      <div className={`form__sent${status === "sent" ? " is-shown" : ""}`}>
        <h3>{t("sent_title")}</h3>
        <p>{t("sent_p")}</p>
      </div>
    </form>
  );
}
