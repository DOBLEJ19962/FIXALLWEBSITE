// public/js/auth.js
import { supabase } from "./supabase.js";

// ===================================
// REGISTRO CON CONFIRMACIÓN DE EMAIL
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

  // Crear usuario en Auth
  const { data: auth, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + "/login.html"
    }
  });

  if (authError) {
    console.error(authError);
    return alert(authError.message);
  }

  // Guardar datos adicionales en tabla users
  await supabase.from("users").insert({
    id: auth.user.id, // ID real de Supabase Auth
    full_name,
    email,
    phone,
    street,
    city,
    state,
    zipcode,
    role
  });

  alert("Cuenta creada. Revisa tu correo y confirma tu email para poder entrar.");
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

  if (error) {
    console.error(error);
    return alert(error.message);
  }

  // Evitar login si no ha confirmado su email
  if (!data.user.email_confirmed_at) {
    return alert("Confirma tu correo antes de iniciar sesión.");
  }

  // Obtener datos extra del usuario
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  // Guardar en localStorage
  localStorage.setItem("fixall_user", JSON.stringify(profile));

  // Redirigir según rol
  if (profile.role === "client") {
    location.href = "/client/dashboard.html";
  } else {
    location.href = "/worker/dashboard.html";
  }
});
