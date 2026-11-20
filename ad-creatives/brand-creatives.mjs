// 낼나 기존 집행 소재 스타일(크림/사진 배경 + nelna. 로고 + 굵은 2줄 헤드라인 + 레드 CTA + 딥그린 하단 바)로 만든 시안.
// layout: lineup(타이머 3색 누끼) | photo(제품 사진 풀블리드)
// copy: creatives.mjs 의 같은 제품 소재 id 에서 본문·헤드라인·CTA 를 상속한다.
export const brandSets = {
  '01-timer': [
    { id: 'n1', copy: 'c1', layout: 'lineup', bg: '#F3EFE4', hl: '#E5322B',
      headline: '폰 잠깐 본다는 게\n*한 시간*이 된 적 있다면', sub: '다이얼부터 돌리세요 · 정가 35,000원 → *32,900원*', burst: '다이얼\n한 번!' },
    { id: 'n2', copy: 'c2', layout: 'photo', photo: 'timer_tomato.jpg', pos: '50% 50%',
      headline: '딱 *25분*만\n돌려보세요', sub: '공부 · 업무 · 청소, 다이얼 한 번이면 시작' },
    { id: 'n3', copy: 'c3', layout: 'lineup', bg: '#E4EDE3', hl: '#0B5439', blobs: true,
      headline: '남은 시간이\n*한눈에* 보여요', sub: '다이얼을 돌리면 색이 남은 시간을 보여줘요 · *32,900원*', burst: '한눈에\n쏙!' },
    { id: 'n4', copy: 'c4', layout: 'lineup', bg: '#FFFFFF', hl: '#E5322B', blobs: true,
      tags: ['스탠드', '스탠드바', '후크고리', '마그넷'],
      headline: '세우고, 걸고,\n*붙이고*', sub: '어디든 두세요 · 정가 35,000원 → *32,900원*', burst: '4가지\n거치' },
    { id: 'n5', copy: 'c5', layout: 'lineup', bg: '#F3EFE4', hl: '#0B5439',
      tags: ['클래식', '버터', '토마토'],
      headline: '책상 위에 두면\n*인테리어*가 되는 타이머', sub: '내 책상에 맞는 색을 골라보세요 · *32,900원*', burst: '3가지\n컬러' },
    { id: 'n6', copy: 'c6', layout: 'photo', photo: 'timer_butter.jpg', pos: '50% 50%',
      headline: '집 나간 *집중력*,\n찾아드려요', sub: '다이얼 한 번, 몰입의 순간을 경험해 보세요' },
  ],
};
