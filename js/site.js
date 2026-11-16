// Idioma de las páginas de contenido (guía, privacidad): muestra los bloques [data-l="es"] o [data-l="en"]
// y recuerda la elección en el mismo lugar que el resto del sitio (localStorage "tp.ui").
(function () {
  const get = () => { try { return JSON.parse(localStorage.getItem("tp.ui")); } catch (e) { return null; } };
  const set = (v) => { try { localStorage.setItem("tp.ui", JSON.stringify(v)); } catch (e) {} };
  let ui = get() || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");
  function apply() {
    document.documentElement.lang = ui;
    document.querySelectorAll("[data-l]").forEach((el) => { el.hidden = el.dataset.l !== ui; });
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === ui)));
    const title = document.querySelector(`meta[name="title-${ui}"]`);
    if (title) document.title = title.content;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".lang button");
    if (!b) return;
    ui = b.dataset.lang;
    set(ui);
    apply();
  });
  apply();
})();
