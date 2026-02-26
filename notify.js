import nodemailer from 'nodemailer';

const GMAIL_USER = 'torneigbasquetiesxarc@gmail.com';
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

// Converteix "2026-02-27" → "27/02/2026"
function formatDate(dateStr) {
  if (!dateStr) return dateStr;
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
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
      from: `"Torneig Bàsquet IES Xarc" <${GMAIL_USER}>`,
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
  const dateFormatted = formatDate(date);
  return `<!DOCTYPE html>
<html lang="ca">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:20px;background:#0A1628;font-family:'Barlow',Arial,sans-serif">
  <div style="max-width:540px;margin:0 auto;background:#0F1F3D;border-radius:14px;overflow:hidden;border:1px solid #1F3A6B;box-shadow:0 4px 20px rgba(0,0,0,0.5)">

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#0A1628 0%,#0F1F3D 60%,#162848 100%);padding:28px 32px;border-bottom:2px solid #F5A623">
      <div style="font-size:10px;color:rgba(245,166,35,0.7);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;font-weight:600">IES Xarc · Torneig Bàsquet 2025–26</div>
      <div style="font-size:26px;font-weight:900;color:#F5A623;letter-spacing:1px;text-transform:uppercase">🏀 Recordatori de Partit</div>
      <div style="width:36px;height:2px;background:#F5A623;border-radius:2px;opacity:0.7;margin-top:10px"></div>
    </div>

    <!-- BODY -->
    <div style="padding:28px 32px;background:#0A1628">

      <p style="color:#7A9CC8;margin:0 0 22px 0;font-size:15px;line-height:1.6">
        Hola! Et recordem que demà tens un <strong style="color:#E8F0FF">partit per ${rolText}</strong>:
      </p>

      <!-- MATCH CARD -->
      <div style="background:#0F1F3D;border:1px solid #1F3A6B;border-radius:12px;padding:24px;margin-bottom:20px;text-align:center">

        <!-- Equips -->
        <div style="font-size:20px;font-weight:900;color:#E8F0FF;margin-bottom:6px;letter-spacing:1px;text-transform:uppercase">
          ${team1}
        </div>
        <div style="font-size:13px;font-weight:700;color:#F5A623;letter-spacing:3px;margin-bottom:6px">VS</div>
        <div style="font-size:20px;font-weight:900;color:#E8F0FF;margin-bottom:20px;letter-spacing:1px;text-transform:uppercase">
          ${team2}
        </div>

        <!-- Divider -->
        <div style="height:1px;background:linear-gradient(90deg,transparent,#1F3A6B,transparent);margin-bottom:20px"></div>

        <!-- Detalls -->
        <table style="width:100%;font-size:14px;text-align:left;border-collapse:collapse">
          <tr>
            <td style="padding:8px 12px;color:#7A9CC8;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;width:100px">📅 Data</td>
            <td style="padding:8px 12px;color:#E8F0FF;font-weight:700">${dateFormatted}</td>
          </tr>
          <tr style="background:rgba(245,166,35,0.04);border-radius:6px">
            <td style="padding:8px 12px;color:#7A9CC8;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px">⏰ Hora</td>
            <td style="padding:8px 12px;color:#F5A623;font-weight:900;font-size:17px">${time}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#7A9CC8;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px">📍 Lloc</td>
            <td style="padding:8px 12px;color:#E8F0FF;font-weight:600">${location}</td>
          </tr>
          ${refereeStr ? `
          <tr style="background:rgba(245,166,35,0.04)">
            <td style="padding:8px 12px;color:#7A9CC8;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px">🦺 Àrbitres</td>
            <td style="padding:8px 12px;color:#E8F0FF">${refereeStr}</td>
          </tr>` : ''}
        </table>
      </div>

      <!-- BADGE ÀRBITRE -->
      ${refBadge}

      <!-- BOTÓ CTA -->
      <div style="text-align:center;margin:26px 0 22px">
        <a href="${WEB_URL}" style="background:#F5A623;color:#0A1628;text-decoration:none;padding:13px 32px;border-radius:8px;font-weight:900;font-size:14px;display:inline-block;text-transform:uppercase;letter-spacing:1px;box-shadow:0 2px 8px rgba(245,166,35,0.3)">
          Veure Classificació i Partits →
        </a>
      </div>

      <!-- FOOTER -->
      <div style="border-top:1px solid #1F3A6B;padding-top:16px;font-size:11px;color:#2A4E8A;text-align:center;line-height:2">
        Aquest correu és automàtic. Si us plau, no responguis.<br>
        Consultes: <a href="mailto:${SUPORT_EMAIL}" style="color:#F5A623;text-decoration:none">${SUPORT_EMAIL}</a>
      </div>

    </div>
  </div>
</body>
</html>`;
}

function buildEliminationHtml(teamName, noShows) {
  return `<!DOCTYPE html>
<html lang="ca">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:20px;background:#0A1628;font-family:'Barlow',Arial,sans-serif">
  <div style="max-width:540px;margin:0 auto;background:#0F1F3D;border-radius:14px;overflow:hidden;border:1px solid #1F3A6B;box-shadow:0 4px 20px rgba(0,0,0,0.5)">

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#1a0510 0%,#0F1F3D 100%);padding:28px 32px;border-bottom:2px solid #EF476F">
      <div style="font-size:10px;color:rgba(239,71,111,0.7);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;font-weight:600">IES Xarc · Torneig Bàsquet 2025–26</div>
      <div style="font-size:26px;font-weight:900;color:#EF476F;letter-spacing:1px;text-transform:uppercase">⛔ Equip Eliminat</div>
      <div style="width:36px;height:2px;background:#EF476F;border-radius:2px;opacity:0.7;margin-top:10px"></div>
    </div>

    <!-- BODY -->
    <div style="padding:28px 32px;background:#0A1628">

      <!-- TEAM CARD -->
      <div style="background:#0F1F3D;border:1px solid rgba(239,71,111,0.3);border-radius:12px;padding:24px;margin-bottom:20px;text-align:center">
        <div style="font-size:24px;font-weight:900;color:#EF476F;margin-bottom:10px;letter-spacing:1px;text-transform:uppercase">${teamName}</div>
        <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(239,71,111,0.3),transparent);margin-bottom:14px"></div>
        <div style="color:#7A9CC8;font-size:14px;line-height:1.6">
          Ha acumulat <strong style="color:#EF476F">${noShows} no presentacions</strong><br>i queda eliminat del torneig.
        </div>
      </div>

      <!-- BOTÓ CTA -->
      <div style="text-align:center;margin:26px 0 22px">
        <a href="${WEB_URL}" style="background:#F5A623;color:#0A1628;text-decoration:none;padding:13px 32px;border-radius:8px;font-weight:900;font-size:14px;display:inline-block;text-transform:uppercase;letter-spacing:1px;box-shadow:0 2px 8px rgba(245,166,35,0.3)">
          Veure Classificació Actualitzada →
        </a>
      </div>

      <!-- FOOTER -->
      <div style="border-top:1px solid #1F3A6B;padding-top:16px;font-size:11px;color:#2A4E8A;text-align:center;line-height:2">
        Aquest correu és automàtic. Si us plau, no responguis.<br>
        Consultes: <a href="mailto:${SUPORT_EMAIL}" style="color:#F5A623;text-decoration:none">${SUPORT_EMAIL}</a>
      </div>

    </div>
  </div>
</body>
</html>`;
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
    const subject       = `🏀 Recordatori: ${team1} vs ${team2} — Demà ${formatDate(date)}`;

    for (const email of allEmails) {
      const isRef    = refereeEmails.includes(email);
      const rolText  = isRef ? 'arbitrar' : 'jugar';
      const refBadge = isRef
        ? `<div style="background:rgba(6,214,160,0.07);border:1px solid rgba(6,214,160,0.25);border-radius:8px;padding:14px;margin-bottom:20px;font-size:13px;color:#06D6A0;line-height:1.6">
            🦺 <strong>Ets àrbitre d'aquest partit.</strong><br>
            Recorda confirmar la teva assistència a la pestanya Àrbitres de la web.
           </div>`
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
      const subject = `⛔ Equip eliminat del torneig: ${team}`;
      const html    = buildEliminationHtml(team, count);
      for (const email of ORGANITZADORS) {
        await sendEmail(email, subject, html);
      }
    }
  }

  console.log('Fet!');
}

main();
