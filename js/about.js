document.addEventListener("DOMContentLoaded", () => {
    const helpBtn = document.getElementById("help-btn");
  
    helpBtn.addEventListener("click", () => {
      const intro = introJs();
  
      intro.setOptions({
        nextLabel: 'Siguiente',
        prevLabel: 'Anterior',
        doneLabel: 'Listo',
        skipLabel: '', // lo dejamos vacío
        steps: [
          {
            intro: "¡Bienvenido/a! Esta es una breve guía a través de la app."
          },
          {
            intro: "Esta aplicación te permite consultar datos sobre países del mundo."
          },
          {
            element: document.querySelector(".search-wrapper"),
            intro: "Acá podés buscar países por su nombre."
          },
          {
            element: document.querySelector("#dark-mode-toggle"),
            intro: "Y aca podés cambiar entre modo claro y oscuro."
          },
          {
            intro: "¡Eso es todo! Disfrutala."
          }
        ]
      });
  
      intro.onafterchange(() => {
        const skipBtn = document.querySelector('.introjs-skipbutton');
        if (skipBtn && !skipBtn.querySelector('i')) {
          skipBtn.innerHTML = '<i class="fas fa-times"></i>';
        }
      });
  
      intro.start();
    });
  });
  