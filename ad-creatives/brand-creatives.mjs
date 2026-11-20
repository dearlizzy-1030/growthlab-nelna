// 낼나 기존 집행 소재 스타일 — "2번(사진 풀블리드 + 상단 헤드라인 + 딥그린 바)" 구도로 통일. 가격·구매 버튼 없음.
// layout: photo(사진 풀블리드, 상단 그라데이션+흰 헤드라인) | extend(밝은 배경색 + 헤드라인 위, 사진 아래로 자연스럽게 이어짐)
// zoom: 사진 확대 배율(pos 지점 기준), copy: creatives.mjs 소재 id 에서 본문을 상속(가격 줄은 제외)
export const brandSets = {
  '01-timer': [
    { id: 'n1', copy: 'c1', layout: 'photo', photo: 'timer_butter.jpg', pos: '50% 50%',
      headline: '폰 잠깐 본다는 게\n*한 시간*이 된 적 있다면', sub: '다이얼부터 돌리세요',
      desc: '다이얼 한 번이면 카운트다운 시작', cta: '더 알아보기' },
    { id: 'n2', copy: 'c2', layout: 'photo', photo: 'timer_tomato.jpg', pos: '50% 50%',
      headline: '딱 *25분*만\n돌려보세요', sub: '공부 · 업무 · 청소, 다이얼 한 번이면 시작',
      desc: '공부 · 업무 · 청소, 다이얼 한 번이면 시작', cta: '더 알아보기' },
    { id: 'n3', copy: 'c3', layout: 'photo', photo: 'timer_tomato.jpg', pos: '50% 50%', zoom: 1.2, origin: '50% 8%',
      headline: '남은 시간이\n*한눈에* 보여요', sub: '다이얼을 돌리면 색이 남은 시간을 보여줘요',
      desc: '다이얼 색으로 남은 시간이 한눈에', cta: '더 알아보기' },
    { id: 'n6', copy: 'c6', layout: 'photo', photo: 'timer_butter.jpg', pos: '50% 50%', zoom: 1.2, origin: '50% 8%',
      headline: '집 나간 *집중력*,\n찾아드려요', sub: '다이얼 한 번, 몰입의 순간을 경험해 보세요',
      desc: '몰입의 순간을 경험해 보세요', cta: '더 알아보기' },
    { id: 'n7', layout: 'photo', photo: 'timer_classic.jpg', pos: '50% 50%', noshade: true, logo: 'green', htop: 1112, subgap: 156, size: 68,
      shadow: '0 2px 16px rgba(0,0,0,.45)',
      headline: '몰입의 시간을\n*경험해보세요*', sub: '클래식 컬러 포커스 온 타이머',
      mhead: '클래식 컬러로 만나는 몰입의 시간', desc: '클래식 컬러 포커스 온 타이머', cta: '더 알아보기',
      primary: '클래식 컬러로 만나는 몰입의 시간.🌿\n다이얼을 돌리는 순간 시작되는 카운트다운, 몰입의 시간을 경험해보세요.\n✅ 다이얼만 돌리면 자동 카운트다운\n✅ 남은 시간이 색으로 한눈에\n✅ 무음 · 작게 · 크게, 내 성향대로 고르는 알람\n\n👉 자세히 보기\n\n𝙣𝙚𝙡𝙣𝙖.𝙨𝙝𝙤𝙥' },
  ],
};

// 2027 나다운 연력 — 같은 스타일(사진 + 헤드라인, 가격·구매 버튼·하단 바 없음). 사진에 nelna. 워터마크가 있어 상단 로고는 생략.
brandSets['05-yeonryeok'] = [
  { id: 'n1', layout: 'extend', logo: 'none', photo: 'cal_hero_wall.png', pos: '50% 10%', ptop: 380, ph: 970, fade: 10, bgc: '#C1DAE7', bgc2: '#B0D1E3', hl: '#D9382E',
    headline: '1년이 *한 장*에,\n항상 눈앞에', sub: '월 구분 없이 52주가 쭉 이어지는 세로형 포스터',
    mhead: '1년이 한 장에, 항상 눈앞에', desc: '월 구분 없이 52주가 이어지는 연력', cta: '더 알아보기',
    primary: '1년이 한 장에, 항상 눈앞에.📅\n✅ 월 구분 없이 52주가 쭉 이어지는 세로형 포스터\n✅ 문이나 벽에 붙여두면 한 해의 흐름이 끊김 없이\n✅ 쓰기 부담 없는 줄줄이 스탬프 6종\n\n👉 자세히 보기\n\n𝙣𝙚𝙡𝙣𝙖.𝙨𝙝𝙤𝙥' },
  { id: 'n2', layout: 'photo', logo: 'none', photo: 'cal_stamp_close.png', pos: '50% 50%',
    headline: '쓰기 귀찮은 날엔\n콕, *찍기만* 하세요', sub: '그것도 기록이에요',
    mhead: '찍기만 해도 기록이에요', desc: '줄줄이 스탬프 6종 · 도장당 600회', cta: '더 알아보기',
    primary: '쓰기 귀찮은 날엔 콕, 찍기만 하세요. 그것도 기록이에요.🖍️\n✅ 줄줄이 스탬프 6종, 도장당 600회\n✅ 나만의 의미를 정하는 Index(범례)\n✅ 다 채우지 않아도 괜찮아요\n\n👉 자세히 보기\n\n𝙣𝙚𝙡𝙣𝙖.𝙨𝙝𝙤𝙥' },
  { id: 'n3', layout: 'photo', logo: 'none', photo: 'cal_wall_woman.png', pos: '50% 50%',
    headline: '앱을 열지 않아도\n*올해*가 눈에 들어와요', sub: '문이나 벽에 붙여두면, 지나가다 오늘이 보여요',
    mhead: '앱 안 열어도 올해가 보여요', desc: '벽에 붙여두는 세로형 연력', cta: '더 알아보기',
    primary: '핸드폰 캘린더는 앱을 열어야 보이지만, 연력은 지나가다 눈에 들어와요.👀\n✅ 문이나 벽에 붙여두면 오늘이 며칠인지, 올해가 어디까지 왔는지 한눈에\n✅ 월 구분 없이 52주가 쭉 이어지는 세로형\n✅ 일정만 적어도 충분해요\n\n👉 자세히 보기\n\n𝙣𝙚𝙡𝙣𝙖.𝙨𝙝𝙤𝙥' },
  { id: 'n4', layout: 'extend', logo: 'none', photo: 'cal_flat_pen.png', pos: '50% 0%', ptop: 330, ph: 1020, bgc: '#C8CFD3', bgc2: '#C1C7CA', hl: '#D9382E',
    headline: '한 발짝 떨어져서 보면\n*‘나다운 1년’*이 보여요', sub: '목표부터 KPT 회고까지, 계획과 기록을 한 장에',
    mhead: '나다운 1년이 한눈에', desc: '계획 + 기록 + 회고 한 장', cta: '더 알아보기',
    primary: '12월 말, 한 발짝 떨어져서 보면 ‘나다운 1년’이 보여요.✨\n✅ 위쪽엔 올해의 목표 · 중요 날짜 · 10키워드\n✅ 가운데는 52주 기록\n✅ 아래쪽엔 KPT 회고까지, 계획과 회고를 한 장에\n\n👉 자세히 보기\n\n𝙣𝙚𝙡𝙣𝙖.𝙨𝙝𝙤𝙥' },
  { id: 'n5', layout: 'extend', logo: 'none', photo: 'cal_clean.png', pos: '50% 41%', ptop: 370, ph: 980, fade: 10, bgc: '#F4EEE4', hl: '#D9382E',
    headline: '다 채우지 않아도\n*괜찮아요*', sub: '일정만 적어도 충분하고, 기록하고 싶은 날엔 도장 하나만 콕',
    mhead: '다 채우지 않아도 괜찮아요', desc: '쓰기 부담 없는 기록 톤의 연력', cta: '더 알아보기',
    primary: '다 채우지 않아도 괜찮아요.🌿\n일정만 적어도 충분하고, 기록하고 싶은 날엔 도장 하나만 콕.\n✅ 쓰기 부담 없는 줄줄이 스탬프 6종\n✅ 180g 모조지로 구겨지지 않는 포스터\n✅ 2027년 한 해를 한 장에\n\n👉 자세히 보기\n\n𝙣𝙚𝙡𝙣𝙖.𝙨𝙝𝙤𝙥' },
];

// 연력 확정 문구 2종 (요청 문구 그대로)
brandSets['05-yeonryeok'].push(
  { id: 'f1', layout: 'extend', logo: 'none', photo: 'cal_flat_pen.png', pos: '50% 0%', ptop: 300, ph: 1050, bgc: '#C8CFD3', bgc2: '#C1C7CA', hl: '#D9382E',
    size: 100, subgap: 118,
    headline: '*2027* 연력 포스터', sub: '월 구분 없이 52주가 쭉 이어지는 세로형',
    mhead: '2027 낼나 연력 포스터', desc: '월 구분 없이 52주가 이어지는 세로형 연력', cta: '더 알아보기',
    primary: '2027년 1년을 한 장으로 정리하세요.📅\n✅ 월 구분 없이 52주가 쭉 이어지는 세로형 포스터\n✅ 다음 달로 넘기는 귀찮음 없이, 한 해 일정을 한눈에\n✅ 잘 보이는 곳에 붙여두는 연력\n\n👉 자세히 보기\n\n𝙣𝙚𝙡𝙣𝙖.𝙨𝙝𝙤𝙥' },
  { id: 'f2', layout: 'extend', logo: 'none', photo: 'cal_hero_wall.png', pos: '50% 10%', ptop: 380, ph: 970, fade: 10, bgc: '#C1DAE7', bgc2: '#B0D1E3', hl: '#D9382E',
    headline: '1년이 *한 장*으로\n채워져요', sub: '일정만 적어도, 도장 하나만 찍어도 괜찮아요',
    mhead: '1년이 한 장으로 채워져요', desc: '일정은 적고, 기록은 도장 콕', cta: '더 알아보기',
    primary: '1년이 한 장으로 채워져요.🖍️\n✅ 일정만 적어도 충분하고\n✅ 기록하고 싶은 날엔 줄줄이 스탬프 콕\n✅ 다 채우지 않아도 괜찮아요\n\n👉 자세히 보기\n\n𝙣𝙚𝙡𝙣𝙖.𝙨𝙝𝙤𝙥' },
);
