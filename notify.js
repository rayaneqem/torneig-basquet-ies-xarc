import nodemailer from 'nodemailer';

const GMAIL_USER = 'rayaneqem@gmail.com';
const GMAIL_PASS = process.env.GMAIL_PASSWORD;

const FIREBASE_URL = 'https://torneig-iesxarc-default-rtdb.europe-west1.firebasedatabase.app';
const WEB_URL      = 'https://rayaneqem.github.io/torneig-basquet-ies-xarc/';
const SUPORT_EMAIL = 'z118324@iesxarc.es';

const ORGANITZADORS = ['z118324@iesxarc.es', 'ecanovas@iesxarc.es'];

const EMAIL_ARBITRES = {
  'Rayan':    'z118324@iesxarc.es',
  'Thibault': 'z201085@iesxarc.es',
  'Lluc':     'z133120@iesxarc.es',
  'Pere':     'z133138@iesxarc.es',
  'Raul':     'z131932@iesxarc.es',
  'Didac':    'z168689@iesxarc.es',
  'Sergio':   'z133122@iesxarc.es',
  'Joel':     'z118343@iesxarc.es',
  'Carlos':   'z133143@iesxarc.es',
  'Esteve':   'ecanovas@iesxarc.es',
};

const REFEREE_GROUPS = {
  'Grup 1': ['Raul', 'Joel', 'Thibault'],
  'Grup 2': ['Sergio', 'Lluc', 'Carlos'],
  'Grup 3': ['Pere', 'Rayan', 'Didac'],
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function unique(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function resolveRefereeNames(referee) {
  if (!referee) return '';
  return REFEREE_GROUPS[referee] ? REFEREE_GROUPS[referee].join(', ') : referee;
}

function getRefereeEmails(referee, emailMap) {
  if (!referee) return [];
  const names = REFEREE_GROUPS[referee] || referee.split(/[,\s]+/).map(n => n.trim()).filter(Boolean);
  return names.map(n => emailMap[n] || EMAIL_ARBITRES[n]).filter(Boolean);
}

function buildEmailMap(teams) {
  const map = { ...EMAIL_ARBITRES };
  teams.forEach(team => {
    (team.players || []).forEach(player => {
      if (player.email && player.name) {
        map[player.name.split(' ')[0]] = player.email;
        map[player.name] = player.email;
      }
    });
  });
  return map;
}

function getTeamPlayers(teams, teamName) {
  const team = teams.find(t => t.name === teamName);
  return team?.players || [];
}

async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"Torneig Basquet IES Xarc" <${GMAIL_USER}>`,
      replyTo: 'noreply@torneig.invalid',
      to,
      subject,
      html,
    });
    console.log(`OK -> ${to}`);
  } catch (e) {
    console.error(`ERR -> ${to}:`, e.message);
  }
}

function buildReminderHtml(team1, team2, date, time, location, refereeStr, rolText, refBadge) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#0d1117;color:#e6edf3;border-radius:12px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#08142A,#0D1E42);padding:28px 32px;border-bottom:2px solid #F97316">
      <div style="font-size:11px;color:rgba(249,115,22,0.8);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px">IES Xarc - Torneig Basquet 2025-26</div>
      <div style="font-size:24px;font-weight:900;color:#F97316">RECORDATORI DE PARTIT</div>
    </div>
    <div style="padding:28px 32px">
      <p style="color:#8b949e;margin-bottom:20px">Hola! Et recordem que dema tens un <strong style="color:#e6edf3">partit per ${rolText}</strong>:</p>
      <div style="background:#161b22;border:1px solid #30363d;border-radius:10px;padding:20px;margin-bottom:20px;text-align:center">
        <div style="font-size:20px;font-weight:900;color:#fff;margin-bottom:14px">${team1} <span style="color:#F97316">VS</span> ${team2}</div>
        <table style="width:100%;font-size:14px;color:#8b949e;text-align:left">
          <tr><td style="padding:5px 8px">Data</td><td style="color:#e6edf3;font-weight:600">${date}</td></tr>
          <tr><td style="padding:5px 8px">Hora</td><td style="color:#F97316;font-weight:700">${time}</td></tr>
          <tr><td style="padding:5px 8px">Lloc</td><td style="color:#e6edf3">${location}</td></tr>
          ${refereeStr ? `<tr><td style="padding:5px 8px">Arbitres</td><td style="color:#e6edf3">${refereeStr}</td></tr>` : ''}
        </table>
      </div>
      ${refBadge}
      <div style="text-align:center;margin:24px 0">
        <a href="${WEB_URL}" style="background:#F97316;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;display:inline-block">Veure classificacio i partits</a>
      </div>
      <div style="border-top:1px solid #21262d;padding-top:16px;font-size:11px;color:#484f58;text-align:center">
        Aquest correu es automatic. Si us plau, no responguis.<br>
        Per a qualsevol consulta: <a href="mailto:${SUPORT_EMAIL}" style="color:#F97316">${SUPORT_EMAIL}</a>
      </div>
    </div>
  </div>`;
}

function buildEliminationHtml(teamName, noShows) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#0d1117;color:#e6edf3;border-radius:12px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#1a0a0a,#2a0d0d);padding:28px 32px;border-bottom:2px solid #EF476F">
      <div style="font-size:11px;color:rgba(239,71,111,0.8);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px">IES Xarc - Torneig Basquet 2025-26</div>
      <div style="font-size:24px;font-weight:900;color:#EF476F">EQUIP ELIMINAT</div>
    </div>
    <div style="padding:28px 32px">
      <div style="background:#1a0a0a;border:1px solid rgba(239,71,111,0.3);border-radius:10px;padding:20px;margin-bottom:20px;text-align:center">
        <div style="font-size:22px;font-weight:900;color:#EF476F;margin-bottom:8px">${teamName}</div>
        <div style="color:#8b949e;font-size:14px">Ha acumulat <strong style="color:#EF476F">${noShows} no presentacions</strong> i queda eliminat del torneig.</div>
      </div>
      <div style="text-align:center;margin:24px 0">
        <a href="${WEB_URL}" style="background:#F97316;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;display:inline-block">Veure classificacio actualitzada</a>
      </div>
      <div style="border-top:1px solid #21262d;padding-top:16px;font-size:11px;color:#484f58;text-align:center">
        Aquest correu es automatic. Si us plau, no responguis.<br>
        Per a qualsevol consulta: <a href="mailto:${SUPORT_EMAIL}" style="color:#F97316">${SUPORT_EMAIL}</a>
      </div>
    </div>
  </div>`;
}

async function main() {
  const res  = await fetch(`${FIREBASE_URL}/.json`);
  const data = await res.json();
  if (!data) { console.log('No hi ha dades a Firebase'); return; }

  const tomorrow = getTomorrowDate();
  const upcoming = Object.values(data.upcoming || {});
  const results  = Object.values(data.results  || {});
  const teams    = Object.values(data.teams    || {});
  const emailMap = buildEmailMap(teams);

  const tomorrowMatches = upcoming.filter(m => m.date === tomorrow);
  console.log(`Partits dema (${tomorrow}): ${tomorrowMatches.length}`);

  for (const match of tomorrowMatches) {
    const { team1, team2, date, time = '--', location = 'Pista de basquet', referee = '' } = match;
    const players1      = getTeamPlayers(teams, team1);
    const players2      = getTeamPlayers(teams, team2);
    const playerEmails  = unique([...players1, ...players2].map(p => p.email || emailMap[p.name?.split(' ')[0]] || emailMap[p.name]));
    const refereeEmails = getRefereeEmails(referee, emailMap);
    const allEmails     = unique([...playerEmails, ...refereeEmails]);
    const refereeStr    = resolveRefereeNames(referee);
    const subject       = `Recordatori: ${team1} vs ${team2} - Dema ${date}`;

    for (const email of allEmails) {
      const isRef    = refereeEmails.includes(email);
      const rolText  = isRef ? 'arbitrar' : 'jugar';
      const refBadge = isRef
        ? `<div style="background:rgba(48,209,88,0.08);border:1px solid rgba(48,209,88,0.25);border-radius:8px;padding:14px;margin-bottom:20px;font-size:13px;color:#3DD68C">Ets arbitre d'aquest partit. Recorda confirmar la teva assistencia a la pestanya Arbitres de la web.</div>`
        : '';
      const html = buildReminderHtml(team1, team2, date, time, location, refereeStr, rolText, refBadge);
      await sendEmail(email, subject, html);
    }
  }

  // Eliminacions
  const noShowCount = {};
  results.forEach(r => {
    if (r.noShow1) noShowCount[r.team1] = (noShowCount[r.team1] || 0) + 1;
    if (r.noShow2) noShowCount[r.team2] = (noShowCount[r.team2] || 0) + 1;
  });
  for (const [team, count] of Object.entries(noShowCount)) {
    if (count >= 3) {
      const subject = `Equip eliminat del torneig: ${team}`;
      const html    = buildEliminationHtml(team, count);
      for (const email of ORGANITZADORS) {
        await sendEmail(email, subject, html);
      }
    }
  }

  console.log('Fet!');
}

main();
