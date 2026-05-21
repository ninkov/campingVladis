const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return jsonResponse({ error: 'Email service is not configured.' }, 500);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400);
  }

  const name = String(payload.name || '').trim();
  const phone = String(payload.phone || '').trim();
  const email = String(payload.email || '').trim();
  const dates = String(payload.dates || '').trim();
  const message = String(payload.message || '').trim();

  if (!name || !email || !message) {
    return jsonResponse(
      { error: 'Name, email and message are required.' },
      400
    );
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ error: 'Invalid email address.' }, 400);
  }

  const text = [
    'Ново запитване от контакт формата:',
    '',
    `Име: ${name}`,
    `Телефон: ${phone || '-'}`,
    `Имейл: ${email}`,
    `Дати: ${dates || '-'}`,
    '',
    'Съобщение:',
    message,
  ].join('\n');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Запитване от ${name}`,
      text,
    }),
  });

  if (!resendResponse.ok) {
    return jsonResponse({ error: 'Email could not be sent.' }, 502);
  }

  return jsonResponse({ ok: true });
}
