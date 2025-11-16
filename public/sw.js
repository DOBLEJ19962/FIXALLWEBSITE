self.addEventListener("install", e => {
  console.log("SW instalado");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("SW activado");
});
