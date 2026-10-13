import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons.jsx';
import { submitToFormspree } from '../lib/submitForm.js';

// ── Form state hook ─────────────────────────────────────────────
export function useEnquiryForm({ initial, formId, validate }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [serverError, setServerError] = useState('');

  const set = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const bind = (name) => ({
    name,
    id: name,
    value: values[name] ?? '',
    onChange: (e) => set(name, e.target.value),
  });

  const toggle = (name, option) =>
    set(name, values[name].includes(option)
      ? values[name].filter((o) => o !== option)
      : [...values[name], option]);

  const onSubmit = async (e, extra = {}) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = document.getElementById(Object.keys(found)[0]);
      first?.focus();
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    setStatus('sending');
    setServerError('');
    const res = await submitToFormspree(formId, { ...values, ...extra });
    if (res.ok) {
      setStatus('sent');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStatus('error');
      setServerError(res.error);
    }
  };

  return { values, errors, status, serverError, set, bind, toggle, onSubmit };
}

export const required = (values, keys) =>
  keys.reduce((acc, k) => {
    const v = values[k];
    if (v === undefined || v === '' || v === false || (Array.isArray(v) && !v.length)) {
      acc[k] = 'This field is required.';
    }
    return acc;
  }, {});

export const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// ── Building blocks ─────────────────────────────────────────────
export function Fieldset({ num, title, hint, children }) {
  return (
    <fieldset className="fieldset">
      <legend><span className="num">{num}</span>{title}</legend>
      {hint && <p className="fieldset__hint">{hint}</p>}
      {children}
    </fieldset>
  );
}

export function Field({ label, name, req, help, error, full, children }) {
  return (
    <div className={`field ${full ? 'full' : ''} ${error ? 'invalid' : ''}`}>
      <label htmlFor={name}>
        {label} {req && <span className="req" aria-hidden="true">*</span>}
      </label>
      {children}
      {help && !error && <div className="help">{help}</div>}
      {error && <div className="error" role="alert">{error}</div>}
    </div>
  );
}

export function Select({ options, placeholder = 'Select…', ...props }) {
  return (
    <select {...props}>
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// Large radio tiles, e.g. Rent / Lease / Buy
export function Choices({ name, options, value, onChange, error }) {
  return (
    <>
      <div className="choices" role="radiogroup" id={name} tabIndex={-1}>
        {options.map((o) => (
          <label key={o.value} className="choice">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span>
              <strong>{o.label}</strong>
              {o.desc && <small>{o.desc}</small>}
            </span>
          </label>
        ))}
      </div>
      {error && <div className="field"><div className="error" role="alert">{error}</div></div>}
    </>
  );
}

// Multi-select checkbox chips
export function Chips({ name, options, values, onToggle, error, label }) {
  return (
    <div className={`field full ${error ? 'invalid' : ''}`}>
      {label && <span className="label">{label}</span>}
      <div className="chips" id={name} tabIndex={-1} role="group" aria-label={label}>
        {options.map((o) => (
          <label key={o} className="chip">
            <input type="checkbox" checked={values.includes(o)} onChange={() => onToggle(o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {error && <div className="error" role="alert">{error}</div>}
    </div>
  );
}

export function ContactFields({ bind, errors }) {
  return (
    <div className="fields">
      <Field label="Full name" name="name" req error={errors.name}>
        <input {...bind('name')} autoComplete="name" />
      </Field>
      <Field label="Email address" name="email" req error={errors.email}>
        <input {...bind('email')} type="email" autoComplete="email" />
      </Field>
      <Field label="Phone / WhatsApp number" name="phone" req error={errors.phone} help="Include country code if outside Nigeria.">
        <input {...bind('phone')} type="tel" autoComplete="tel" placeholder="080..." />
      </Field>
      <Field label="Best way to reach you" name="contactMethod">
        <Select {...bind('contactMethod')} options={['WhatsApp', 'Phone call', 'Email']} placeholder="No preference" />
      </Field>
    </div>
  );
}

export function Consent({ checked, onChange, error }) {
  return (
    <>
      <label className="consent" htmlFor="consent">
        <input id="consent" type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span>I agree that Bamenda may contact me about this enquiry. My details won’t be shared with third parties.</span>
      </label>
      {error && <div className="field"><div className="error" role="alert">Please tick the box so we can contact you.</div></div>}
    </>
  );
}

export function SubmitRow({ status, serverError, label }) {
  return (
    <>
      {status === 'error' && <div className="alert alert--error" role="alert">{serverError}</div>}
      <button type="submit" className="btn btn--dark" disabled={status === 'sending'} style={{ width: '100%' }}>
        {status === 'sending' ? 'Sending…' : label}
      </button>
    </>
  );
}

export function SuccessState({ title, children, backTo, backLabel }) {
  return (
    <div className="form-card success" role="status">
      <div className="success__icon"><Icon.Check /></div>
      <h2>{title}</h2>
      <p>{children}</p>
      <div className="btn-row">
        <Link to={backTo} className="btn btn--outline">{backLabel}</Link>
        <Link to="/" className="btn btn--dark">Back to home</Link>
      </div>
    </div>
  );
}
