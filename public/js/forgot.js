// public/js/forgot.js
import { supabase } from "./supabase.js";

document.getElementById("sendCodeBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  if (!email) return alert("Escribe tu correo.");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/reset.html"
  });

  if (error) return alert(error.message);

  alert("Revisa tu correo para restablecer tu contraseña.");
});
