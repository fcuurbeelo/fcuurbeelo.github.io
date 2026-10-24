# fcuurbeelo.github.io

Portafolio personal de **Francisco Curbelo**, estudiante de CFGS Desarrollo de Aplicaciones Multiplataforma en el IES Lomo de la Herradura.

Sitio estático hecho con HTML, CSS y JavaScript, sin frameworks ni imágenes pesadas. Está pensado para publicarse en GitHub Pages.

## Vista local

Desde esta carpeta:

```bash
python -m http.server 8000
```

Abre <http://localhost:8000>.

También puedes abrir `index.html` directamente, aunque el servidor local reproduce mejor las rutas de GitHub Pages.

## Estructura

```text
fcuurbeelo.github.io/
├─ index.html
├─ assets/
│  ├─ css/styles.css
│  ├─ js/main.js
│  └─ img/favicon.svg
├─ .nojekyll
├─ robots.txt
├─ sitemap.xml
└─ README.md
```

## Contenido

- Cabecera con degradado azul/violeta y línea con efecto de escritura.
- Sobre mí con un bloque de código Java.
- Experiencia y formación en dos líneas temporales.
- Stack por categorías con chips.
- Proyecto publicado y dos tarjetas «Próximamente».
- Contacto con marcadores pendientes de completar.

## Accesibilidad y movimiento

- HTML semántico, enlace para saltar al contenido y foco visible.
- El efecto de escritura y las animaciones se desactivan con `prefers-reduced-motion: reduce`.
- Sin imágenes de contenido pesadas; solo el favicon SVG.
- Sin analítica ni cookies.

## TODO antes de publicar

- [ ] Sustituir `tu-email@ejemplo.com` por el email real.
- [ ] Sustituir `TU-USUARIO` por el perfil real de LinkedIn.
- [ ] Revisar los textos de experiencia y formación.
- [ ] Confirmar que el repositorio se llama exactamente `fcuurbeelo.github.io`.
- [ ] Activar GitHub Pages desde `main` y la raíz `/`.

## Publicación en GitHub Pages

1. Crear el repositorio público `fcuurbeelo.github.io`.
2. Subir el contenido de esta carpeta a `main`.
3. En **Settings → Pages**, elegir **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
4. Esperar a que GitHub Pages publique <https://fcuurbeelo.github.io/>.

No se ha creado ningún repositorio, commit ni push desde este borrador.
