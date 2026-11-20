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
  ],
};
