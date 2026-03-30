
// ══════════════════════════════
// 실적 데이터 (3월 확정치)
// ══════════════════════════════
const ACTUAL_3 = {
  revenue: 178996062,          // 아임웹 자사몰 공식 매출
  roas_meta: 1.88,             // 메타 픽셀 ROAS
  roas_meta_order: 2.62,       // 메타 실주문 ROAS
  roas_ss_cpa: 5228,           // 스마트스토어 CPA
  roas_ss_best: 140,           // 최고효율 소재 CPA
  content_total: 0,            // 콘텐츠 발행 — 직접 입력
  content_by_ch: {insta:0, blog:0, youtube:0, etc:0},
};

// ══════════════════════════════
// 기본 목표값
// ══════════════════════════════
const DEFAULT_TARGETS = {
  'revenue':       200000000,
  'roas_meta':     2.5,
  'roas_ss':       3000,    // CPA 목표 (낮을수록 좋음)
  'content_total': 12,
  'content_insta': 4,
  'content_blog':  4,
  'content_yt':    2,
  'content_etc':   2,
};

// ══════════════════════════════
// STATE
// ══════════════════════════════
let curMonth = '2026-03';
let S = {};  // {month: {targets:{}, content_actual:{ch:n}, content_total:n, note:''}}

function save_s(){try{localStorage.setItem('gl_kpi2',JSON.stringify(S));}catch(e){}}
function load_s(){try{const d=localStorage.getItem('gl_kpi2');if(d)S=JSON.parse(d);}catch(e){}}

function mdata(){
  if(!S[curMonth]) S[curMonth]={targets:{},content_actual:{insta:0,blog:0,youtube:0,etc:0},content_total_actual:0,note:''};
  return S[curMonth];
}
function tgt(key){ const v=mdata().targets[key]; return v!==undefined?v:DEFAULT_TARGETS[key]||0; }
function setTgt(key,val){ mdata().targets[key]=val; }

// ══════════════════════════════
// FORMAT
// ══════════════════════════════
const fmtW = n=>{
  if(n>=100000000)return(n/100000000).toFixed(2)+'억';
  if(n>=10000000)return(n/10000000).toFixed(1)+'천만';
  if(n>=1000000)return(n/1000000).toFixed(0)+'백만';
  if(n>=10000)return Math.round(n/10000)+'만';
  return n.toLocaleString();
};

function pct(actual, target, lowerBetter=false){
  if(!target) return 0;
  return lowerBetter ? Math.min(target/actual*100, 200) : Math.min(actual/target*100, 200);
}

function statusInfo(p){
  if(p>=100) return {cls:'pill-great', label:'달성 ✓', cardCls:'achieved', barColor:'var(--teal)'};
  if(p>=80)  return {cls:'pill-good',  label:'근접 중', cardCls:'',        barColor:'var(--grn)'};
  if(p>=50)  return {cls:'pill-warn',  label:'주의',   cardCls:'warn',     barColor:'var(--amb)'};
  return      {cls:'pill-danger', label:'미달', cardCls:'danger', barColor:'var(--cor)'};
}

// ══════════════════════════════
// OVERALL SCORE
// ══════════════════════════════
function renderScore(){
  const revPct  = pct(ACTUAL_3.revenue,       tgt('revenue'));
  const roasPct = pct(ACTUAL_3.roas_meta,      tgt('roas_meta'));
  const ssPct   = pct(ACTUAL_3.roas_ss_cpa,    tgt('roas_ss'), true);
  const ctPct   = pct(mdata().content_total_actual||0, tgt('content_total'));
  const scores  = [revPct, roasPct, ssPct, ctPct];
  const avg     = Math.round(scores.reduce((s,v)=>s+Math.min(v,100),0)/scores.length);
  const achieved= scores.filter(v=>v>=100).length;

  const r=36, circ=2*Math.PI*r;
  const dash=(Math.min(avg,100)/100*circ).toFixed(1);
  const col = avg>=100?'var(--teal)':avg>=80?'var(--grn)':avg>=60?'var(--amb)':'var(--cor)';
  const stat = statusInfo(avg);

  const badges = [
    {label:`매출 ${Math.round(revPct)}%`, cls:statusInfo(revPct).cls},
    {label:`메타ROAS ${Math.round(roasPct)}%`, cls:statusInfo(roasPct).cls},
    {label:`스스CPA ${Math.round(ssPct)}%`, cls:statusInfo(ssPct).cls},
    {label:`콘텐츠 ${Math.round(ctPct)}%`, cls:statusInfo(ctPct).cls},
  ];

  document.getElementById('score-bar').innerHTML = `
    <div class="score-ring">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle fill="none" stroke="rgba(255,255,255,.06)" stroke-width="8" cx="44" cy="44" r="${r}" transform="rotate(-90 44 44)"/>
        <circle fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round"
          cx="44" cy="44" r="${r}"
          stroke-dasharray="${dash} ${circ.toFixed(1)}"
          transform="rotate(-90 44 44)"
          style="transition:stroke-dasharray .8s ease"/>
      </svg>
      <div class="score-center">
        <div class="score-pct" style="color:${col}">${avg}%</div>
        <div class="score-label">달성률</div>
      </div>
    </div>
    <div class="score-info">
      <div class="score-title">3월 KPI 전체 달성률 &nbsp;<span class="sbadge ${stat.cls}">${achieved}/3개 달성</span></div>
      <div class="score-badges">
        ${badges.map(b=>`<span class="sbadge ${b.cls}">${b.label}</span>`).join('')}
      </div>
      <div class="score-desc">목표값은 각 카드에서 바로 수정할 수 있어요. 수정 후 💾 저장 버튼을 눌러주세요.</div>
    </div>`;
}

// ══════════════════════════════
// KPI 1 — 월 매출
// ══════════════════════════════
function renderRevenue(){
  const actual = ACTUAL_3.revenue;
  const target = tgt('revenue');
  const p = pct(actual, target);
  const st = statusInfo(p);
  const barW = Math.min(p, 100);
  const isOver = p > 100;

  return `
  <div class="kpi-card ${st.cardCls}" id="card-rev">
    <div class="kpi-top-bar" style="background:var(--amb)"></div>
    <div class="kpi-body">
      <div class="kpi-row">
        <div class="kpi-left">
          <div class="kpi-icon">💵</div>
          <div class="kpi-name">월 매출 목표 달성률</div>
          <div class="kpi-note">아임웹 자사몰 기준 · 공동구매 포함 · 스마트스토어 별도</div>
        </div>
        <div class="kpi-right">
          <div class="prog-pct-badge" style="color:${st.barColor}">${Math.round(p)}%</div>
          <div class="sbadge ${st.cls}" style="margin-top:6px;display:inline-block">${st.label}</div>
        </div>
      </div>

      <div class="nums-row">
        <div class="num-block">
          <div class="num-label">이달 실적</div>
          <div class="num-val" style="color:var(--amb)">${fmtW(actual)}</div>
          <div class="num-sub">${actual.toLocaleString()}원</div>
        </div>
        <div style="align-self:center;font-size:20px;color:var(--t3)">/</div>
        <div class="num-block">
          <div class="num-label">목표 (클릭해서 수정)</div>
          <input class="num-input" id="inp-revenue" type="number"
            value="${target}" step="10000000"
            onchange="setTgt('revenue',+this.value);renderAll()"
            style="color:var(--amb)">
          <div class="num-sub">목표값</div>
        </div>
      </div>

      <div class="progress-section">
        <div class="prog-meta">
          <span>달성률</span>
          <span style="color:${st.barColor};font-weight:600">${actual.toLocaleString()}원 / ${target.toLocaleString()}원</span>
        </div>
        <div class="prog-bar">
          ${isOver
            ? `<div class="prog-over"></div>`
            : `<div class="prog-fill" style="width:${barW}%;background:${st.barColor}"></div>`}
        </div>
      </div>

      <!-- 매출 구성 -->
      <div style="padding-top:14px;border-top:1px solid var(--bdr)">
        <div style="font-size:11px;color:var(--t3);margin-bottom:8px">매출 구성 분해</div>
        <div style="display:flex;gap:0;height:10px;border-radius:5px;overflow:hidden">
          <div style="width:32.6%;background:#ff6b6b;opacity:.8" title="공동구매 5,972만"></div>
          <div style="width:17.2%;background:#00d4aa;opacity:.85" title="히든링크 키링캠 3,156만"></div>
          <div style="width:11.8%;background:#a78bfa;opacity:.85" title="가계부PRO·소계장부 2,157만"></div>
          <div style="width:11.0%;background:#4a9eff;opacity:.85" title="낼나펜슬 2,019만"></div>
          <div style="width:19.8%;background:#4ade80;opacity:.75" title="오가닉 3,629만"></div>
          <div style="flex:1;background:rgba(255,255,255,.1)" title="타이머 일반 1,396만"></div>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:7px">
          ${[['#ff6b6b','공구 5,972만'],['#00d4aa','히든링크 3,156만'],['#a78bfa','디지털 2,157만'],['#4a9eff','펜슬 2,019만'],['#4ade80','오가닉 3,629만'],['rgba(255,255,255,.3)','타이머 1,396만']].map(
            ([c,l])=>`<span style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--t2)"><span style="width:7px;height:7px;border-radius:50%;background:${c};flex-shrink:0"></span>${l}</span>`
          ).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

// ══════════════════════════════
// KPI 2 — 채널별 ROAS
// ══════════════════════════════
function renderRoas(){
  const channels = [
    {
      id:'roas_meta', name:'메타 광고', sub:'자사몰 픽셀 기준',
      dot:'#1877f2', actual:ACTUAL_3.roas_meta,
      actualExtra:'실주문 2.62x',
      unit:'x', lowerBetter:false,
      tipColor:'var(--blu)',
    },
    {
      id:'roas_meta_order', name:'메타 광고', sub:'실주문 기준 (권장)',
      dot:'#4a9eff', actual:ACTUAL_3.roas_meta_order,
      unit:'x', lowerBetter:false,
      tipColor:'var(--blu)',
    },
    {
      id:'roas_ss', name:'스마트스토어', sub:'CPA 기준 (낮을수록 좋음)',
      dot:'#03c75a', actual:ACTUAL_3.roas_ss_cpa,
      unit:'원 CPA', lowerBetter:true,
      tipColor:'var(--naver)',
      extra: `최고효율: <span style="color:var(--teal);font-weight:700">140원</span> (가계부PRO 정지중)`
    },
  ];

  const allP = channels.map(ch => pct(ch.actual, tgt(ch.id), ch.lowerBetter));
  const avgP = Math.round(allP.reduce((s,v)=>s+Math.min(v,100),0)/allP.length);
  const st = statusInfo(avgP);

  return `
  <div class="kpi-card ${st.cardCls}">
    <div class="kpi-top-bar" style="background:var(--blu)"></div>
    <div class="kpi-body">
      <div class="kpi-row">
        <div class="kpi-left">
          <div class="kpi-icon">📊</div>
          <div class="kpi-name">채널별 ROAS 목표</div>
          <div class="kpi-note">메타 픽셀 / 실주문 ROAS · 스마트스토어 CPA · 목표값 수정 가능</div>
        </div>
        <div class="kpi-right">
          <div class="prog-pct-badge" style="color:${st.barColor}">${avgP}%</div>
          <div class="sbadge ${st.cls}" style="margin-top:6px;display:inline-block">${st.label}</div>
        </div>
      </div>

      <div class="roas-table">
        ${channels.map((ch,ci) => {
          const p2 = pct(ch.actual, tgt(ch.id), ch.lowerBetter);
          const s2 = statusInfo(p2);
          const barW2 = Math.min(p2, 100);
          const dispActual = ch.unit==='x' ? ch.actual.toFixed(2)+'x' : ch.actual.toLocaleString()+'원';
          return `
          <div class="roas-row">
            <div class="roas-ch">
              <span class="roas-dot" style="background:${ch.dot}"></span>
              <div>
                <div style="font-size:13px;font-weight:600">${ch.name}</div>
                <div style="font-size:10px;color:var(--t3)">${ch.sub}</div>
                ${ch.extra?`<div style="font-size:10px;color:var(--t3);margin-top:1px">${ch.extra}</div>`:''}
              </div>
            </div>
            <div class="roas-actual" style="color:${ch.tipColor}">${dispActual}</div>
            <div class="roas-vs" style="color:var(--t3)">vs</div>
            <div class="roas-target-wrap">
              <input class="roas-target-input" id="inp-${ch.id}" type="number"
                value="${tgt(ch.id)}" step="${ch.unit==='x'?0.1:500}"
                onchange="setTgt('${ch.id}',+this.value);renderAll()"
                style="color:var(--t2)">
              <span style="font-size:10px;color:var(--t3)">${ch.unit==='x'?'목표':'목표 CPA'}</span>
            </div>
            <div class="roas-prog-mini">
              <div class="roas-prog-fill" style="width:${barW2}%;background:${s2.barColor}"></div>
            </div>
            <span class="roas-badge ${s2.cls}">${Math.round(p2)}%</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

// ══════════════════════════════
// KPI 3 — 콘텐츠 발행
// ══════════════════════════════
function renderContent(){
  const md = mdata();
  const byChannel = md.content_actual || {insta:0,blog:0,youtube:0,etc:0};
  const totalActual = Object.values(byChannel).reduce((s,v)=>s+(+v||0),0);
  md.content_total_actual = totalActual;
  const totalTarget = tgt('content_total');
  const p3 = pct(totalActual, totalTarget);
  const st = statusInfo(p3);

  const channels = [
    {key:'insta',   name:'인스타그램', icon:'📸', color:'#e1306c', tgtKey:'content_insta'},
    {key:'blog',    name:'블로그',     icon:'📝', color:'#03c75a', tgtKey:'content_blog'},
    {key:'youtube', name:'유튜브',     icon:'▶️', color:'#ff0000', tgtKey:'content_yt'},
    {key:'etc',     name:'기타',       icon:'🔗', color:'#a78bfa', tgtKey:'content_etc'},
  ];

  return `
  <div class="kpi-card ${st.cardCls}">
    <div class="kpi-top-bar" style="background:var(--pur)"></div>
    <div class="kpi-body">
      <div class="kpi-row">
        <div class="kpi-left">
          <div class="kpi-icon">✍️</div>
          <div class="kpi-name">신규 콘텐츠 발행 수</div>
          <div class="kpi-note">채널별 발행 수 직접 입력 · 월 목표 수정 가능</div>
        </div>
        <div class="kpi-right">
          <div class="prog-pct-badge" style="color:${st.barColor}">${Math.round(p3)}%</div>
          <div class="sbadge ${st.cls}" style="margin-top:6px;display:inline-block">${st.label}</div>
        </div>
      </div>

      <div class="nums-row">
        <div class="num-block">
          <div class="num-label">이달 발행</div>
          <div class="num-val" style="color:var(--pur)">${totalActual}</div>
          <div class="num-sub">콘텐츠 합계</div>
        </div>
        <div style="align-self:center;font-size:20px;color:var(--t3)">/</div>
        <div class="num-block">
          <div class="num-label">월 목표</div>
          <input class="num-input" id="inp-content-total" type="number"
            value="${totalTarget}" step="1"
            onchange="setTgt('content_total',+this.value);renderAll()"
            style="color:var(--pur);width:120px">
          <div class="num-sub">목표 편수</div>
        </div>
      </div>

      <div class="progress-section">
        <div class="prog-meta">
          <span>달성률</span>
          <span style="color:${st.barColor};font-weight:600">${totalActual}편 / ${totalTarget}편</span>
        </div>
        <div class="prog-bar">
          <div class="prog-fill" style="width:${Math.min(p3,100)}%;background:${st.barColor}"></div>
        </div>
      </div>

      <!-- 채널별 -->
      <div class="content-channels">
        ${channels.map(ch => {
          const act = +(byChannel[ch.key]||0);
          const tg  = tgt(ch.tgtKey);
          const cp  = tg>0?Math.min(act/tg*100,100):0;
          const bc  = cp>=100?'var(--teal)':cp>=50?'var(--amb)':'var(--cor)';
          return `
          <div class="ch-cell" style="border-color:${act>0?ch.color+'44':'var(--bdr)'}">
            <div style="font-size:18px">${ch.icon}</div>
            <div class="ch-cell-name">${ch.name}</div>
            <div class="ch-cell-actual" style="color:${act>0?ch.color:'var(--t3)'}">
              <input style="background:transparent;border:none;color:${act>0?ch.color:'var(--t3)'};font-size:20px;font-weight:800;font-family:'DM Mono',monospace;width:36px;text-align:center;outline:none;padding:0"
                type="number" min="0" value="${act}"
                onchange="mdata().content_actual['${ch.key}']=+this.value;renderAll()">
            </div>
            <div class="ch-cell-target">
              목표
              <input class="ch-cell-inp" type="number" min="0"
                value="${tg}"
                onchange="setTgt('${ch.tgtKey}',+this.value);renderAll()">
              편
            </div>
            <div class="ch-cell-bar">
              <div class="ch-cell-bar-fill" style="width:${cp}%;background:${bc}"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

// ══════════════════════════════
// RENDER ALL
// ══════════════════════════════
function renderAll(){
  document.getElementById('kpi-grid').innerHTML =
    renderRevenue() + renderRoas() + renderContent();
  renderScore();
  syncNote();
}

function syncNote(){
  const el = document.getElementById('note-inp');
  if(el) el.value = mdata().note||'';
}

function saveAll(){
  // 노트 저장
  const el = document.getElementById('note-inp');
  if(el) mdata().note = el.value;
  // 콘텐츠 채널 저장 (이미 onchange로 반영됨)
  save_s();
  const t = document.getElementById('toast');
  t.classList.add('on');
  setTimeout(()=>t.classList.remove('on'), 2200);
}

function changeMonth(){
  curMonth = document.getElementById('month-sel').value;
  const [y,m] = curMonth.split('-');
  document.getElementById('period-label').textContent = `${y}년 ${parseInt(m)}월 · 목표 달성 현황`;
  renderAll();
}

// INIT
load_s();
renderAll();
