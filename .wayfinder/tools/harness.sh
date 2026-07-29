#!/usr/bin/env bash
# Recreates the measurement harnesses inside dist/, which `astro build` wipes.
# Run after every build. Served under the deploy base, e.g. /lambdasoft/.wf/
set -e
D="$(dirname "$0")/../../dist/.wf"
mkdir -p "$D"

common='d.documentElement.removeAttribute("data-intro");const i=d.getElementById("intro");if(i)i.remove();
 [...d.images].forEach(x=>{x.loading="eager";x.decoding="sync";x.src=x.src;});'

cat > "$D/resp.html" <<HTML
<!doctype html><meta charset=utf-8><title>r</title>
<style>html,body{margin:0;background:#111}iframe{border:0;display:block}</style><iframe id=f></iframe>
<script>
const q=new URLSearchParams(location.search),f=document.getElementById('f');
f.style.width=q.get('w')+'px';f.style.height=(q.get('h')||800)+'px';f.src=q.get('u')||'/lambdasoft/';
f.onload=()=>{const d=f.contentDocument,w=f.contentWindow;
 $common
 setTimeout(()=>{const de=d.documentElement;
  const clipped=(el)=>{let p=el.parentElement;while(p){const o=getComputedStyle(p).overflow;if(o==='hidden'||o==='clip')return true;p=p.parentElement;}return false;};
  const off=[];
  d.querySelectorAll('*').forEach(el=>{const r=el.getBoundingClientRect();
   if(r.width===0&&r.height===0)return;
   if((r.right>de.clientWidth+1||r.left<-1)&&!clipped(el))
    off.push(el.tagName.toLowerCase()+(typeof el.className==='string'&&el.className?'.'+el.className.trim().split(/\s+/)[0]:''));});
  const rows=[...d.querySelectorAll('.grid__row')].map(row=>{
   const t=[...row.children].filter(x=>getComputedStyle(x).display!=='none');
   const L={};t.forEach(x=>{const y=Math.round(x.getBoundingClientRect().top);L[y]=(L[y]||0)+1;});
   return Object.values(L);});
  const tile=d.querySelector('.tile:not(.tile--gap)');
  document.title=JSON.stringify({vw:de.clientWidth,overflow:de.scrollWidth-de.clientWidth,
   offenders:[...new Set(off)].slice(0,5),gridRows:rows,
   tilePx:tile?Math.round(tile.getBoundingClientRect().width):null});},2400);};
</script>
HTML

cat > "$D/hero.html" <<HTML
<!doctype html><meta charset=utf-8><title>h</title>
<style>html,body{margin:0}iframe{border:0;display:block}</style><iframe id=f></iframe>
<script>
const q=new URLSearchParams(location.search),f=document.getElementById('f');
f.style.width=q.get('w')+'px';f.style.height=q.get('h')+'px';f.src=q.get('u')||'/lambdasoft/';
f.onload=()=>{const d=f.contentDocument,w=f.contentWindow;
 $common
 setTimeout(()=>{const h=d.querySelector('.hero').getBoundingClientRect().height;
  const g=d.querySelector('.stack');
  document.title=JSON.stringify({vw:d.documentElement.clientWidth,vh:w.innerHeight,
   hero:Math.round(h),over:Math.round(h-w.innerHeight),
   gridH:g?Math.round(g.getBoundingClientRect().height):0});},2400);};
</script>
HTML

cat > "$D/shot.html" <<HTML
<!doctype html><meta charset=utf-8><title>s</title>
<style>html,body{margin:0;background:#02081c}iframe{border:0;display:block}</style><iframe id=f></iframe>
<script>
const q=new URLSearchParams(location.search),f=document.getElementById('f');
f.style.width=q.get('w')+'px';f.style.height=q.get('h')+'px';f.src=q.get('u')||'/lambdasoft/';
f.onload=()=>{const d=f.contentDocument,w=f.contentWindow;
 $common
 let n=0;const t=()=>{w.scrollTo(0,+(q.get('y')||0));if(++n<40)setTimeout(t,40)};t();
 setTimeout(()=>{document.title='ok'},2600);};
</script>
HTML
echo "  harnesses regenerated in dist/.wf/"
