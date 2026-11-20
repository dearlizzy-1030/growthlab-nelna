// 사용법: node ad-creatives/build.mjs [제품id 일부, 예: 03-pencil]
// 결과물: ad-creatives/out/*.png, ad-creatives/AD-BRIEF.md, ad-creatives/contact-sheet.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { products } from './creatives.mjs';
import { photoSets } from './photo-creatives.mjs';
import { brandSets } from './brand-creatives.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'out');
const TMP = path.join(ROOT, '.render');
const FONT_URL = pathToFileURL(path.join(ROOT, 'fonts')).href;
const only = process.argv[2];

const FEED = { key: 'feed', w: 1080, h: 1350, label: '피드 4:5 (1080×1350)' };
const STORY = { key: 'story', w: 1080, h: 1920, label: '스토리·릴스 9:16 (1080×1920)' };

// ---------- helpers ----------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rich = (s = '') => esc(s).replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>').replace(/\n/g, '<br>');
const plain = (s = '') => s.replace(/\*/g, '');

function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const onColor = (bg) => (contrast(bg, '#FFFFFF') >= contrast(bg, '#14110F') ? '#FFFFFF' : '#14110F');

function theme(p, layout) {
  const { pal, dark } = p;
  const onAccent = onColor(pal.accent);
  if (layout === 'chat') {
    return { bg: pal.accent, fg: onAccent, hl: onAccent, pillBg: onAccent, pillFg: pal.accent, soft: pal.soft, card: pal.card, cardFg: pal.ink, b2bg: pal.ink, b2fg: pal.bg };
  }
  if (layout === 'stat') {
    const bg = dark ? pal.bg : pal.ink;
    const fg = dark ? pal.ink : pal.bg;
    return { bg, fg, hl: pal.accent, num: pal.accent, pillBg: pal.accent, pillFg: onAccent, soft: pal.soft, card: pal.card, cardFg: pal.ink };
  }
  return { bg: pal.bg, fg: pal.ink, hl: pal.accent, pillBg: pal.accent, pillFg: onAccent, soft: pal.soft, card: pal.card, cardFg: pal.ink };
}


// 가격 앵커 + 구매 버튼 푸터 (p.priceOrg 가 있는 제품만)
const offerHtml = (p) => `<div class="pr"><s>${esc(p.priceOrg)}</s><b>${esc(p.price)}</b></div><div class="cta">${esc(p.ctaBtn || '지금 구매하기 →')}</div>`;
const offerCss = (bg, fg) => `.pr s{display:block;font-size:30px;font-weight:600;opacity:.78;text-decoration:line-through}.pr b{display:block;font-size:52px;font-weight:800;letter-spacing:-0.03em;line-height:1.05}.cta{font-weight:800;font-size:33px;padding:21px 36px;border-radius:999px;background:${bg};color:${fg};white-space:nowrap}`;
// ---------- layouts ----------
function body(c, t, fmt) {
  const story = fmt.key === 'story';
  const sz = (d) => c.size || d;
  const sub = (txt, extra = '') => (txt ? `<p class="sub ${extra}">${rich(txt)}</p>` : '');
  switch (c.layout) {
    case 'statement':
      return `
      <div class="deco c1"></div>
      <section class="main center">
        <h1 class="fit" data-size="${sz(story ? 150 : 134)}">${rich(c.headline)}</h1>
        ${sub(c.sub)}
        ${c.chips ? `<div class="chips">${c.chips.map((x) => `<span>${esc(x)}</span>`).join('')}</div>` : ''}
      </section>`;
    case 'chat':
      return `
      <section class="main center chat">
        <div class="bubble b1"><div class="fit" data-limit="836" data-size="${sz(story ? 84 : 76)}">${rich(c.headline)}</div></div>
        <div class="bubble b2"><div class="fit" data-limit="836" data-size="${story ? 84 : 76}">${rich(c.reveal || '')}</div></div>
        ${sub(c.sub, 'onbg')}
      </section>`;
    case 'stat':
      return `
      <section class="main stat">
        <h1 class="fit top" data-size="${sz(story ? 84 : 74)}">${rich(c.headline)}</h1>
        <div class="num fit" data-size="${story ? 440 : 380}"><b>${esc(c.bignum)}</b><i>${esc(c.bigunit || '')}</i></div>
        <p class="cap">${rich(c.caption || '')}</p>
      </section>`;
    case 'list':
      return `
      <section class="main list">
        <h1 class="fit" data-size="${sz(story ? 88 : 80)}">${rich(c.headline)}</h1>
        <div class="rows">${c.rows
          .map(([k, v], i) => `<div class="row"><span class="badge">${i + 1}</span><div><em>${esc(k)}</em><strong>${esc(v)}</strong></div></div>`)
          .join('')}</div>
        <p class="cap">${rich(c.caption || '')}</p>
      </section>`;
    default:
      throw new Error('unknown layout ' + c.layout);
  }
}

function render(p, c, fmt) {
  const t = theme(p, c.layout);
  const story = fmt.key === 'story';
  const padT = story ? 210 : 70;
  const padB = story ? 280 : 70;
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
${['Regular:400', 'Medium:500', 'SemiBold:600', 'Bold:700', 'ExtraBold:800']
  .map((x) => {
    const [n, w] = x.split(':');
    return `@font-face{font-family:'PT';font-weight:${w};src:url('${FONT_URL}/Pretendard-${n}.woff2') format('woff2');}`;
  })
  .join('\n')}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${fmt.w}px;height:${fmt.h}px;overflow:hidden;font-family:'PT',sans-serif;word-break:keep-all;-webkit-font-smoothing:antialiased}
.ad{position:relative;width:${fmt.w}px;height:${fmt.h}px;background:${t.bg};color:${t.fg};padding:${padT}px 72px ${padB}px;display:flex;flex-direction:column;overflow:hidden}
.hl{color:${t.hl}}
header{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:3}
.brand{font-weight:800;font-size:46px;letter-spacing:-1px}
.brand small{font-weight:600;font-size:22px;letter-spacing:0;opacity:.65;margin-left:10px}
.kicker{font-weight:700;font-size:28px;padding:10px 22px;border:2.5px solid currentColor;border-radius:999px;white-space:nowrap}
.main{flex:1;display:flex;flex-direction:column;position:relative;z-index:2;min-height:0}
.main.center{justify-content:center}
h1{font-weight:800;letter-spacing:-0.04em;line-height:1.12;white-space:nowrap}
.fit{white-space:nowrap;display:block;width:100%}
.fit[data-limit]{display:inline-block;width:auto}
.sub{margin-top:36px;font-size:${story ? 44 : 40}px;font-weight:500;line-height:1.5;opacity:.82;white-space:pre-line}
.sub .hl{font-weight:800;opacity:1}
.sub.onbg{opacity:.95;font-weight:600}
.chips{display:flex;flex-wrap:wrap;gap:14px;margin-top:40px}
.chips span{font-weight:700;font-size:32px;padding:14px 26px;border-radius:999px;background:${t.soft};color:${p.dark ? '#fff' : p.pal.ink}}
.deco{position:absolute;border-radius:50%;background:${t.soft};z-index:1;opacity:.75}
.deco.c1{width:760px;height:760px;right:-260px;bottom:${story ? 170 : 40}px}
.deco.c2{width:220px;height:220px;left:-90px;top:${story ? 430 : 300}px;background:${t.pillBg};opacity:.9}
/* chat */
.chat{gap:34px}
.bubble{position:relative;width:fit-content;max-width:100%;border-radius:44px;padding:44px 50px;font-weight:800;letter-spacing:-0.03em;line-height:1.28}
.b1{background:${t.card};color:${t.cardFg};align-self:flex-start;max-width:100%;border-bottom-left-radius:8px;box-shadow:0 10px 0 rgba(0,0,0,.14)}
.b2{background:${t.b2bg};color:${t.b2fg};align-self:flex-end;border-bottom-right-radius:8px;transform:rotate(-1.5deg);margin-top:6px;box-shadow:0 10px 0 rgba(0,0,0,.18)}
.b1 .hl{color:${p.pal.accent === t.card ? p.pal.ink : p.pal.accent}}
.b2 .hl{color:${t.b2fg}}
/* stat */
.stat{justify-content:space-between;padding-top:46px}
.stat .top{line-height:1.15}
.num{display:flex;align-items:baseline;gap:10px;color:${t.num || t.fg};line-height:.95;letter-spacing:-0.05em;font-weight:800;margin:10px 0}
.num b{font-weight:800}
.num i{font-style:normal;font-size:.34em;letter-spacing:-0.02em;font-weight:800;color:${t.fg}}
.cap{font-size:${story ? 46 : 42}px;font-weight:600;line-height:1.4;opacity:.92;white-space:pre-line}
/* list */
.list{justify-content:space-between;padding-top:46px}
.rows{display:flex;flex-direction:column;gap:22px;margin:30px 0}
.row{display:flex;align-items:center;gap:30px;background:${t.card};color:${t.cardFg};border-radius:34px;padding:${story ? 40 : 30}px 38px}
.badge{flex:none;width:76px;height:76px;border-radius:50%;background:${t.pillBg};color:${t.pillFg};font-weight:800;font-size:40px;display:flex;align-items:center;justify-content:center}
.row em{display:block;font-style:normal;font-weight:700;font-size:28px;color:${p.pal.accent === t.card ? p.pal.ink : (p.dark ? p.pal.accent : p.pal.accent)};margin-bottom:4px}
.row strong{font-weight:700;font-size:${story ? 46 : 42}px;letter-spacing:-0.03em;line-height:1.25}
.list .cap{font-weight:800;font-size:${story ? 46 : 42}px}
/* footer */
.foot{position:relative;z-index:3;font-size:25px;font-weight:500;opacity:.75;margin-bottom:22px;white-space:pre-line}
footer{display:flex;justify-content:space-between;align-items:center;gap:24px;position:relative;z-index:3}
.pname{font-weight:700;font-size:30px;letter-spacing:-0.02em}
.price{font-weight:800;font-size:32px;padding:14px 28px;border-radius:999px;background:${t.pillBg};color:${t.pillFg};white-space:nowrap}
${offerCss(t.pillBg, t.pillFg)}
</style></head><body>
<div class="ad">
  <header><div class="brand">낼나<small>nelna.shop</small></div><div class="kicker">${esc(plain(c.kicker))}</div></header>
  ${body(c, t, fmt)}
  ${c.foot ? `<div class="foot">${esc(c.foot)}</div>` : ''}
  <footer>${p.priceOrg ? offerHtml(p) : `<div class="pname">${esc(p.name)}</div><div class="price">${esc(p.price)}</div>`}</footer>
</div>
<script>
document.fonts.ready.then(()=>{
  document.querySelectorAll('.fit').forEach(el=>{
    let s=parseFloat(el.dataset.size);el.style.fontSize=s+'px';
    const lim=el.dataset.limit?parseFloat(el.dataset.limit):el.clientWidth;
    while(el.scrollWidth>lim+1&&s>26){s-=2;el.style.fontSize=s+'px';}
  });
  document.body.dataset.ready='1';
});
</script></body></html>`;
}


// ---------- photo layouts ----------
const PHOTO_URL = pathToFileURL(path.join(ROOT, 'photos')).href;
function renderPhoto(p, it, fmt) {
  const story = fmt.key === 'story';
  const pal = p.pal;
  const onAccent = onColor(pal.accent);
  const bg = it.bg || pal.bg;
  const fg = onColor(bg) === '#FFFFFF' ? '#FFFFFF' : pal.ink;
  const padB = story ? 280 : 56;
  const photoH = it.layout === 'photoTop' ? Math.round((it.h || 700) * (story ? 1.45 : 1)) : fmt.h;
  const hl = it.hl || (it.layout === 'photoFull' ? '#FFFFFF' : pal.accent);
  const chipCol = it.layout === 'photoFull' ? '#FFFFFF' : fg;
  const priceBg = it.layout === 'photoFull' ? '#FFFFFF' : pal.accent;
  const priceFg = it.layout === 'photoFull' ? '#14110F' : onAccent;
  const hSize = it.headline.split('\n').length >= 3 ? (story ? 84 : 72) : (story ? 100 : 86);
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
${['Regular:400', 'Medium:500', 'SemiBold:600', 'Bold:700', 'ExtraBold:800']
  .map((x) => { const [n, w] = x.split(':'); return `@font-face{font-family:'PT';font-weight:${w};src:url('${FONT_URL}/Pretendard-${n}.woff2') format('woff2');}`; })
  .join('\n')}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${fmt.w}px;height:${fmt.h}px;overflow:hidden;font-family:'PT',sans-serif;word-break:keep-all;-webkit-font-smoothing:antialiased}
.ad{position:relative;width:${fmt.w}px;height:${fmt.h}px;background:${bg};color:${fg};overflow:hidden}
.photo{position:absolute;left:0;top:0;width:${fmt.w}px;height:${photoH}px;object-fit:cover;object-position:${it.pos || '50% 50%'}}
.shade{position:absolute;left:0;right:0;bottom:0;height:${Math.round(fmt.h * 0.62)}px;background:linear-gradient(to bottom,rgba(10,8,6,0) 0%,rgba(10,8,6,.55) 38%,rgba(10,8,6,.86) 100%)}
.shade.top{top:0;bottom:auto;height:${Math.round(fmt.h * 0.2)}px;background:linear-gradient(to bottom,rgba(10,8,6,.35),rgba(10,8,6,0))}
.brand{position:absolute;left:56px;top:${story ? 190 : 46}px;font-weight:800;font-size:44px;color:#fff;letter-spacing:-1px;z-index:3;text-shadow:0 1px 10px rgba(0,0,0,.25)}
.copy{position:absolute;left:0;right:0;bottom:0;padding:${it.layout === 'photoTop' ? 40 : 0}px 72px ${padB}px;${it.layout === 'photoTop' ? `top:${photoH}px;` : ''}display:flex;flex-direction:column;justify-content:${it.layout === 'photoTop' ? 'space-between' : 'flex-end'};z-index:3;${it.layout === 'photoFull' ? 'color:#fff;' : ''}}
.kicker{display:table;font-weight:700;font-size:27px;padding:9px 22px;border:2.5px solid ${chipCol};color:${chipCol};border-radius:999px;margin-bottom:26px}
h1{font-weight:800;letter-spacing:-0.04em;line-height:1.14;white-space:nowrap}
.fit{white-space:nowrap;display:block;width:100%}
.hl{color:${hl}}
.sub{margin-top:24px;font-size:${story ? 42 : 36}px;font-weight:500;line-height:1.45;opacity:.9;white-space:pre-line}
.sub .hl{font-weight:800}
.foot{font-size:24px;opacity:.8;margin-top:16px}
.bottom{display:flex;justify-content:space-between;align-items:center;gap:24px;margin-top:${it.layout === 'photoTop' ? 0 : 38}px}
.pname{font-weight:700;font-size:29px;letter-spacing:-0.02em}
.price{font-weight:800;font-size:31px;padding:13px 27px;border-radius:999px;background:${priceBg};color:${priceFg};white-space:nowrap}
${offerCss(priceBg, priceFg)}
</style></head><body><div class="ad">
<img class="photo" src="${PHOTO_URL}/${it.photo}">
${it.layout === 'photoFull' ? '<div class="shade top"></div><div class="shade"></div>' : ''}
${it.layout === 'photoFull' ? '<div class="brand">낼나</div>' : ''}
<div class="copy"><div>
  <div class="kicker">${esc(plain(it.kicker))}</div>
  <h1 class="fit" data-size="${hSize}">${rich(it.headline)}</h1>
  ${it.sub ? `<p class="sub">${rich(it.sub)}</p>` : ''}
  ${it.foot ? `<div class="foot">${esc(it.foot)}</div>` : ''}
</div>
<div class="bottom">${p.priceOrg ? offerHtml(p) : `<div class="pname">${esc(p.name)}</div><div class="price">${esc(p.price)}</div>`}</div></div>
</div>
<script>
const img=document.querySelector('.photo');
Promise.all([document.fonts.ready,img.decode().catch(()=>{})]).then(()=>{
  document.querySelectorAll('.fit').forEach(el=>{
    let s=parseFloat(el.dataset.size);el.style.fontSize=s+'px';
    while(el.scrollWidth>el.clientWidth+1&&s>26){s-=2;el.style.fontSize=s+'px';}
  });
  document.body.dataset.ready='1';
});
</script></body></html>`;
}


// ---------- 낼나 스타일 (2번 구도: 사진 + 상단 헤드라인 + 딥그린 바 · 가격/CTA 없음) ----------
const B_GREEN = '#0B5439', B_RED = '#E5322B';
function renderBrand(p, it, fmt) {
  const ext = it.layout === 'extend';
  const hl = it.hl || B_RED;
  const fonts = ['Regular:400', 'Medium:500', 'SemiBold:600', 'Bold:700', 'ExtraBold:800']
    .map((x) => { const [n, w] = x.split(':'); return `@font-face{font-family:'PT';font-weight:${w};src:url('${FONT_URL}/Pretendard-${n}.woff2') format('woff2');}`; }).join('\n');
  const top = it.htop || 128;
  const pos = it.pos || '50% 50%';
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
${fonts}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${fmt.w}px;height:${fmt.h}px;overflow:hidden;font-family:'PT',sans-serif;word-break:keep-all;-webkit-font-smoothing:antialiased}
.ad{position:relative;width:${fmt.w}px;height:${fmt.h}px;overflow:hidden;background:${ext ? (it.bgc2 ? `linear-gradient(90deg,${it.bgc},${it.bgc2})` : it.bgc) : '#222'}}
.logo{position:absolute;left:56px;top:48px;height:40px;z-index:5}
h1{position:absolute;left:56px;top:${top}px;width:968px;font-weight:800;letter-spacing:-0.045em;line-height:1.17;color:${ext ? '#1A1A1A' : '#fff'};white-space:nowrap;z-index:5;text-shadow:${it.shadow || 'none'}}
.hl{color:${ext ? hl : '#FFE066'}}
.sub{position:absolute;left:56px;top:${top + (it.subgap || 190)}px;width:968px;font-size:31px;font-weight:500;color:${ext ? '#555' : 'rgba(255,255,255,.92)'};z-index:5;line-height:1.4;text-shadow:${it.shadow || 'none'}}
${ext
  ? `.pimg{position:absolute;left:0;top:${it.ptop || 580}px;width:1080px;height:${it.ph || 770}px;object-fit:cover;object-position:${pos};-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 ${it.fade ?? 110}px);mask-image:linear-gradient(to bottom,transparent 0,#000 ${it.fade ?? 110}px)}`
  : `.pimg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos};transform:scale(${it.zoom || 1});transform-origin:${it.origin || pos}}
.shadeT{position:absolute;left:0;right:0;top:0;height:600px;background:linear-gradient(to bottom,rgba(0,0,0,.62),rgba(0,0,0,0));z-index:3}
.shadeB{position:absolute;left:0;right:0;bottom:0;height:520px;background:linear-gradient(to top,rgba(0,0,0,.62),rgba(0,0,0,0));z-index:3}`}
</style></head><body><div class="ad">
<img class="pimg" src="${PHOTO_URL}/${it.photo}">
${ext || it.noshade ? '' : it.shade === 'bottom' ? '<div class="shadeB"></div>' : '<div class="shadeT"></div>'}
${it.logo === 'none' ? '' : `<img class="logo" src="${PHOTO_URL}/${ext || it.logo === 'green' ? 'logo_green.png' : 'logo_cream.png'}">`}
<h1 class="fit" data-size="${it.size || 80}">${rich(it.headline)}</h1>
<p class="sub">${rich(it.sub)}</p>
</div>
<script>
const imgs=[...document.images];
Promise.all([document.fonts.ready,...imgs.map(i=>i.decode().catch(()=>{}))]).then(()=>{
  document.querySelectorAll('.fit').forEach(el=>{
    let s=parseFloat(el.dataset.size);el.style.fontSize=s+'px';
    while(el.scrollWidth>968+1&&s>26){s-=2;el.style.fontSize=s+'px';}
  });
  document.body.dataset.ready='1';
});
</script></body></html>`;
}

// ---------- brief & contact sheet ----------
function brief() {
  const L = [];
  L.push('# 낼나 광고 소재 패키지 (2026-11)\n');
  L.push(`8개 제품 · 글자 중심 소재 25종 + 제품 사진 합성 소재 ${Object.values(photoSets).flat().length}종(피드 4:5) + 스토리/릴스 커버(9:16) + 15~20초 영상 스크립트 8개.\n`);
  L.push('글자 중심 소재(`*_c*`)는 제품 사진 없이 쓰는 버전이고, 사진 합성 소재(`*_p*`)는 Google Drive의 제품 사진(셀렉 보정본 · 상세페이지 썸네일)을 넣은 버전입니다. **2027 낼나다이어리는 쓸 수 있는 제품 이미지를 찾지 못해** 글자 중심 소재만 있습니다. 로고는 텍스트(“낼나”)로 대체했으니 필요하면 교체하세요.\n');
  L.push('## 먼저 테스트할 소재\n');
  L.push('| 순서 | 소재 | 이유 |\n|---|---|---|');
  L.push('| 1 | 플레이온 c1 “귀여운 MP3 플레이어인 줄 알았죠?” | 반전 훅. 소재 임팩트가 가장 강함 |');
  L.push('| 2 | 다이어리 c1 “계획은 늘 바뀌어요. 그래도 괜찮아요” | 수정 스트레스 공감, 연말 시즌 수요 |');
  L.push('| 3 | 그랩&스크랩 c2 “다짐은 봉인하고, 1년 뒤에 열어보세요” | 연말 선물/경험 소구, 지금이 시즌 |');
  L.push('| 4 | 스크런치 c1 “또 떨어뜨렸어요. 또 충전선 놓고 나왔어요” | 일상 문제 공감 + 1개로 해결 |');
  L.push('| 5 | 연력 c3 “12월 말, 한 발짝 떨어져서 보면…” | 연말 회고 타이밍 |\n');
  L.push('## 집행 전 공통 체크\n');
  L.push('- 숫자 · 비교 · 인증 문구는 근거 자료를 보관하세요(표시광고법). 제품별 체크 항목은 아래에 정리했습니다.');
  L.push('- 각주가 있는 소재(`foot`)는 각주를 지우지 마세요. 메타 광고는 이미지 안 작은 글자도 심사 대상입니다.');
  L.push('- 본문(primary)은 앞 125자 안에 훅이 들어가도록 썼습니다. 헤드라인은 27자 이내입니다.');
  L.push('- 가격은 2026-11-20 기준입니다. 행사 · 쿠폰 문구는 기획전에 맞춰 바꾸세요.\n');
  for (const p of products) {
    L.push(`---\n\n## ${p.name} (${p.price})\n`);
    L.push('### 집행 전 확인\n');
    p.caveats.forEach((x) => L.push(`- ${x}`));
    L.push('\n### 소재\n');
    for (const c of p.creatives) {
      L.push(`#### ${p.id}_${c.id} · ${c.layout} · ${c.angle}\n`);
      L.push(`![${p.id}_${c.id}](out/${p.id}_${c.id}_feed.png)\n`);
      L.push(`- **이미지 문구**: ${plain(c.headline).replace(/\n/g, ' ')}${c.reveal ? ' / ' + c.reveal : ''}`);
      L.push(`- **메타 헤드라인**: ${c.mhead}`);
      L.push(`- **메타 설명**: ${c.desc}`);
      L.push(`- **CTA 버튼**: ${c.cta}`);
      L.push(`- **본문**:\n\n  > ${c.primary.replace(/\n/g, '\n  > ')}\n`);
    }
    if (photoSets[p.id]) {
      L.push('### 제품 사진 합성 시안\n');
      for (const it of photoSets[p.id]) {
        L.push(`![${p.id}_${it.id}](out/${p.id}_${it.id}_feed.png)\n`);
        L.push(`- ${p.id}_${it.id} · 본문·헤드라인·CTA는 **${it.copy}** 와 동일${it.story ? ' · 스토리/릴스 커버 있음' : ''}\n`);
      }
    }
    if (brandSets[p.id]) {
      L.push('### 낼나 기존 광고 스타일 시안 (사진 풀블리드 · nelna. 로고 · 딥그린 바 / 가격·구매 버튼 없음)\n');
      for (const it of brandSets[p.id]) {
        const src = it.primary ? { primary: it.primary, mhead: it.mhead } : p.creatives.find((c) => c.id === it.copy);
        const body = src.primary.split('\n').filter((l) => !/정가|32,900원/.test(l)).join('\n').replace('👉 지금 바로 확인하기', '👉 자세히 보기').replace('👉 색상 고르러 가기', '👉 자세히 보기').replace('👉 집중력 찾으러 가기', '👉 자세히 보기').replace(/\n{3,}/g, '\n\n');
        L.push(`#### ${p.id}_${it.id}\n`);
        L.push(`![${p.id}_${it.id}](out/${p.id}_${it.id}_feed.png)\n`);
        L.push(`- **메타 헤드라인**: ${src.mhead}`);
        L.push(`- **메타 설명**: ${it.desc}`);
        L.push(`- **CTA 버튼**: ${it.cta}`);
        L.push(`- **본문**:\n\n  > ${body.replace(/\n/g, '\n  > ')}\n`);
      }
    }
    L.push(`### 영상 스크립트 (${p.video.length})\n`);
    L.push('| 구간 | 내용 |\n|---|---|');
    p.video.beats.forEach(([t, d]) => L.push(`| ${t} | ${d} |`));
    L.push('');
  }
  return L.join('\n');
}

function contactSheet() {
  const cards = products
    .map(
      (p) => `<section><h2>${esc(p.name)} <small>${esc(p.price)}</small></h2><div class="g">${p.creatives
        .map(
          (c) => `<figure><img loading="lazy" src="out/${p.id}_${c.id}_feed.png"><figcaption><b>${esc(c.mhead)}</b><br>${esc(c.angle)}</figcaption></figure>`,
        )
        .join('')}${(photoSets[p.id] || []).map((it) => `<figure><img loading="lazy" src="out/${p.id}_${it.id}_feed.png"><figcaption><b>사진 합성 ${it.id}</b><br>${esc(plain(it.headline).replace(/\n/g, ' '))}</figcaption></figure>`).join('')}${(brandSets[p.id] || []).map((it) => `<figure><img loading="lazy" src="out/${p.id}_${it.id}_feed.png"><figcaption><b>낼나 스타일 ${it.id}</b><br>${esc(plain(it.headline).replace(/\n/g, ' '))}</figcaption></figure>`).join('')}<figure class="s"><img loading="lazy" src="out/${p.id}_c1_story.png"><figcaption>스토리/릴스 커버 (c1)</figcaption></figure></div></section>`,
    )
    .join('');
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>낼나 광고 소재 컨택트시트</title><style>
body{margin:0;padding:32px 16px;background:#f3f1ec;font-family:-apple-system,'Pretendard','Noto Sans KR',sans-serif;color:#222}
h1{font-size:26px;margin:0 0 6px}p{margin:0 0 28px;color:#666}
section{margin-bottom:44px}h2{font-size:20px;margin:0 0 14px}h2 small{color:#888;font-weight:500;font-size:14px;margin-left:8px}
.g{display:flex;gap:16px;overflow-x:auto;padding-bottom:10px;align-items:flex-start}
figure{margin:0;flex:none;width:300px}figure.s{width:190px}
img{width:100%;border-radius:10px;display:block;box-shadow:0 2px 10px rgba(0,0,0,.12)}
figcaption{font-size:12.5px;color:#555;margin-top:8px;line-height:1.45}
</style></head><body><h1>낼나 광고 소재 컨택트시트</h1><p>피드 4:5 · 스토리 9:16 · 문구 상세는 AD-BRIEF.md</p>${cards}</body></html>`;
}

// ---------- main ----------
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
const page = await ctx.newPage();
let n = 0;
for (const p of products) {
  if (only && !p.id.includes(only)) continue;
  for (const c of p.creatives) {
    for (const fmt of c.id === 'c1' ? [FEED, STORY] : [FEED]) {
      const file = path.join(TMP, `${p.id}_${c.id}_${fmt.key}.html`);
      fs.writeFileSync(file, render(p, c, fmt));
      await page.setViewportSize({ width: fmt.w, height: fmt.h });
      await page.goto(pathToFileURL(file).href);
      await page.waitForSelector('body[data-ready="1"]');
      // 세로로 넘치는지 점검
      const over = await page.evaluate(() => {
        const m = document.querySelector('.main');
        return m.scrollHeight - m.clientHeight;
      });
      if (over > 2) console.warn(`⚠ ${p.id}_${c.id}_${fmt.key}: 본문이 ${over}px 넘침`);
      await page.screenshot({ path: path.join(OUT, `${p.id}_${c.id}_${fmt.key}.png`) });
      n++;
    }
  }
}
for (const p of products) {
  if (only && !p.id.includes(only)) continue;
  for (const it of photoSets[p.id] || []) {
    for (const fmt of it.story ? [FEED, STORY] : [FEED]) {
      const file = path.join(TMP, `${p.id}_${it.id}_${fmt.key}.html`);
      fs.writeFileSync(file, renderPhoto(p, it, fmt));
      await page.setViewportSize({ width: fmt.w, height: fmt.h });
      await page.goto(pathToFileURL(file).href);
      await page.waitForSelector('body[data-ready="1"]');
      await page.screenshot({ path: path.join(OUT, `${p.id}_${it.id}_${fmt.key}.png`) });
      n++;
    }
  }
}
for (const p of products) {
  if (only && !p.id.includes(only)) continue;
  for (const it of brandSets[p.id] || []) {
    const fmt = FEED;
    const file = path.join(TMP, `${p.id}_${it.id}_${fmt.key}.html`);
    fs.writeFileSync(file, renderBrand(p, it, fmt));
    await page.setViewportSize({ width: fmt.w, height: fmt.h });
    await page.goto(pathToFileURL(file).href);
    await page.waitForSelector('body[data-ready="1"]');
    await page.screenshot({ path: path.join(OUT, `${p.id}_${it.id}_${fmt.key}.png`) });
    n++;
  }
}
await browser.close();
fs.rmSync(TMP, { recursive: true, force: true });
if (!only) {
  fs.writeFileSync(path.join(ROOT, 'AD-BRIEF.md'), brief());
  fs.writeFileSync(path.join(ROOT, 'contact-sheet.html'), contactSheet());
}
console.log(`rendered ${n} images`);
