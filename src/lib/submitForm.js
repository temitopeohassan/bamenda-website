// Sends a form to Formspree and returns { ok, error }.
// Arrays (checkbox groups) are joined so they read cleanly in the email.
export async function submitToFormspree(formId, data) {
  if (!formId || formId === 'yourFormId') {
    return {
      ok: false,
      error:
        'This form is not connected yet. Add the Formspree ID to your .env file (see README).',
    };
  }

  const payload = Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v]),
  );

  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    const body = await res.json().catch(() => ({}));
    const msg = body?.errors?.map((e) => e.message).join(' ') || 'Something went wrong.';
    return { ok: false, error: msg };
  } catch {
    return { ok: false, error: 'Network error — please check your connection and try again.' };
  }
}
