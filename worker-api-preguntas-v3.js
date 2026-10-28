// API del banco de preguntas GC Florida — v3 bilingüe (ES/EN) con progreso
// Binding requerido: DB -> D1 banco-preguntas-gc
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
function json(d, s = 200) {
  return new Response(JSON.stringify(d), {
    status: s,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS }
  });
}
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });

    if (url.pathname === '/preguntas') {
      const ps = await env.DB.prepare(
        'SELECT p.id, pa.nombre AS parte, p.pregunta, p.pregunta_en, p.explicacion, p.explicacion_en, p.fuente, p.tema FROM preguntas p JOIN partes pa ON pa.id = p.parte_id ORDER BY p.parte_id, p.orden'
      ).all();
      const os = await env.DB.prepare(
        'SELECT pregunta_id, texto, texto_en, es_correcta FROM opciones ORDER BY pregunta_id, orden'
      ).all();
      const map = new Map();
      for (const o of os.results) {
        if (!map.has(o.pregunta_id)) map.set(o.pregunta_id, []);
        map.get(o.pregunta_id).push(o);
      }
      const preguntas = ps.results.map(p => {
        const ops = map.get(p.id) || [];
        return {
          id: p.id,
          parte: p.parte,
          tema: p.tema || null,
          q: p.pregunta,
          q_en: p.pregunta_en,
          ops: ops.map(o => o.texto),
          ops_en: ops.map(o => o.texto_en),
          ok: ops.findIndex(o => o.es_correcta === 1),
          exp: p.explicacion,
          exp_en: p.explicacion_en,
          fuente: p.fuente
        };
      });
      return json({ total: preguntas.length, preguntas });
    }

    if (url.pathname === '/resultados' && req.method === 'POST') {
      const b = await req.json();
      await env.DB.prepare(
        'INSERT INTO intentos (modo, total_preguntas, correctas, porcentaje, detalle) VALUES (?,?,?,?,?)'
      ).bind(
        b.modo || 'practica',
        b.total_preguntas || 0,
        b.correctas || 0,
        b.porcentaje || 0,
        JSON.stringify(b.detalle || {})
      ).run();
      return json({ ok: true });
    }

    if (url.pathname === '/progreso') {
      const rows = await env.DB.prepare('SELECT * FROM intentos ORDER BY id DESC LIMIT 50').all();
      const its = rows.results;
      const n = its.length;
      const prom = n ? its.reduce((a, i) => a + i.porcentaje, 0) / n : 0;
      const mejor = n ? Math.max(...its.map(i => i.porcentaje)) : 0;
      const porParte = {};
      for (const i of its) {
        try {
          const d = JSON.parse(i.detalle || '{}');
          for (const k in (d.porParte || {})) {
            porParte[k] = porParte[k] || { intentos: 0, suma: 0 };
            porParte[k].intentos++;
            porParte[k].suma += d.porParte[k];
          }
        } catch (e) {}
      }
      for (const k in porParte) {
        porParte[k].promedio = Math.round((porParte[k].suma / porParte[k].intentos) * 10) / 10;
        delete porParte[k].suma;
      }
      return json({
        resumen: { intentos: n, promedio: Math.round(prom * 10) / 10, mejor, porParte },
        intentos: its
      });
    }

    return json({ ok: true, servicio: 'api-preguntas-gc', rutas: ['/preguntas', '/resultados', '/progreso'] });
  }
};
