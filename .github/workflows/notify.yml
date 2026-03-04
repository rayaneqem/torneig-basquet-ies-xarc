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
  auth: { user: GMAIL_USER, pass: GMAIL_PASS },
});

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function getYesterdayDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

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
      to, subject, html,
    });
    console.log(`OK -> ${to}`);
  } catch (e) {
    console.error(`ERR -> ${to}:`, e.message);
  }
}

// ── PLANTILLA: Recordatori de partit ────────────────────────
function buildReminderHtml(team1, team2, date, time, location, refereeStr, rolText, refBadge) {
  const dateFormatted = formatDate(date);
  return `<!DOCTYPE html>
<html lang="ca">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:20px;background:#0A1628;font-family:'Barlow',Arial,sans-serif">
  <div style="max-width:540px;margin:0 auto;background:#0F1F3D;border-radius:14px;overflow:hidden;border:1px solid #1F3A6B;box-shadow:0 4px 20px rgba(0,0,0,0.5)">
    <div style="background:linear-gradient(135deg,#0A1628 0%,#0F1F3D 60%,#162848 100%);padding:28px 32px;border-bottom:2px solid #F5A623">
      <div style="font-size:10px;color:rgba(245,166,35,0.7);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;font-weight:600">IES Xarc · Torneig Bàsquet 2025–26</div>
      <div style="font-size:26px;font-weight:900;color:#F5A623;letter-spacing:1px;text-transform:uppercase">🏀 Recordatori de Partit</div>
      <div style="width:36px;height:2px;background:#F5A623;border-radius:2px;opacity:0.7;margin-top:10px"></div>
    </div>
    <div style="padding:28px 32px;background:#0A1628">
      <p style="color:#7A9CC8;margin:0 0 22px 0;font-size:15px;line-height:1.6">
        Hola! Et recordem que demà tens un <strong style="color:#E8F0FF">partit per ${rolText}</strong>:
      </p>
      <div style="background:#0F1F3D;border:1px solid #1F3A6B;border-radius:12px;padding:24px;margin-bottom:20px;text-align:center">
        <div style="font-size:20px;font-weight:900;color:#E8F0FF;margin-bottom:6px;letter-spacing:1px;text-transform:uppercase">${team1}</div>
        <div style="font-size:13px;font-weight:700;color:#F5A623;letter-spacing:3px;margin-bottom:6px">VS</div>
        <div style="font-size:20px;font-weight:900;color:#E8F0FF;margin-bottom:20px;letter-spacing:1px;text-transform:uppercase">${team2}</div>
        <div style="height:1px;background:linear-gradient(90deg,transparent,#1F3A6B,transparent);margin-bottom:20px"></div>
        <table style="width:100%;font-size:14px;text-align:left;border-collapse:collapse">
          <tr>
            <td style="padding:8px 12px;color:#7A9CC8;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;width:100px">📅 Data</td>
            <td style="padding:8px 12px;color:#E8F0FF;font-weight:700">${dateFormatted}</td>
          </tr>
          <tr style="background:rgba(245,166,35,0.04)">
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
      ${refBadge}
      <div style="text-align:center;margin:26px 0 22px">
        <a href="${WEB_URL}" style="background:#F5A623;color:#0A1628;text-decoration:none;padding:13px 32px;border-radius:8px;font-weight:900;font-size:14px;display:inline-block;text-transform:uppercase;letter-spacing:1px">
          Veure Classificació i Partits →
        </a>
      </div>
      <div style="border-top:1px solid #1F3A6B;padding-top:16px;font-size:11px;color:#2A4E8A;text-align:center;line-height:2">
        Aquest correu és automàtic. Si us plau, no responguis.<br>
        Consultes: <a href="mailto:${SUPORT_EMAIL}" style="color:#F5A623;text-decoration:none">${SUPORT_EMAIL}</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ── PLANTILLA: Avís no presentació ──────────────────────────
function buildNoShowHtml(teamName, totalNP, date, isEliminated) {
  const color     = isEliminated ? '#EF476F' : '#F5A623';
  const bgColor   = isEliminated ? 'rgba(239,71,111,0.07)' : 'rgba(245,166,35,0.07)';
  const borderCol = isEliminated ? 'rgba(239,71,111,0.3)' : 'rgba(245,166,35,0.3)';

  let title, message, warning;
  if (isEliminated) {
    title   = '⛔ Equip eliminat';
    message = `El vostre equip <strong style="color:${color}">${teamName}</strong> ha acumulat <strong style="color:${color}">${totalNP} no presentacions</strong> i queda <strong style="color:${color}">eliminat del torneig</strong>.`;
    warning = '';
  } else if (totalNP === 2) {
    title   = '⚠️ Avís important — Última oportunitat';
    message = `El vostre equip <strong style="color:${color}">${teamName}</strong> no es va presentar al partit del <strong>${formatDate(date)}</strong> i ja acumula <strong style="color:${color}">${totalNP} de 3 no presentacions</strong>.`;
    warning = `<div style="background:rgba(239,71,111,0.08);border:1px solid rgba(239,71,111,0.3);border-radius:8px;padding:14px;margin-bottom:20px;font-size:13px;color:#EF476F;line-height:1.7">
      <strong>⚠️ Atenció:</strong> Una altra no presentació suposarà l'eliminació automàtica del torneig.
    </div>`;
  } else {
    title   = '⚠️ Avís — No presentació registrada';
    message = `El vostre equip <strong style="color:${color}">${teamName}</strong> no es va presentar al partit del <strong>${formatDate(date)}</strong>. Aquesta és la <strong style="color:${color}">1a de 3 no presentacions</strong> permeses.`;
    warning = `<div style="background:rgba(245,166,35,0.07);border:1px solid rgba(245,166,35,0.25);border-radius:8px;padding:14px;margin-bottom:20px;font-size:13px;color:#F5A623;line-height:1.7">
      Recordeu que a les <strong>3 no presentacions</strong> l'equip serà eliminat automàticament del torneig.
    </div>`;
  }

  const dots = [1, 2, 3].map(i => {
    const filled = i <= totalNP;
    const bg = filled ? color : 'rgba(255,255,255,0.08)';
    return `<div style="width:28px;height:28px;border-radius:50%;background:${bg};display:inline-flex;align-items:center;justify-content:center;margin:0 4px;font-size:12px;font-weight:900;color:${filled ? '#0A1628' : '#444'};">${i}</div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="ca">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:20px;background:#0A1628;font-family:'Barlow',Arial,sans-serif">
  <div style="max-width:540px;margin:0 auto;background:#0F1F3D;border-radius:14px;overflow:hidden;border:1px solid #1F3A6B;box-shadow:0 4px 20px rgba(0,0,0,0.5)">
    <div style="background:linear-gradient(135deg,#0A1628 0%,#0F1F3D 100%);padding:28px 32px;border-bottom:2px solid ${color}">
      <div style="font-size:10px;color:rgba(245,166,35,0.7);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;font-weight:600">IES Xarc · Torneig Bàsquet 2025–26</div>
      <div style="font-size:24px;font-weight:900;color:${color};letter-spacing:1px;text-transform:uppercase">${title}</div>
      <div style="width:36px;height:2px;background:${color};border-radius:2px;opacity:0.7;margin-top:10px"></div>
    </div>
    <div style="padding:28px 32px;background:#0A1628">
      <div style="background:${bgColor};border:1px solid ${borderCol};border-radius:12px;padding:24px;margin-bottom:20px;text-align:center">
        <div style="font-size:20px;font-weight:900;color:#E8F0FF;margin-bottom:16px;letter-spacing:1px;text-transform:uppercase">${teamName}</div>
        <div style="margin-bottom:16px">${dots}</div>
        <div style="height:1px;background:linear-gradient(90deg,transparent,${borderCol},transparent);margin-bottom:16px"></div>
        <p style="color:#7A9CC8;font-size:14px;line-height:1.7;margin:0">${message}</p>
      </div>
      ${warning}
      <div style="text-align:center;margin:26px 0 22px">
        <a href="${WEB_URL}" style="background:#F5A623;color:#0A1628;text-decoration:none;padding:13px 32px;border-radius:8px;font-weight:900;font-size:14px;display:inline-block;text-transform:uppercase;letter-spacing:1px">
          Veure Classificació →
        </a>
      </div>
      <div style="border-top:1px solid #1F3A6B;padding-top:16px;font-size:11px;color:#2A4E8A;text-align:center;line-height:2">
        Aquest correu és automàtic. Si us plau, no responguis.<br>
        Consultes: <a href="mailto:${SUPORT_EMAIL}" style="color:#F5A623;text-decoration:none">${SUPORT_EMAIL}</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ── PLANTILLA: Eliminació (per als organitzadors) ───────────
function buildEliminationHtml(teamName, noShows) {
  return `<!DOCTYPE html>
<html lang="ca">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:20px;background:#0A1628;font-family:'Barlow',Arial,sans-serif">
  <div style="max-width:540px;margin:0 auto;background:#0F1F3D;border-radius:14px;overflow:hidden;border:1px solid #1F3A6B;box-shadow:0 4px 20px rgba(0,0,0,0.5)">
    <div style="background:linear-gradient(135deg,#1a0510 0%,#0F1F3D 100%);padding:28px 32px;border-bottom:2px solid #EF476F">
      <div style="font-size:10px;color:rgba(239,71,111,0.7);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;font-weight:600">IES Xarc · Torneig Bàsquet 2025–26</div>
      <div style="font-size:26px;font-weight:900;color:#EF476F;letter-spacing:1px;text-transform:uppercase">⛔ Equip Eliminat</div>
      <div style="width:36px;height:2px;background:#EF476F;border-radius:2px;opacity:0.7;margin-top:10px"></div>
    </div>
    <div style="padding:28px 32px;background:#0A1628">
      <div style="background:#0F1F3D;border:1px solid rgba(239,71,111,0.3);border-radius:12px;padding:24px;margin-bottom:20px;text-align:center">
        <div style="font-size:24px;font-weight:900;color:#EF476F;margin-bottom:10px;letter-spacing:1px;text-transform:uppercase">${teamName}</div>
        <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(239,71,111,0.3),transparent);margin-bottom:14px"></div>
        <div style="color:#7A9CC8;font-size:14px;line-height:1.6">
          Ha acumulat <strong style="color:#EF476F">${noShows} no presentacions</strong><br>i queda eliminat del torneig.
        </div>
      </div>
      <div style="text-align:center;margin:26px 0 22px">
        <a href="${WEB_URL}" style="background:#F5A623;color:#0A1628;text-decoration:none;padding:13px 32px;border-radius:8px;font-weight:900;font-size:14px;display:inline-block;text-transform:uppercase;letter-spacing:1px">
          Veure Classificació Actualitzada →
        </a>
      </div>
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

  const tomorrow  = getTomorrowDate();
  const yesterday = getYesterdayDate();
  const upcoming  = Object.values(data.upcoming || {});
  const results   = Object.values(data.results  || {});
  const teams     = Object.values(data.teams    || {});
  const emailMap  = buildEmailMap(teams);

  // ── 1. RECORDATORIS DE DEMÀ ──────────────────────────────
  const tomorrowMatches = upcoming.filter(m => m.date === tomorrow);
  console.log(`Partits dema (${tomorrow}): ${tomorrowMatches.length}`);

  for (const match of tomorrowMatches) {
    const { team1, team2, date, time = '--', location = 'Pista de basquet', referee = '' } = match;
    const players1      = getTeamPlayers(teams, team1);
    const players2      = getTeamPlayers(teams, team2);
    const playerEmails  = unique([...players1, ...players2].map(p => p.email || emailMap[p.name?.split(' ')[0]] || emailMap[p.name]));
    const refereeEmails = getRefereeEmails(referee, emailMap);
    const refereeStr    = resolveRefereeNames(referee);
    const subject       = `🏀 Recordatori: ${team1} vs ${team2} — Demà ${formatDate(date)}`;

    const refBadge = `<div style="background:rgba(6,214,160,0.07);border:1px solid rgba(6,214,160,0.25);border-radius:8px;padding:14px;margin-bottom:20px;font-size:13px;color:#06D6A0;line-height:1.6">
      🦺 <strong>Ets àrbitre d'aquest partit.</strong><br>
      Recorda confirmar la teva assistència a la pestanya Àrbitres de la web.
    </div>`;

    for (const email of playerEmails) {
      await sendEmail(email, subject, buildReminderHtml(team1, team2, date, time, location, refereeStr, 'jugar', ''));
    }
    for (const email of refereeEmails) {
      await sendEmail(email, `🦺 ${subject}`, buildReminderHtml(team1, team2, date, time, location, refereeStr, 'arbitrar', refBadge));
    }
  }

  // ── 2. AVISOS DE NO PRESENTACIÓ D'AHIR ──────────────────
  const yesterdayNoShows = results.filter(r =>
    r.date === yesterday && (r.noShow1 || r.noShow2)
  );
  console.log(`No presentacions ahir (${yesterday}): ${yesterdayNoShows.length}`);

  // Compta el total de NP per cada equip a tota la temporada
  const noShowCount = {};
  results.forEach(r => {
    if (r.noShow1) noShowCount[r.team1] = (noShowCount[r.team1] || 0) + 1;
    if (r.noShow2) noShowCount[r.team2] = (noShowCount[r.team2] || 0) + 1;
  });

  // Equips ja notificats en aquesta execució (evita duplicats)
  const notifiedTeams = new Set();

  for (const match of yesterdayNoShows) {
    for (const [teamName, isNoShow] of [[match.team1, match.noShow1], [match.team2, match.noShow2]]) {
      if (!isNoShow || notifiedTeams.has(teamName)) continue;
      notifiedTeams.add(teamName);

      const totalNP    = noShowCount[teamName] || 0;
      const players    = getTeamPlayers(teams, teamName);
      const emails     = unique(players.map(p => p.email || emailMap[p.name?.split(' ')[0]] || emailMap[p.name]));

      console.log(`NP avís: ${teamName} (${totalNP}/3) → ${emails.length} jugadors`);

      if (totalNP >= 3) {
        const subject = `⛔ El vostre equip ha estat eliminat del torneig`;
        for (const email of emails) {
          await sendEmail(email, subject, buildNoShowHtml(teamName, totalNP, match.date, true));
        }
        // Notifica també els organitzadors
        for (const email of ORGANITZADORS) {
          await sendEmail(email, `⛔ Equip eliminat: ${teamName}`, buildEliminationHtml(teamName, totalNP));
        }
      } else if (totalNP === 2) {
        const subject = `⚠️ Avís: us falta 1 no presentació per ser eliminats`;
        for (const email of emails) {
          await sendEmail(email, subject, buildNoShowHtml(teamName, totalNP, match.date, false));
        }
      } else {
        const subject = `⚠️ Avís: primera no presentació registrada`;
        for (const email of emails) {
          await sendEmail(email, subject, buildNoShowHtml(teamName, totalNP, match.date, false));
        }
      }
    }
  }

  console.log('Fet!');
}

main();
