# Licencia GC Florida — Ruta, curso y simulacro

Página de estudio para la licencia **Certified General Contractor (CGC)** de Florida (DBPR / CILB), con curso completo bilingüe y simulacro en formato real.

**Página en vivo:** https://licencia-gc-florida.pages.dev (Cloudflare Pages)

## El banco de preguntas

330 preguntas originales **verificadas contra fuentes públicas abiertas** (Estatutos de Florida caps. 489, 713, 455 y 255; reglas 61G4; OSHA 29 CFR 1926; documentos AIA A101/A102/A201/A401/A701 citados por artículo; Florida Building Code), cada una con explicación y fuente, en **español e inglés**:

- Business & Finance: 150 (120 del examen + 30 de reserva)
- Contract Administration: 90 (60 + 30 de reserva)
- Project Management: 90 (60 + 30 de reserva)

Regla del banco: ninguna pregunta entra sin fuente corroborada. Los manuales comerciales (Florida Contractors Manual, AIA, Builder's Guide to Accounting) **no se reproducen** por derechos de autor; se citan por libro y capítulo. Las claves de respuesta pasaron una auditoría completa contra sus propias explicaciones (330/330).

Archivos:

- `banco-final-330.json` — el banco maestro bilingüe.
- `banco-final-330.sql` — el mismo banco como SQL (SQLite / Cloudflare D1), con tablas de fuentes, partes e intentos de progreso.
- `curso-bf.json`, `curso-ca.json`, `curso-pm.json` — el curso: 38 temas y 86 lecciones bilingües que enseñan cada regla, plazo y fórmula del banco, con la asignación pregunta → tema.
- `worker-api-preguntas-v3.js` — código de la API (Cloudflare Worker).
- `index.html` — la página completa (curso + práctica + simulacro + progreso).

## La API y la base de datos

- Base **Cloudflare D1** `banco-preguntas-gc` con las 330 preguntas, sus 1.320 opciones y la tabla `intentos` que guarda el progreso.
- API pública: https://api-preguntas-gc.ing-urribarri.workers.dev
  - `GET /preguntas` — el banco completo bilingüe con su tema por pregunta.
  - `POST /resultados` — registra un intento (modo, totales, detalle por parte y por tema).
  - `GET /progreso` — resumen e historial de intentos.

## Cómo funciona el simulacro

- **Modo examen (formato real):** Business & Finance sortea 120 de sus 150 en 6 h 30, Contract Administration 60 de 90 en 4 h 30 y Project Management 60 de 90 en 4 h 30; cada parte con su cuenta regresiva que arranca al empezar la parte y entrega automática al llegar a cero; aprobación con 70% por parte.
- **Modo práctica:** por parte o por tema, con explicación y fuente inmediatas.
- Cada intento sortea preguntas desde la reserva y mezcla preguntas y opciones: ningún intento sale igual a otro.
- Selector **Español | English** para toda la página: interfaz, curso, preguntas y explicaciones.
