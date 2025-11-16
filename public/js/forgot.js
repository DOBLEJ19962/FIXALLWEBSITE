import { supabase } from "./supabase.js";

document.getElementById("sendCodeBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  if (!email) return alert("Escribe tu correo.");

  // Verificar si existe el usuario
  const { data: user } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();

  if (!user) return alert("Ese correo no está registrado.");

  // Generar código
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Guardar en DB
  await supabase.from("password_reset_codes").insert({
    email,
    code,
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutos
  });

  // Guardar email para los siguientes pasos
  localStorage.setItem("reset_email", email);

  // Enviar correo a tu servidor backend
  await fetch("/send-reset-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code })
  });

  alert("Código enviado al correo.");
  location.href = "/verify-code.html";
});
