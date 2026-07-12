export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const nome = (data.nome || "").trim();
  const email = (data.email || "").trim();
  const titulo = (data.titulo || "").trim();
  const mensagem = (data.mensagem || "").trim();

  if (!nome || !email || !titulo || !mensagem) {
    return Response.json({ error: "Preenche todos os campos." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Email inválido." }, { status: 400 });
  }

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTATO_FROM,
      to: env.CONTATO_PARA,
      reply_to: email,
      subject: `[Toca do Urso] ${titulo}`,
      text: `De: ${nome} <${email}>\n\n${mensagem}`,
    }),
  });

  if (!resendRes.ok) {
    return Response.json({ error: "Falha ao enviar a mensagem." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
