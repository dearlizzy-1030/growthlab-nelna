// 최종 후보(마음에 든다고 한 소재)만 모아 final/FINAL.md 를 만든다. 사용법: node ad-creatives/make-final.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { products } from './creatives.mjs';
import { brandSets } from './brand-creatives.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const p = products.find((x) => x.id === '01-timer');
const pick = ['n1', 'n2', 'n3', 'n6', 'n7'];
const names = { n1: '1_폰한시간', n2: '2_딱25분', n3: '3_한눈에', n6: '4_집나간집중력', n7: '5_클래식' };
const set = { n1: '세트 A (버터 사진)', n6: '세트 A (버터 사진)', n2: '세트 B (토마토 사진)', n3: '세트 B (토마토 사진)', n7: '세트 C (클래식 사진)' };
const items = brandSets['01-timer'];
const plain = (s) => s.replace(/\*/g, '').replace(/\n/g, ' ');

const out = ['# 낼나 포커스 온 타이머 · 최종 후보 5종 (피드 4:5, 1080×1350)\n'];
out.push('가격·구매 버튼·하단 바 없음. 상단 `nelna.` 로고 + 사진 풀블리드 + 흰색 헤드라인(강조어 노랑). 메타 CTA 버튼은 “더 알아보기”.\n');
out.push('| 파일 | 이미지 문구 | 권장 광고 세트 |\n|---|---|---|');
for (const id of pick) out.push(`| 타이머_${names[id]}.png | ${plain(items.find((x) => x.id === id).headline)} | ${set[id]} |`);
out.push('\n> 버터 사진(1·4번)과 토마토 사진(2·3번)이 서로 비슷하니 광고 세트를 나눠 집행하는 걸 권합니다.\n');

for (const id of pick) {
  const it = items.find((x) => x.id === id);
  const src = it.primary ? { primary: it.primary, mhead: it.mhead } : p.creatives.find((c) => c.id === it.copy);
  const body = src.primary
    .split('\n')
    .filter((l) => !/정가|32,900원/.test(l))
    .map((l) => (l.startsWith('👉') ? '👉 자세히 보기' : l))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
  out.push(`---\n\n## ${names[id].replace('_', '. ')}\n`);
  out.push(`- **이미지 문구**: ${plain(it.headline)} / ${it.sub}`);
  out.push(`- **메타 헤드라인**: ${src.mhead}`);
  out.push(`- **메타 설명**: ${it.desc}`);
  out.push(`- **CTA 버튼**: ${it.cta}`);
  out.push(`- **본문**:\n\n  > ${body.replace(/\n/g, '\n  > ')}\n`);
}
out.push('---\n\n## 집행 전 확인\n');
out.push('- 3번 “다이얼을 돌리면 색이 남은 시간을 보여줘요”는 실제 동작(카운트다운 중 색 면적이 줄어드는 방식)과 맞는지 확인하세요.');
out.push('- 1번 “폰 잠깐 본다는 게 한 시간…”, 2번 “25분”은 공감·사용 예시입니다. 집중력 향상 같은 효과 문구를 덧붙이지 마세요.');
out.push('- 4번 “집 나간 집중력, 찾아드려요”는 브랜드 감성 문구입니다. 수치·효과 보장 문구를 붙이지 마세요.');
out.push('- **5번 클래식 사진의 일시정지 버튼 라벨이 “Pausa”로 인쇄돼 있습니다**(다른 컬러 사진·누끼는 “Pause”). 실제 제품 표기와 다르면 정상 표기 사진으로 교체하세요.');
fs.mkdirSync(path.join(ROOT, 'final'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'final', 'FINAL.md'), out.join('\n') + '\n');
console.log('wrote final/FINAL.md');
