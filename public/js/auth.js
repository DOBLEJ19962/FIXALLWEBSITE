// public/js/auth.js
import { supabase } from "./supabase.js";

// ===================================
// REGISTRO + CONFIRMACIÓN DE EMAIL
// ===================================
document.getElementById("registerBtn")?.addEventListener("click", async () => {

  const full_name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const street = document.getElementById("street").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const zipcode = document.getElementById("zipcode").value.trim();
  const role = document.getElementById("role").value;

  if (!full_name || !email || !password) {
    return alert("Faltan campos obligatorios.");
  }

  // Crear usuario en AUTH
  const { data: auth, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + "/login.html"
    }
  });

  if (authError) return alert(authError.message);

  // Guardar datos mientras el usuario confirma su email
  localStorage.setItem("pending_user_info", JSON.stringify({
    full_name,
    phone,
    street,
    city,
    state,
    zipcode,
    role
  }));

  alert("Revisa tu correo para confirmar tu email.");
  location.href = "/login.html";
});

// =======================
// LOGIN
// =======================
document.getElementById("loginBtn")?.addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    return alert("Completa todos los campos.");
  }

  // Login real
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return alert(error.message);

  if (!data.user.email_confirmed_at) {
    return alert("Confirma tu correo antes de iniciar sesión.");
  }

  // Actualizar datos si estaban pendientes del registro
  const pending = JSON.parse(localStorage.getItem("pending_user_info"));
  if (pending) {
    await supabase.from("users")
      .update(pending)
      .eq("id", data.user.id);

    localStorage.removeItem("pending_user_info");
  }

  // Obtener perfil completo
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  localStorage.setItem("fixall_user", JSON.stringify(profile));

  if (profile.role === "client") {
    location.href = "/client/dashboard.html";
  } else {
    location.href = "/worker/dashboard.html";
  }
});
