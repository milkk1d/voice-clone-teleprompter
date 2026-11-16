// Enlaces de afiliado del sitio. Cambiar un enlace aquí lo actualiza en todas las páginas.
// En el HTML se marcan con data-afiliado="<nombre>"; aplicarEnlaces() les pone la dirección,
// los abre en otra pestaña y los marca como patrocinados (rel="sponsored").
(function () {
  const ENLACES = {
    elevenlabs: "https://try.elevenlabs.io/i4kkput7oovt",
  };
  window.ENLACES = ENLACES;
  window.aplicarEnlaces = function (root) {
    (root || document).querySelectorAll("[data-afiliado]").forEach((a) => {
      const url = ENLACES[a.dataset.afiliado];
      if (!url) return;
      a.href = url;
      a.target = "_blank";
      a.rel = "sponsored noopener";
    });
  };
  window.aplicarEnlaces();
})();
