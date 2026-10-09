import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CATEGORY_ORDER,
  QUESTION_IDS,
  QUIZ_QUESTIONS,
  WATCH_RESULTS,
  getQuizResult,
} from '@/lib/quizData';

function profile(overrides = {}) {
  return Object.fromEntries(QUESTION_IDS.map((q) => [q, overrides[q] ?? 3]));
}

const COMBOS = [];
for (const budget of ['budget', 'spend']) {
  for (const aesthetic of ['vintage', 'modern']) {
    for (const technical of ['enthusiast', 'wearit']) {
      COMBOS.push([budget, aesthetic, technical]);
    }
  }
}

describe('quizData', () => {
  it('has 10 questions', () => {
    expect(QUIZ_QUESTIONS).toHaveLength(10);
  });

  it('defines all 40 watches with every field filled', () => {
    let count = 0;
    for (const cat of CATEGORY_ORDER) {
      for (const [budget, aesthetic, technical] of COMBOS) {
        const watch = WATCH_RESULTS[cat]?.[budget]?.[aesthetic]?.[technical];
        expect(watch, `${cat}/${budget}/${aesthetic}/${technical}`).toBeDefined();
        for (const key of ['name', 'brand', 'model', 'category', 'personality', 'tagline']) {
          expect(watch[key]).toBeTruthy();
        }
        expect(Object.values(watch.categoryInfo).every(Boolean)).toBe(true);
        expect(watch.axes).toEqual({ budget, aesthetic, technical });
        expect(watch.imageUrl).toMatch(/^\/quiz\/[a-z0-9-]+\.(jpg|jpeg|png|webp|avif)$/);
        count += 1;
      }
    }
    expect(count).toBe(40);
  });

  it('hosts each watch image locally under public/quiz', () => {
    for (const cat of CATEGORY_ORDER) {
      for (const [budget, aesthetic, technical] of COMBOS) {
        const watch = WATCH_RESULTS[cat][budget][aesthetic][technical];
        const filePath = path.join(process.cwd(), 'public', watch.imageUrl.slice(1));
        expect(existsSync(filePath), watch.imageUrl).toBe(true);
      }
    }
  });

  it('returns a defined watch for random answer sets', () => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed / 2147483648;
    };
    for (let i = 0; i < 50000; i += 1) {
      const answers = Object.fromEntries(QUESTION_IDS.map((q) => [q, 1 + Math.floor(rand() * 5)]));
      const result = getQuizResult(answers);
      expect(CATEGORY_ORDER).toContain(result.category);
      expect(result.watch).toBeDefined();
    }
  });

  it.each([
    ['dive', { q2: 5, q3: 5, q6: 5, q9: 5, q10: 5, q8: 1 }],
    ['dress', { q1: 1, q2: 1, q3: 1, q4: 5, q5: 1, q6: 1, q7: 5, q8: 1, q9: 1, q10: 5 }],
    ['chrono', { q1: 5, q3: 5, q5: 5, q8: 5, q10: 5, q2: 1, q6: 1, q7: 1 }],
    ['field', { q1: 5, q2: 5, q3: 5, q4: 5, q6: 5, q7: 5 }],
    ['pilot', { q2: 5, q3: 5, q4: 5, q5: 5, q8: 5, q9: 5, q10: 5, q7: 1 }],
  ])('can reach %s', (category, overrides) => {
    expect(getQuizResult(profile(overrides)).category).toBe(category);
  });

  it('breaks ties in dive, chrono, pilot, field, dress order', () => {
    expect(getQuizResult(profile()).category).toBe('dive');
  });

  it('maps secondary axes at the 3.5 threshold', () => {
    const result = getQuizResult(profile({ q1: 4, q3: 3, q4: 3, q7: 3, q5: 5, q8: 2 }));
    expect(result.budgetAxis).toBe('budget');
    expect(result.aestheticAxis).toBe('modern');
    expect(result.technicalAxis).toBe('enthusiast');
  });

  it('keeps copy free of em dashes and banned phrases', () => {
    const text = JSON.stringify({ QUIZ_QUESTIONS, WATCH_RESULTS });
    expect(text).not.toContain('\u2014');
    expect(text.toLowerCase()).not.toContain("and that's the point");
  });
});
