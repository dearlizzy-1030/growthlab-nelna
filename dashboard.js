
// ════ 데이터 ════
const DAILY_DATA=[
  {d:'03-01',orders:120,rev:10257145,pixel:912467,cvr:1.23},
  {d:'03-02',orders:147,rev:13001244,pixel:2139321,cvr:1.46},
  {d:'03-03',orders:177,rev:13044583,pixel:1271269,cvr:1.41},
  {d:'03-04',orders:150,rev:7655872,pixel:1270665,cvr:1.17},
  {d:'03-05',orders:150,rev:5934843,pixel:1030857,cvr:1.08},
  {d:'03-06',orders:115,rev:8627595,pixel:958590,cvr:0.88},
  {d:'03-07',orders:114,rev:5430941,pixel:1179832,cvr:0.95},
  {d:'03-08',orders:145,rev:8100404,pixel:1793138,cvr:1.06},
  {d:'03-09',orders:157,rev:8672169,pixel:1736289,cvr:1.22},
  {d:'03-10',orders:167,rev:10578268,pixel:3116592,cvr:1.79},
  {d:'03-11',orders:176,rev:13675567,pixel:3183339,cvr:1.67},
  {d:'03-12',orders:156,rev:9360398,pixel:2134794,cvr:1.51},
  {d:'03-13',orders:158,rev:9139437,pixel:3018728,cvr:2.73},
  {d:'03-14',orders:88,rev:6055338,pixel:1716157,cvr:1.55},
  {d:'03-15',orders:157,rev:12918993,pixel:3498605,cvr:2.66},
  {d:'03-16',orders:176,rev:12629027,pixel:1940392,cvr:1.92},
  {d:'03-17',orders:126,rev:8088017,pixel:2186750,cvr:2.08},
  {d:'03-18',orders:126,rev:8995417,pixel:1483300,cvr:1.64},
  {d:'03-19',orders:132,rev:10938576,pixel:1990500,cvr:2.15},
  {d:'03-20',orders:116,rev:9482245,pixel:2219400,cvr:2.01},
  {d:'03-21',orders:109,rev:10934962,pixel:2297650,cvr:2.09},
  {d:'03-22',orders:105,rev:9709785,pixel:2493884,cvr:1.95},
  {d:'03-23',orders:90,rev:4867593,pixel:1253996,cvr:1.74},
  {d:'03-24',orders:86,rev:7076438,pixel:1797500,cvr:1.31},
  {d:'03-25',orders:107,rev:8872761,pixel:2021200,cvr:2.29},
  {d:'03-26',orders:30,rev:1773086,pixel:591805,cvr:1.67}
];
let DAILY_AD_TOTAL=26236426;
const DAILY_W=DAILY_DATA.map(d=>({...d,roas:+(d.pixel/(DAILY_AD_TOTAL/26)).toFixed(2)}));
const WEEKLY=[
  {l:'1주 (3/1~7)',orders:2458,rev:139390000,pixel:8762000,net:38340000,roas:1.24,cvr:1.02,days:7},
  {l:'2주 (3/8~14)',orders:1522,rev:93373000,pixel:16699000,net:39490000,roas:2.36,cvr:1.77,days:7},
  {l:'3주 (3/15~21)',orders:1054,rev:79892000,pixel:15615000,net:45460000,roas:2.21,cvr:2.14,days:7},
  {l:'4주 (3/22~26)',orders:455,rev:35081000,pixel:8150000,net:17880000,roas:1.62,cvr:1.67,days:5}
];
const SS_ADS=[
  {nm:'낼나펜슬_필기_260311',cat:'낼나펜슬',on:true,spend:1517711,conv:30,cpa:50590,ctr:2.41},
  {nm:'낼나펜슬_필기자주_260311',cat:'낼나펜슬',on:false,spend:4211,conv:0,cpa:0,ctr:0.82},
  {nm:'소계장부_감으로_260311',cat:'소계장부',on:false,spend:118518,conv:2,cpa:59259,ctr:3.50},
  {nm:'가계부프로_v2_2_260311',cat:'가계부PRO',on:false,spend:77364,conv:2,cpa:38682,ctr:3.16},
  {nm:'낼나펜슬_펜슬차이_260312',cat:'낼나펜슬',on:true,spend:451123,conv:8,cpa:56390,ctr:1.65},
  {nm:'낼나펜슬_커버아님_260312',cat:'낼나펜슬',on:false,spend:424952,conv:7,cpa:60707,ctr:1.96},
  {nm:'낼나펜슬_지금여기_260312',cat:'낼나펜슬',on:true,spend:25349,conv:0,cpa:0,ctr:2.18},
  {nm:'가계부프로_v2_2_260313',cat:'가계부PRO',on:false,spend:39568,conv:282,cpa:140,ctr:4.14},
  {nm:'소계장부_감으로_260313',cat:'소계장부',on:false,spend:38747,conv:185,cpa:209,ctr:4.55}
];
const CAT_COL={'낼나펜슬':'#f472b6','소계장부':'#60a5fa','가계부PRO':'#a78bfa'};
const ACTIONS=[
  {icon:'🔴',color:'var(--cor)',bg:'rgba(255,107,107,.08)',bdr:'rgba(255,107,107,.25)',title:'가계부PRO v2_2_260313 즉시 재가동',desc:'CPA 140원 최고효율 소재 정지 중',act:'스마트스토어 광고 관리자 → 소재 활성화'},
  {icon:'🔴',color:'var(--cor)',bg:'rgba(255,107,107,.08)',bdr:'rgba(255,107,107,.25)',title:'소계장부 감으로_260313 재가동',desc:'CPA 209원 우수 소재 정지 중 — 3.9만원으로 185건 전환 가능',act:'스마트스토어 광고 관리자 → 소재 활성화'},
  {icon:'🟡',color:'var(--amb)',bg:'rgba(245,166,35,.07)',bdr:'rgba(245,166,35,.2)',title:'스마트스토어 예산 재배분',desc:'낼나펜슬 89.8% 집중 (CPA 53,852원) — 소계장부·가계부PRO 확대 시 전환 6배↑',act:'펜슬 40% / 소계 30% / 가계부PRO 30%'},
  {icon:'💡',color:'var(--blu)',bg:'rgba(74,158,255,.06)',bdr:'rgba(74,158,255,.18)',title:'키링캠_v3 예산 확대 검토',desc:'ROAS 4.41x 최고 효율 — 스케일업 여지 있음',act:'키링캠_v3 일예산 20~30% 증액'}
];
const CREATIVES=[
  {nm:'키링캠_안파는색',ctr:2.81,days:22,trend:'down'},{nm:'낼나펜슬_필기',ctr:1.88,days:28,trend:'stable'},
  {nm:'가계부_2_2',ctr:2.40,days:28,trend:'stable'},{nm:'사계부_감으로',ctr:2.71,days:28,trend:'down'},
  {nm:'키링캠_이링크',ctr:1.55,days:17,trend:'stable'},{nm:'가계부_2_3',ctr:1.97,days:28,trend:'down'},
  {nm:'신호등템플릿',ctr:1.08,days:28,trend:'down'},{nm:'키링캠_v3',ctr:1.17,days:13,trend:'up'}
];

// ════ 유틸 ════
const fmtM=n=>{const v=Number(n);if(v>=100000000)return(v/100000000).toFixed(1)+'억';if(v>=10000000)return(v/10000000).toFixed(1)+'천만';if(v>=1000000)return(v/1000000).toFixed(0)+'백만';if(v>=10000)return Math.round(v/10000)+'만';return v.toLocaleString();};
const rcol=r=>r>=3?'var(--teal)':r>=1.5?'var(--amb)':r>=1?'#f5a62380':'var(--cor)';
const rcls=r=>r>=3?'pill-h':r>=1.5?'pill-m':'pill-l';
const toN=v=>parseFloat(String(v).replace(/[^0-9.-]/g,''))||0;

// ════ 네비게이션 ════
const PAGE_NAMES={overview:'개요',ads:'광고 효율',profit:'수익 분析',intel:'광고 인텔리전스'};
const BN_PAGES=['overview','ads','profit','intel'];

function goPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('[data-p]').forEach(n=>n.classList.toggle('on',n.dataset.p===id));
  const pg=document.getElementById('page-'+id);
  if(pg)pg.classList.add('on');
  const names={overview:'개요',ads:'광고 효율',profit:'수익 분석',intel:'광고 인텔리전스'};
  const tt=document.getElementById('top-title');
  if(tt)tt.textContent=names[id]||'그로스랩 🚀';
  ['overview','ads','profit','intel'].forEach(p=>{
    const el=document.getElementById('bn-'+p);
    if(el)el.classList.toggle('on',p===id);
  });
  closeDrawer();
  if(id==='ads')renderAds();
  if(id==='intel')renderIntel();
}
function goPageM(id){
  goPage(id);
  const tt=document.getElementById('top-title');
  if(tt)tt.textContent=PAGE_NAMES[id]||'그로스랩';
  BN_PAGES.forEach(p=>{const el=document.getElementById('bn-'+p);if(el)el.classList.toggle('on',p===id);});
  document.querySelectorAll('.drawer-nav').forEach(n=>n.classList.toggle('on',n.dataset.p===id));
  closeDrawer();
}
function toggleDrawer(){
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('drawer-overlay').classList.toggle('open');
}
function closeDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
}
// nav onclick 직접 설정됨

// ════ 채널/기간 탭 ════
let curCh='meta',curPrd={meta:'daily',naver:'daily'};
function switchCh(ch){
  curCh=ch;
  document.getElementById('panel-meta').style.display=ch==='meta'?'block':'none';
  document.getElementById('panel-naver').style.display=ch==='naver'?'block':'none';
  ['meta','naver'].forEach(c=>{document.getElementById('ch-'+c).className='ch-tab'+(c===ch?' on-'+c:'');});
  renderAdsPeriod();
}
function switchPeriod(ch,p){
  curPrd[ch]=p;
  const px=ch==='meta'?'m':'n';
  ['daily','weekly','monthly'].forEach(x=>{const el=document.getElementById(px+'-'+x);if(el)el.style.display=x===p?'block':'none';});
  ['daily','weekly','monthly'].forEach(x=>{const b=document.getElementById((ch==='meta'?'mp':'np')+'-'+x);if(b)b.className='period-btn'+(x===p?' on-'+(ch==='meta'?'m':'n'):'');});
  renderAdsPeriod();
}
function renderAds(){renderMetaDaily();renderSSDaily();}
function renderAdsPeriod(){
  if(curCh==='meta'){if(curPrd.meta==='daily')renderMetaDaily();if(curPrd.meta==='weekly')renderMetaWeekly();}
  else{if(curPrd.naver==='daily')renderSSDaily();if(curPrd.naver==='weekly')renderSSWeekly();}
}

// ════ 메타 렌더 ════
function renderMetaDaily(){
  const mc=document.getElementById('m-chart');if(!mc)return;
  const mR=Math.max(...DAILY_W.map(d=>d.rev));
  const mP=Math.max(...DAILY_W.map(d=>d.pixel));
  const H=86;
  mc.innerHTML=DAILY_W.map((d,i)=>{
    const hR=Math.max(3,Math.round(d.rev/mR*H));
    const hP=Math.max(3,Math.round(d.pixel/mP*H));
    return`<div class="bar-col" style="height:${H}px" title="${d.d} · 주문 ${fmtM(d.rev)} · 픽셀 ${fmtM(d.pixel)} · ROAS ${d.roas}x">
      <div class="bar-seg" style="height:${hR}px;background:var(--amb);opacity:.7;flex:1"></div>
      <div class="bar-seg" style="height:${hP}px;background:var(--teal);opacity:.85;flex:1"></div>
    </div>`;
  }).join('');
  const xl=document.getElementById('m-xlbls');
  if(xl)xl.innerHTML=DAILY_W.map((d,i)=>`<div class="bar-xl">${parseInt(d.d.slice(3))%5===1||i===25?parseInt(d.d.slice(3))+'일':''}</div>`).join('');
  const tb=document.getElementById('m-daily-tbody');if(!tb)return;
  tb.innerHTML=[...DAILY_W].reverse().map(d=>`<tr>
    <td class="mono" style="font-size:12px">2026. ${d.d}</td>
    <td class="r">${d.orders}건</td>
    <td class="r mono" style="color:var(--amb)">${fmtM(d.rev)}</td>
    <td class="r mono" style="color:var(--teal)">${fmtM(d.pixel)}</td>
    <td class="r"><span class="pill ${d.cvr>=2?'pill-h':'pill-m'}">${d.cvr}%</span></td>
    <td class="r"><span class="pill ${rcls(d.roas)}">${d.roas}x</span></td>
  </tr>`).join('');
}
function renderMetaWeekly(){
  const kc=document.getElementById('m-week-kpis');
  if(kc)kc.innerHTML=WEEKLY.map(w=>`<div class="kpi"><div class="kl">${w.l}</div><div class="kv" style="color:${rcol(w.roas)}">${w.roas}x</div><div class="ks" style="color:var(--grn)">순수익 ${fmtM(w.net)}</div></div>`).join('');
  const tb=document.getElementById('m-weekly-tbody');if(!tb)return;
  tb.innerHTML=WEEKLY.map(w=>`<tr>
    <td style="font-weight:600">${w.l}</td><td class="r">${w.orders}건</td>
    <td class="r mono" style="color:var(--amb)">${fmtM(w.rev)}</td>
    <td class="r mono" style="color:var(--teal)">${fmtM(w.pixel)}</td>
    <td class="r mono" style="color:var(--grn)">${fmtM(w.net)}</td>
    <td class="r"><span class="pill ${rcls(w.roas)}">${w.roas}x</span></td>
    <td class="r" style="color:var(--t2)">${w.cvr}%</td>
  </tr>`).join('');
}
function renderSSDaily(){
  const tb=document.getElementById('ss-tbody');if(!tb)return;
  const cpaC=v=>v===0?'pill-n':v<=500?'pill-h':v<=10000?'pill-m':'pill-l';
  tb.innerHTML=SS_ADS.map((a,i)=>`<tr>
    <td style="color:var(--t3);font-size:11px">${i+1}</td>
    <td style="font-size:12px;font-weight:500">${a.nm}</td>
    <td><span style="width:7px;height:7px;border-radius:50%;background:${CAT_COL[a.cat]};display:inline-block;margin-right:4px"></span><span style="font-size:11px;color:var(--t2)">${a.cat}</span></td>
    <td style="text-align:center"><span style="font-size:10px;padding:2px 7px;border-radius:100px;font-weight:600;background:${a.on?'var(--nl)':'rgba(255,255,255,.05)'};color:${a.on?'var(--naver)':'var(--t3)'}">${a.on?'운영중':'정지'}</span></td>
    <td class="r mono" style="color:var(--amb)">${(a.spend/10000).toFixed(1)}만</td>
    <td class="r" style="color:${a.conv>0?'var(--naver)':'var(--t3)'}">${a.conv>0?a.conv+'건':'—'}</td>
    <td class="r"><span class="pill ${cpaC(a.cpa)}">${a.cpa>0?a.cpa.toLocaleString()+'원':'—'}</span></td>
    <td class="r" style="color:var(--t2);font-size:12px">${a.ctr.toFixed(2)}%</td>
  </tr>`).join('');
}
function renderSSWeekly(){
  const kc=document.getElementById('n-week-kpis');
  if(kc)kc.innerHTML=WEEKLY.map(w=>`<div class="kpi"><div class="kl">${w.l}</div><div class="kv" style="color:${rcol(w.roas)}">${w.roas}x</div><div class="ks">픽셀UTM ${fmtM(w.pixel)}</div></div>`).join('');
  const tb=document.getElementById('n-weekly-tbody');if(!tb)return;
  tb.innerHTML=WEEKLY.map(w=>{const sp=Math.round(DAILY_AD_TOTAL/26*w.days);return`<tr>
    <td style="font-weight:600">${w.l}</td>
    <td class="r mono" style="color:var(--amb)">${fmtM(sp)}</td>
    <td class="r mono" style="color:var(--teal)">${fmtM(w.pixel)}</td>
    <td class="r"><span class="pill ${rcls(w.roas)}">${w.roas}x</span></td>
    <td class="r" style="color:var(--t2)">${w.cvr}%</td>
  </tr>`;}).join('');
}

// ════ 인텔리전스 ════
function renderIntel(){
  const al=document.getElementById('action-list');
  if(al)al.innerHTML=ACTIONS.map(a=>`<div class="action-item" style="background:${a.bg};border:1px solid ${a.bdr}">
    <div style="font-size:18px;flex-shrink:0;margin-top:1px">${a.icon}</div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:700;color:${a.color};margin-bottom:3px">${a.title}</div>
      <div style="font-size:12px;color:var(--t2);margin-bottom:5px;line-height:1.5">${a.desc}</div>
      <div style="font-size:11px;color:var(--t3)"><span style="color:${a.color}">→</span> ${a.act}</div>
    </div>
  </div>`).join('');

  const fl=document.getElementById('fatigue-list');
  if(fl){
    const mC=Math.max(...CREATIVES.map(c=>c.ctr));
    fl.innerHTML=CREATIVES.map(c=>{
      const fg=c.ctr<0.5?{icon:'🔴',label:'교체필요',color:'var(--cor)'}:c.ctr<1||c.trend==='down'?{icon:'🟡',label:'주의',color:'var(--amb)'}:{icon:'🟢',label:'정상',color:'var(--teal)'};
      return`<div class="fatigue-row">
        <div style="font-size:13px;flex-shrink:0">${fg.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.nm}</div>
          <div style="height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden;margin-top:4px">
            <div style="width:${Math.round(c.ctr/mC*100)}%;height:100%;background:${fg.color};border-radius:2px"></div>
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0;min-width:80px">
          <div style="font-size:10px;color:${fg.color};font-weight:600">${fg.label}</div>
          <div style="font-size:10px;color:var(--t3)">CTR ${c.ctr}% · ${c.days}일</div>
        </div>
      </div>`;
    }).join('');
  }

  const cb=document.getElementById('ch-compare-bars');
  if(cb){
    const metrics=[
      {l:'CTR',meta:0.72,ss:2.71,u:'%',ssWin:true},
      {l:'CPA',meta:7621,ss:5228,u:'원',ssWin:true},
      {l:'전환수',meta:3443,ss:516,u:'건',ssWin:false},
      {l:'노출',meta:2980597,ss:145264,u:'',ssWin:false},
    ];
    cb.innerHTML=metrics.map(m=>{
      const t=m.meta+m.ss,mp=Math.round(m.meta/t*100);
      const fv=v=>m.u===''?(v/10000).toFixed(0)+'만':v>=10000?Math.round(v/10000)+'만'+m.u:v.toLocaleString()+m.u;
      return`<div class="ch-cmp-row">
        <div class="ch-cmp-lbl">
          <span style="color:${m.ssWin?'var(--t3)':'#1877f2'};font-weight:${m.ssWin?400:600}">${fv(m.meta)}</span>
          <span style="font-weight:600">${m.l}</span>
          <span style="color:${m.ssWin?'var(--naver)':'var(--t3)'};font-weight:${m.ssWin?600:400}">${fv(m.ss)}</span>
        </div>
        <div class="ch-cmp-bar">
          <div style="width:${mp}%;background:#1877f2;opacity:.7"></div>
          <div style="width:${100-mp}%;background:var(--naver);opacity:.75"></div>
        </div>
      </div>`;
    }).join('');
  }
  updateSim();
}

// ════ 시뮬레이터 ════
const CUR_META_CPA=7621,CUR_META_CONV=3443,CUR_META_SPEND=26236426;
const CUR_SS_CONV=516,CUR_SS_SPEND=2697543;
const SS_CPA_MAP={pencil:53852,sok:841,gae:412};
function updateSim(){
  const total=parseInt(document.getElementById('sim-total')?.value||2900)*10000;
  const mR=parseInt(document.getElementById('sim-meta')?.value||90)/100;
  const mS=Math.round(total*mR),ssS=total-mS;
  const mConv=Math.round(mS/CUR_META_CPA*Math.pow(mS/CUR_META_SPEND,-.15));
  const p=parseInt(document.getElementById('sim-pencil')?.value||40);
  const s=parseInt(document.getElementById('sim-sok')?.value||30);
  const g=parseInt(document.getElementById('sim-gae')?.value||30);
  const sum=p+s+g||1;
  const ssConv=Math.round(ssS*(p/sum)/SS_CPA_MAP.pencil+ssS*(s/sum)/SS_CPA_MAP.sok+ssS*(g/sum)/SS_CPA_MAP.gae);
  const tot=mConv+ssConv,cpa=tot>0?Math.round(total/tot):0;
  const curTot=CUR_META_CONV+CUR_SS_CONV,curCpa=Math.round((CUR_META_SPEND+CUR_SS_SPEND)/curTot);
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('sim-total-lbl',Math.round(total/10000).toLocaleString()+'만원');
  set('sim-meta-lbl',Math.round(mR*100)+'%');
  set('r-meta-spend',fmtM(mS)+'원');set('r-ss-spend',fmtM(ssS)+'원');
  set('r-meta-conv',mConv.toLocaleString()+'건');set('r-ss-conv',ssConv.toLocaleString()+'건');
  set('r-total',tot.toLocaleString()+'건');set('r-cpa',cpa.toLocaleString()+'원');
  const dC=tot-curTot,dP=cpa-curCpa;
  const dc=document.getElementById('r-conv-diff');if(dc){dc.textContent=(dC>=0?'+':'')+dC.toLocaleString()+'건';dc.style.color=dC>=0?'var(--teal)':'var(--cor)';}
  const dp=document.getElementById('r-cpa-diff');if(dp){dp.textContent=(dP<=0?'':'+')+(dP).toLocaleString()+'원';dp.style.color=dP<=0?'var(--teal)':'var(--cor)';}
}
function updateSimSS(){
  const p=parseInt(document.getElementById('sim-pencil').value);
  const s=parseInt(document.getElementById('sim-sok').value);
  const g=parseInt(document.getElementById('sim-gae').value);
  const sum=p+s+g||1;
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('sim-pencil-lbl',Math.round(p/sum*100)+'%');
  set('sim-sok-lbl',Math.round(s/sum*100)+'%');
  set('sim-gae-lbl',Math.round(g/sum*100)+'%');
  updateSim();
}

// ════ 파일 업로드 ════
let uploaded={meta:null,utm:null,order:null};
function handleDrop(e){e.preventDefault();document.getElementById('upload-zone').classList.remove('drag');handleFiles(e.dataTransfer.files);}
function handleFiles(files){
  Array.from(files).forEach(f=>{
    const n=f.name.toLowerCase();
    if(n.includes('utm')||n.includes('pixel'))parseCSV(f,'utm');
    else if(n.endsWith('.xlsx'))parseXLSX(f,'order');
    else if(n.endsWith('.csv'))parseCSV(f,'meta');
  });
}
function parseCSVText(text){
  // RFC 4180 CSV 파서 — 따옴표 안 쉼표/줄바꿈 정확히 처리
  const rows=[];
  let cur='',fields=[],inQ=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i],nx=text[i+1];
    if(inQ){
      if(ch==='"'&&nx==='"'){cur+='"';i++;}
      else if(ch==='"'){inQ=false;}
      else{cur+=ch;}
    }else{
      if(ch==='"'){inQ=true;}
      else if(ch===','){fields.push(cur.trim());cur='';}
      else if(ch==='
'&&nx==='
'||ch==='
'){
        fields.push(cur.trim());
        if(fields.some(f=>f!==''))rows.push([...fields]);
        fields=[];cur='';
        if(ch==='
')i++;
      }else{cur+=ch;}
    }
  }
  if(cur||fields.length){fields.push(cur.trim());if(fields.some(f=>f!==''))rows.push(fields);}
  if(rows.length<2)return[];
  const hdr=rows[0];
  return rows.slice(1).map(r=>{const o={};hdr.forEach((h,i)=>o[h]=r[i]||'');return o;});
}
function parseCSV(file,type){
  const tryParse=(text)=>{
    const rows=parseCSVText(text);
    if(rows.length>0){uploaded[type]=rows;setUS(type,file.name,rows.length);checkReady();}
  };
  const r=new FileReader();
  r.onload=e=>{
    // UTF-8 먼저 시도, 실패시 EUC-KR
    try{tryParse(e.target.result);}
    catch(err){
      const r2=new FileReader();
      r2.onload=e2=>{tryParse(e2.target.result);};
      r2.readAsText(file,'euc-kr');
    }
  };
  r.readAsText(file,'utf-8');
}
function parseXLSX(file,type){
  const r=new FileReader();
  r.onload=e=>{
    try{const wb=XLSX.read(e.target.result,{type:'array'});const ws=wb.Sheets[wb.SheetNames[0]];const rows=XLSX.utils.sheet_to_json(ws,{defval:''});uploaded[type]=rows;setUS(type,file.name,rows.length);}
    catch(err){setUS(type,'오류',0,true);}checkReady();
  };
  r.readAsArrayBuffer(file);
}
function setUS(type,name,cnt,err=false){
  const ids={meta:['ui-meta','ul-meta','us-meta'],utm:['ui-utm','ul-utm','us-utm'],order:['ui-order','ul-order','us-order']};
  const [ic,lc,sc]=ids[type];
  document.getElementById(ic).textContent=err?'❌':'✅';
  const le=document.getElementById(lc);if(le){le.textContent=err?'오류':(name.length>20?name.slice(0,18)+'…':name)+'·'+cnt+'행';le.style.color=err?'var(--cor)':'var(--teal)';}
  const se=document.getElementById(sc);if(se&&!err)se.classList.add('ready');
}
function checkReady(){
  const cnt=Object.values(uploaded).filter(v=>v).length;
  const btn=document.getElementById('analyze-btn'),msg=document.getElementById('analyze-msg');
  if(btn)btn.style.display=cnt>0?'inline-block':'none';
  if(msg)msg.textContent=cnt===3?'3개 모두 준비됐어요 — 분석 시작 버튼을 눌러주세요':`${cnt}/3개 업로드됨`;
}
function analyzeUploads(){
  const btn=document.getElementById('analyze-btn'),msg=document.getElementById('analyze-msg');
  if(btn){btn.textContent='⏳ 분석 중...';btn.disabled=true;}
  setTimeout(()=>{
    try{
      if(uploaded.meta&&uploaded.meta.length>0)processMetaCSV(uploaded.meta);
      if(uploaded.utm&&uploaded.utm.length>0)processUTMCSV(uploaded.utm);
      if(uploaded.order&&uploaded.order.length>0)processOrderXLSX(uploaded.order);
      renderMetaDaily();renderMetaWeekly();renderSSDaily();
      if(msg){msg.textContent='✅ 데이터가 반영됐어요!';msg.style.color='var(--teal)';}
      if(btn){btn.textContent='✅ 완료';btn.style.background='var(--grn)';}
      setTimeout(()=>{if(btn){btn.textContent='📊 분석 시작';btn.disabled=false;btn.style.background='var(--teal)';}},3000);
    }catch(err){
      if(btn){btn.textContent='❌ 오류';btn.disabled=false;}
      if(msg){msg.textContent='오류: '+err.message;msg.style.color='var(--cor)';}
    }
  },150);
}
function processMetaCSV(rows){
  const totalSpend=rows.reduce((s,r)=>s+toN(r['지출 금액 (KRW)']),0);
  const totalConvVal=rows.reduce((s,r)=>s+toN(r['구매 전환값']),0);
  const totalImp=rows.reduce((s,r)=>s+toN(r['노출']),0);
  const totalClick=rows.reduce((s,r)=>s+toN(r['고유 링크 클릭']),0);
  DAILY_AD_TOTAL=totalSpend;
  const sorted=[...rows].filter(r=>toN(r['지출 금액 (KRW)'])>0).sort((a,b)=>toN(b['지출 금액 (KRW)'])-toN(a['지출 금액 (KRW)']));
  const tb=document.getElementById('meta-top5');
  if(tb)tb.innerHTML=sorted.slice(0,5).map(r=>{
    const roas=toN(r['결과 ROAS']);const spend=toN(r['지출 금액 (KRW)']);
    const name=(r['광고 이름']||'').replace(/영상_|단일_|G_영상_/g,'').slice(0,18);
    return`<tr><td style="font-size:11px">${name}</td><td class="r mono">${fmtM(spend)}</td><td class="r"><span class="pill ${roas>=3?'pill-h':roas>=2?'pill-m':'pill-l'}">${roas.toFixed(2)}x</span></td><td class="r">${toN(r['구매']).toFixed(0)}</td></tr>`;
  }).join('');
  console.log('[메타] 광고비:',totalSpend,'| 소재수:',rows.length);
}
function processUTMCSV(rows){
  const byDate={};
  rows.forEach(r=>{
    const d=(r['집계시간']||'').slice(0,10);if(!d)return;
    if(!byDate[d])byDate[d]={visit:0,buyers:0,pixel:0};
    byDate[d].visit+=toN(r['전체 방문 횟수']);
    byDate[d].buyers+=toN(r['구매자 수']);
    byDate[d].pixel+=toN(r['총 구매금액']);
  });
  const days=Math.max(Object.keys(byDate).length,26);
  const dailyAd=DAILY_AD_TOTAL/days;
  DAILY_W.forEach(d=>{
    const v=byDate['2026-'+d.d];
    if(v){d.pixel=v.pixel;d.cvr=v.visit>0?+(v.buyers/v.visit*100).toFixed(2):0;d.roas=dailyAd>0?+(v.pixel/dailyAd).toFixed(2):0;}
  });
  const wSlices=[[0,6],[7,13],[14,20],[21,25]];
  wSlices.forEach(([s,e],wi)=>{
    if(!WEEKLY[wi])return;
    const slice=DAILY_W.slice(s,e+1);
    WEEKLY[wi].pixel=slice.reduce((x,d)=>x+d.pixel,0);
    const sp=dailyAd*slice.length;
    WEEKLY[wi].roas=sp>0?+(WEEKLY[wi].pixel/sp).toFixed(2):0;
    WEEKLY[wi].cvr=+(slice.reduce((x,d)=>x+d.cvr,0)/slice.length).toFixed(2);
  });
  console.log('[UTM] 날짜수:',Object.keys(byDate).length);
}
function processOrderXLSX(rows){
  const TIMER_KW=['타이머','Timer'];
  const valid=rows.filter(r=>toN(r['품목실결제가']||r['최종주문금액']||0)>0&&!TIMER_KW.some(k=>String(r['상품명']||'').includes(k)));
  const byDate={};
  valid.forEach(r=>{
    const d=String(r['주문일']||'').slice(0,10);if(!d||d.length<10)return;
    if(!byDate[d])byDate[d]={orders:new Set(),rev:0};
    byDate[d].orders.add(r['주문번호']);
    byDate[d].rev+=toN(r['품목실결제가']||r['최종주문금액']||0);
  });
  DAILY_W.forEach(d=>{const v=byDate['2026-'+d.d];if(v){d.orders=v.orders.size;d.rev=v.rev;}});
  console.log('[주문] 유효:',Object.values(byDate).reduce((s,v)=>s+v.orders.size,0),'건');
}

// ════ INIT ════
(function(){
  const d=new Date();
  const de=document.getElementById('today-date');
  if(de)de.textContent=d.toLocaleDateString('ko-KR',{year:'numeric',month:'long',day:'numeric',weekday:'long'});
  renderMetaDaily();
  renderSSDaily();
  renderIntel();
  updateSim();
})();
