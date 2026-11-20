// 제품 사진 합성 소재. copy 는 creatives.mjs 의 같은 제품 소재 id(c1~)에서 본문·헤드라인·CTA 를 상속한다.
// layout: photoTop(사진 위 + 카피 패널 아래) | photoFull(사진 전체 + 하단 그라데이션 카피)
// pos: 사진 object-position, h: 피드 기준 사진 영역 높이(px), bg: 카피 패널 배경(사진 배경색과 맞추면 이어져 보임)
// story: true 면 9:16 커버도 만든다.
export const photoSets = {
  '01-timer': [
    { id: 't1', copy: 'c1', photo: 'timer_butter.jpg', layout: 'photoTop', pos: '50% 59%', h: 800, bg: '#FFF1CC', story: true,
      kicker: '포커스 온 타이머', headline: '폰 잠깐 본다는 게\n*한 시간*이 된 적 있다면', sub: '다이얼부터 돌리세요 · 한 번이면 카운트다운 시작' },
    { id: 't2', copy: 'c2', photo: 'timer_tomato.jpg', layout: 'photoTop', pos: '50% 59%', h: 800, bg: '#2A1F14', story: true,
      kicker: '시작이 제일 어렵다면', headline: '딱 *25분*만\n돌려보세요', sub: '공부 · 업무 · 청소, 다이얼 한 번이면 시작' },
    { id: 't3', copy: 'c3', photo: 'timer_butter.jpg', layout: 'photoTop', pos: '50% 59%', h: 800, bg: '#1D2A5B', hl: '#FFD966',
      kicker: '한눈에 보이는 시간', headline: '남은 시간이\n*한눈에* 보여요', sub: '다이얼을 돌리면 색이 남은 시간을 보여줘요' },
    { id: 't4', copy: 'c4', photo: 'timer_tomato.jpg', layout: 'photoTop', pos: '50% 59%', h: 800, bg: '#FFE3DC',
      kicker: '어디든 두세요', headline: '세우고, 걸고,\n*붙이고*', sub: '스탠드 · 스탠드바 · 후크고리 · 마그넷 4가지 거치' },
    { id: 't5', copy: 'c5', photo: 'timer_classic.jpg', layout: 'photoTop', pos: '50% 46%', h: 860, bg: '#EFE8DA', hl: '#1F7A4D', story: true,
      kicker: '데스크테리어', headline: '책상 위에 두면\n*인테리어*가 되는 타이머' },
    { id: 't6', copy: 'c6', photo: 'timer_butter.jpg', layout: 'photoTop', pos: '50% 59%', h: 800, bg: '#FFD966', hl: '#1D2A5B', story: true,
      kicker: '몰입의 순간', headline: '집 나간 *집중력*,\n찾아드려요', sub: '다이얼 한 번, 몰입의 순간을 경험해 보세요' },
  ],
  '02-stand': [
    { id: 'p1', copy: 'c3', photo: 'stand.jpg', layout: 'photoTop', pos: '50% 50%', h: 660, bg: '#ECE9E2', story: true,
      kicker: '무궁무진 거치대', headline: '집에서 카페로,\n*가방 속* 작업 공간', sub: '독서대 · 태블릿 · 노트북 · 오거나이저를 한 대로' },
    { id: 'p2', copy: 'c1', photo: 'stand.jpg', layout: 'photoFull', pos: '42% 50%',
      kicker: '무궁무진 거치대', headline: '책 읽을 때도, 태블릿 쓸 때도,\n노트북으로 일할 때도.\n*매번 다른 거치대*가 필요했나요?' },
  ],
  '03-pencil': [
    { id: 'p1', copy: 'c1', photo: 'pencil.jpg', layout: 'photoFull', pos: '66% 50%', story: true,
      kicker: '낼나 펜슬 · 아이패드용', headline: '사각사각 소리가\n들리는 것 같지 않나요?', sub: '연필 감성 *10,000%*' },
    { id: 'p2', copy: 'c3', photo: 'pencil.jpg', layout: 'photoTop', pos: '70% 50%', h: 700, bg: '#FFD23F',
      kicker: '물리 3단 버튼', headline: '10만 번 눌러도 끄떡없는\n*물리 버튼*', sub: '1초 만에 깨어나는 펜슬 · 앱별 기능 커스텀',
      foot: '* 물리 버튼 10만 회 누름 테스트 기준' },
  ],
  '04-scrunchie': [
    { id: 'p1', copy: 'c1', photo: 'strap_long.jpg', layout: 'photoTop', pos: '50% 50%', h: 760, bg: '#F5F5F5', story: true,
      kicker: '스크런치 케이블 세트', headline: '또 떨어뜨렸어요.\n또 충전선 놓고 나왔어요.\n*스트랩 하나로 끝*' },
    { id: 'p2', copy: 'c2', photo: 'strap_short.jpg', layout: 'photoTop', pos: '50% 50%', h: 760, bg: '#F5F5F5',
      kicker: '스크런치 케이블 세트', headline: '예쁘면서 *충전까지*\n되는 폰 스트랩', sub: '케이블은 숨기고, 필요할 땐 쏙' },
  ],
  '05-yeonryeok': [
    { id: 'p1', copy: 'c1', photo: 'cal_clean.png', layout: 'photoTop', pos: '50% 18%', h: 880, bg: '#F4EEE4', story: true,
      kicker: '나다운 연력 2027', headline: '1년이 *한 장*에,\n항상 눈앞에' },
    { id: 'p2', copy: 'c2', photo: 'cal_flatlay.png', layout: 'photoFull', pos: '50% 40%',
      kicker: '줄줄이 스탬프', headline: '쓰기 귀찮은 날엔\n콕, 찍기만 하세요.\n*그것도 기록이에요*' },
  ],
  '06-grabscrap': [
    { id: 'p1', copy: 'c1', photo: 'grab_box.png', layout: 'photoTop', pos: '50% 50%', h: 860, bg: '#EFE9DC', story: true,
      kicker: '2027 그랩&스크랩 박스', headline: '올해의 끝을 붙잡고,\n내년을 *차곡차곡* 쌓아가요' },
    { id: 'p2', copy: 'c2', photo: 'grab_envelope.png', layout: 'photoFull', pos: '50% 50%',
      kicker: '타임캡슐 액자', headline: '다짐은 *봉인*하고,\n1년 뒤 연말에 열어보세요', sub: '2027년 말, 나에게 보내는 타임캡슐' },
  ],
  '07-playon': [
    { id: 'p1', copy: 'c1', photo: 'playon_clean.png', layout: 'photoTop', pos: '50% 56%', h: 800, bg: '#EFE9DC', story: true,
      kicker: '플레이온 키링 어댑터', headline: '귀여운 MP3\n플레이어인 줄 알았죠?\n*사실은 30W 충전기예요*' },
    { id: 'p2', copy: 'c2', photo: 'playon_hands.png', layout: 'photoFull', pos: '50% 50%',
      kicker: '플레이온 키링 어댑터', headline: '충전기는 왜 항상\n*가방 속*에 있어야 할까요?', sub: '차라리 키링처럼 달고 다니세요' },
  ],
};
