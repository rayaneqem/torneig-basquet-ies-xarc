import nodemailer from 'nodemailer';

const GMAIL_USER = 'torneigbasquetiesxarc@gmail.com';
const GMAIL_PASS = process.env.GMAIL_PASSWORD;

// ⚠️ PROVA — només s'envia a tu. Quan confirmis, canvia per la llista completa.
const DESTINATARIS = [
  'z118324@iesxarc.es',
];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: GMAIL_USER, pass: GMAIL_PASS },
});

const subject = '🏀 Torneig de Bàsquet IES Xarc — Comunicació important!!! - Classificació final i Playoffs';

const html = `
<!DOCTYPE html>
<html lang="ca">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f1623;font-family:'Segoe UI',Arial,sans-serif;color:#e8e0d0">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">

  <!-- Capçalera -->
  <div style="text-align:center;margin-bottom:32px">
    <div style="font-size:48px;margin-bottom:8px">🏀</div>
    <h1 style="font-size:28px;font-weight:900;letter-spacing:0.06em;color:#f5a623;margin:0;text-transform:uppercase">Torneig de Bàsquet</h1>
    <p style="font-size:13px;color:#888;margin:4px 0 0;letter-spacing:0.12em;text-transform:uppercase">IES Xarc 2026</p>
  </div>

  <!-- Desqualificació ICE -->
  <div style="background:#1a0a0a;border:1px solid rgba(239,71,111,0.4);border-radius:12px;padding:20px 24px;margin-bottom:24px">
    <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#ef476f;margin:0 0 10px">⚠️ Comunicat important</p>
    <p style="margin:0 0 10px;line-height:1.6;color:#e8e0d0">
      Després del partit d'avui, preparant les semifinals, hem detectat que l'equip <strong style="color:#ef476f">I.C.E</strong> ha estat jugant durant tot el torneig amb jugadors <strong>no inscrits</strong> en el seu equip.
    </p>
    <p style="margin:0;line-height:1.6;color:#e8e0d0">
      Per aquest motiu, s'ha decidit que l'ideal seria la seva <strong style="color:#ef476f">desqualificació i eliminació</strong>, ja que segons la normativa, no està permès, i tots els equips tenen l'accés per veure quins són els integrants dels seus equips a la web. D'igual manera, per incompliment de la normativa, s'ha decidit que els partits jugats per <strong style="color:#ef476f">I.C.E</strong> queden amb resultat de <strong>3–0 en contra</strong>.
    </p>
  </div>

  <!-- Classificació final -->
  <div style="background:#141d2e;border:1px solid #2a3a5c;border-radius:12px;padding:20px 24px;margin-bottom:24px">
    <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#f5a623;margin:0 0 16px">🏆 Classificació final fase regular</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <thead>
        <tr style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">
          <th style="padding:6px 8px;text-align:left">#</th>
          <th style="padding:6px 8px;text-align:left">Equip</th>
          <th style="padding:6px 8px;text-align:center">PTS</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:rgba(255,215,0,0.08)">
          <td style="padding:10px 8px;font-weight:900;color:#ffd700">1</td>
          <td style="padding:10px 8px;font-weight:700;color:#e8e0d0">👩‍🏫 PROFESSORAT</td>
          <td style="padding:10px 8px;text-align:center;font-weight:900;color:#f5a623">21</td>
        </tr>
        <tr style="background:rgba(192,192,192,0.06)">
          <td style="padding:10px 8px;font-weight:900;color:#c0c0c0">2</td>
          <td style="padding:10px 8px;font-weight:700;color:#e8e0d0">🍺 ASTON BIRRAS</td>
          <td style="padding:10px 8px;text-align:center;font-weight:900;color:#f5a623">18</td>
        </tr>
        <tr style="background:rgba(205,127,50,0.06)">
          <td style="padding:10px 8px;font-weight:900;color:#cd7f32">3</td>
          <td style="padding:10px 8px;font-weight:700;color:#e8e0d0">🤣 BROS XD</td>
          <td style="padding:10px 8px;text-align:center;font-weight:900;color:#f5a623">15</td>
        </tr>
        <tr style="background:rgba(48,209,88,0.06)">
          <td style="padding:10px 8px;font-weight:900;color:#30d158">4</td>
          <td style="padding:10px 8px;font-weight:700;color:#e8e0d0">🪿 GOON SQUAD</td>
          <td style="padding:10px 8px;text-align:center;font-weight:900;color:#f5a623">12</td>
        </tr>
        <tr><td style="padding:8px 8px;color:#666">5</td><td style="padding:8px 8px;color:#666">🕺 LOS WI LIVE</td><td style="padding:8px 8px;text-align:center;color:#666">9</td></tr>
        <tr><td style="padding:8px 8px;color:#444">6</td><td style="padding:8px 8px;color:#444">☮️ PEACE AND LOVE — <span style="color:#ef476f;font-size:11px">ELIMINAT</span></td><td style="padding:8px 8px;text-align:center;color:#444">0</td></tr>
        <tr><td style="padding:8px 8px;color:#444">7</td><td style="padding:8px 8px;color:#444">🛃 I.C.E — <span style="color:#ef476f;font-size:11px">DEQUALIFICAT</span></td><td style="padding:8px 8px;text-align:center;color:#444">0</td></tr>
        <tr><td style="padding:8px 8px;color:#444">8</td><td style="padding:8px 8px;color:#444">🏀 LA SQUAD — <span style="color:#ef476f;font-size:11px">ELIMINAT</span></td><td style="padding:8px 8px;text-align:center;color:#444">0</td></tr>
      </tbody>
    </table>
  </div>

  <!-- Semifinals -->
  <div style="background:#141d2e;border:1px solid #2a3a5c;border-radius:12px;padding:20px 24px;margin-bottom:24px">
    <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#f5a623;margin:0 0 16px">⚔️ Enfrontaments de semifinals</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div style="flex:1;min-width:200px;background:rgba(245,166,35,0.07);border:1px solid rgba(245,166,35,0.2);border-radius:10px;padding:14px 16px;text-align:center">
        <p style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px">Semi 1</p>
        <p style="font-weight:900;color:#ffd700;font-size:15px;margin:0">1r PROFESSORAT</p>
        <p style="color:#555;font-size:13px;margin:4px 0">vs</p>
        <p style="font-weight:900;color:#30d158;font-size:15px;margin:0">4t GOON SQUAD</p>
      </div>
      <div style="flex:1;min-width:200px;background:rgba(245,166,35,0.07);border:1px solid rgba(245,166,35,0.2);border-radius:10px;padding:14px 16px;text-align:center">
        <p style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px">Semi 2</p>
        <p style="font-weight:900;color:#c0c0c0;font-size:15px;margin:0">2n ASTON BIRRAS</p>
        <p style="color:#555;font-size:13px;margin:4px 0">vs</p>
        <p style="font-weight:900;color:#cd7f32;font-size:15px;margin:0">3r BROS XD</p>
      </div>
    </div>
  </div>

  <!-- Format playoffs -->
  <div style="background:#141d2e;border:1px solid #2a3a5c;border-radius:12px;padding:20px 24px;margin-bottom:24px">
    <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#f5a623;margin:0 0 16px">📅 Format i calendari de playoffs</p>

    <p style="margin:0 0 14px;line-height:1.6;color:#aaa;font-size:13px">
      Les semifinals i el partit de 3r i 4t lloc es jugaran a <strong style="color:#e8e0d0">2 partits</strong>. El guanyador serà l'equip amb més punts en el còmput global dels dos partits.<br>
      <em style="color:#666;font-size:12px">Exemple: si la semi queda 12–9 i 5–10, el còmput global és 17–19 i guanya el segon.</em>
    </p>

    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead>
        <tr style="color:#666;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px solid #1e2d45">
          <th style="padding:6px 8px;text-align:left">Data</th>
          <th style="padding:6px 8px;text-align:left">Fase</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid #1a2538">
          <td style="padding:10px 8px;color:#888;white-space:nowrap">Dc 6/5</td>
          <td style="padding:10px 8px;color:#aaa">Descans — comunicació als 4 primers classificats</td>
        </tr>
        <tr style="border-bottom:1px solid #1a2538">
          <td style="padding:10px 8px;color:#f5a623;font-weight:700;white-space:nowrap">Dj 7/5 (2n pati)· Dv 8/5 (2n pati)</td>
          <td style="padding:10px 8px;color:#e8e0d0;font-weight:600">⚔️ Semifinal 1 — PROFESSORAT vs GOON SQUAD <br><span style="color:#888;font-size:12px;font-weight:400">PROFESSORAT vs GOON SQUAD</span></td>
        </tr>
        <tr style="border-bottom:1px solid #1a2538">
          <td style="padding:10px 8px;color:#f5a623;font-weight:700;white-space:nowrap">Dl 11/5 (2n pati)· Dt 12/5 (2n pati)</td>
          <td style="padding:10px 8px;color:#e8e0d0;font-weight:600">⚔️ Semifinal 2 — ASTON BIRRAS vs BROS XD <br><span style="color:#888;font-size:12px;font-weight:400">ASTON BIRRAS vs BROS XD</span></td>
        </tr>
        <tr style="border-bottom:1px solid #1a2538">
          <td style="padding:10px 8px;color:#f5a623;font-weight:700;white-space:nowrap">Dc 13/5 (2n pati)· Dj 14/5 (2n pati)</td>
          <td style="padding:10px 8px;color:#e8e0d0;font-weight:600">🥉 3r i 4t lloc — Partits 1 i 2</td>
        </tr>
        <tr>
          <td style="padding:10px 8px;color:#ffd700;font-weight:900;white-space:nowrap">Dv 15/5</td>
          <td style="padding:10px 8px;color:#ffd700;font-weight:900">🏆 GRAN FINAL<br><span style="color:#f5a623;font-size:12px;font-weight:400">1r i 2n pati — format especial (es començarà al primer pati i es continuarà al segon pati.</span></td>
        </tr>
      </tbody>
    </table>

  <!-- Peu -->
  <div style="text-align:center;margin-top:32px;padding-top:24px;border-top:1px solid #1e2d45">
    <p style="font-size:12px;color:#555;margin:0">Torneig de Bàsquet IES Xarc 2026</p>
    <p style="font-size:12px;color:#555;margin:4px 0 0">
      <a href="https://rayaneqem.github.io/torneig-basquet-ies-xarc/" style="color:#f5a623;text-decoration:none">Veure classificació en directe →</a>
    </p>
  </div>

</div>
</body>
</html>
`;

async function send() {
  console.log(`Enviant a: ${DESTINATARIS.join(', ')}...`);
  await transporter.sendMail({
    from: `"Torneig Bàsquet IES Xarc" <${GMAIL_USER}>`,
    to: DESTINATARIS.join(', '),
    subject,
    html,
  });
  console.log('✅ Correu enviat correctament!');
}

send().catch(err => {
  console.error('❌ Error enviant:', err.message);
  process.exit(1);
});
