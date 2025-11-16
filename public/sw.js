self.addEventListener("install", () => {
  console.log("SW instalado");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("SW activado");
});
