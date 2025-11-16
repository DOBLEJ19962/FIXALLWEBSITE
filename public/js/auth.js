// public/js/auth.js
import { supabase } from "./supabase.js";

console.log("auth.js cargado");

// ======================
// REGISTER
// ======================
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

  if (!full_name || !email || !password || !phone || !street || !city || !state || !zipcode) {
    alert("Completa todos los campos.");
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .insert([{ full_name, email, password, phone, street, city, state, zipcode, role }])
    .select()
    .single();

  if (error) {
    console.error(error);
    alert("Error registrando: " + error.message);
    return;
  }

  localStorage.setItem("fixall_user", JSON.stringify(data));

  if (role === "client") location.href = "/client/dashboard.html";
  else location.href = "/worker/dashboard.html";
});

// ======================
// LOGIN
// ======================
document.getElementById("loginBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Introduce correo y contraseña.");
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    console.error(error);
    alert("Correo o contraseña incorrectos.");
    return;
  }

  localStorage.setItem("fixall_user", JSON.stringify(data));

  if (data.role === "client") location.href = "/client/dashboard.html";
  else location.href = "/worker/dashboard.html";
});

// ======================
// UPDATE PROFILE (EXPORT)
// ======================
export async function updateProfile(updatedData, userId) {
  const { data, error } = await supabase
    .from("users")
    .update(updatedData)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error(error);
    return { error };
  }

  localStorage.setItem("fixall_user", JSON.stringify(data));
  return { data };
}
