# Licencia de General Contractor en Florida — página y banco de preguntas

Página de estudio para la licencia estatal Certified General Contractor (CGC) de Florida, ante el DBPR / Construction Industry Licensing Board (CILB). Incluye la ruta de la licencia en 8 pasos, el curso de capacitación en 8 módulos, el plan de estudio de 12 semanas, la lista oficial de libros del examen y un simulacro de práctica de 30 preguntas.

## Página pública

https://licencia-gc-florida.pages.dev/ — alojada en Cloudflare Pages (cuenta de Ramón, ingreso con su Google).

## Archivos

- `index.html` — la página completa en un solo archivo (HTML, CSS y JavaScript; sin dependencias externas).
- `banco-preguntas.sql` — la fuente base del simulacro en SQL (compatible con SQLite y Cloudflare D1): tablas `fuentes_oficiales`, `partes`, `preguntas` y `opciones`, con las 30 preguntas verificadas, cada una con su explicación y su fuente oficial citada.
- `banco-preguntas.json` — el mismo banco en formato JSON.

## Regla del banco

Ninguna pregunta entra sin fuente oficial citada y respuesta corroborada contra esa fuente. Las leyes citadas (Estatutos de Florida caps. 489, 713 y 455, reglas 61G4, OSHA 29 CFR 1926) son textos públicos. Los manuales comerciales de la lista oficial del CILB (Florida Contractors Manual, documentos AIA, Builder's Guide to Accounting, etc.) se referencian por libro y tema; su texto no se reproduce por derechos de autor.

## Base de datos

El banco está cargado en Cloudflare D1 (misma cuenta que la página) y la página consulta esa base para presentar y corroborar las preguntas del simulacro. Para ampliar el banco se agregan registros a las tablas `preguntas` y `opciones`, no se reescribe la página.
