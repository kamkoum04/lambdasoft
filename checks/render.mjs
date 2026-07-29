/**
 * The one invariant nothing could check from source: the hero occupies exactly
 * one viewport. It is declared in Hero.astro and *spent* by StackGrid.astro,
 * which does not know it exists — raise `--tile` there and the photograph
 * re-crops, with the failure landing in a different file from the edit.
 *
 * Needs a browser, so it is not part of `npm test`. Run: npm run check:render
 */
import { spawn, execSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const PORT = 4455;
// Must track astro.config.mjs. This check was written before the site gained a
// deploy base and silently 404'd from then on — it requested /.wf/ and / while
// everything moved under /lambdasoft/.
const BASE = (process.env.BASE_PATH ?? '/lambdasoft').replace(/\/+$/, '');
const CH = 'google-chrome';
const FLAGS = '--headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion --virtual-time-budget=45000';

mkdirSync('dist/.wf', { recursive: true });
writeFileSync('dist/.wf/measure.html', `<!doctype html><meta charset=utf-8><title>m</title>
<style>html,body{margin:0}iframe{border:0;display:block}</style><iframe id=f></iframe><script>
const q=new URLSearchParams(location.search), f=document.getElementById('f');
f.style.width=q.get('w')+'px'; f.style.height=q.get('h')+'px'; f.src=q.get('u');
f.onload=()=>{const d=f.contentDocument,w=f.contentWindow;
 // the brand intro would otherwise cover the page while we measure it
 d.documentElement.removeAttribute('data-intro');
 const intro=d.getElementById('intro'); if(intro) intro.remove();
 [...d.images].forEach(i=>{i.loading='eager';i.decoding='sync';i.src=i.src;});
 setTimeout(()=>{const hero=d.querySelector('.hero');
  document.title=JSON.stringify({hero:Math.round(hero.getBoundingClientRect().height),
    viewport:w.innerHeight, sentinel:Math.round(d.querySelector('[data-hero-end]').getBoundingClientRect().top),
    bar:Math.round(d.querySelector('[data-bar]').getBoundingClientRect().height)});},2500);};
</script>`);

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore', detached: true });
await new Promise((r) => setTimeout(r, 9000));

let failed = 0;
try {
  for (const locale of [`${BASE}/`, `${BASE}/fr/`]) {
    for (const [w, h] of [[1440, 900], [1440, 700], [390, 780]]) {
      const dom = execSync(
        `${CH} ${FLAGS} --window-size=1700,1100 --dump-dom "http://localhost:${PORT}${BASE}/.wf/measure.html?u=${locale}&w=${w}&h=${h}" 2>/dev/null`,
        { encoding: 'utf8', maxBuffer: 64e6 },
      );
      const m = JSON.parse(dom.match(/<title>([^<]*)/)[1]);
      const ok = m.hero === m.viewport;
      // The bar's rendered height includes its 1px bottom border, so the
      // sentinel sitting at --bar-height is one short of the border box.
      const sentinelOk = Math.abs(m.sentinel - m.bar) <= 1;
      console.log(
        `  ${locale.padEnd(5)} ${w}x${h}  hero ${m.hero} / viewport ${m.viewport}  ${ok ? 'ok' : 'FAIL'}` +
        `   sentinel ${m.sentinel} / bar ${m.bar}  ${sentinelOk ? 'ok' : 'FAIL'}`,
      );
      if (!ok || !sentinelOk) failed++;
    }
  }
} finally {
  try { process.kill(-server.pid); } catch {}
}
if (failed) { console.log(`\n  ${failed} viewport(s) failed`); process.exit(1); }
console.log('\n  hero fills exactly one viewport everywhere; sentinel sits on the bar edge');
