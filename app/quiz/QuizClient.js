'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { QUIZ_QUESTIONS, SCALE_LABELS, getQuizResult } from '@/lib/quizData';
import ShareResultButton from './quiz-result-card';

const ADVANCE_DELAY_MS = 300;
const CALCULATING_MS = 1500;

const AXES = [
  { key: 'budget', high: 'Budget', low: 'Spend' },
  { key: 'aesthetic', high: 'Vintage', low: 'Modern' },
  { key: 'technical', high: 'Enthusiast', low: 'Just Wear It' },
];

const noopSubscribe = () => () => {};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function CategoryIcon({ category }) {
  return (
    <svg
      className="quiz-category-icon"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {category === 'dress' ? (
        <rect x="7" y="4" width="10" height="16" rx="2" />
      ) : (
        <circle cx="12" cy="12" r="8" />
      )}
      {category === 'dive' && <path d="M12 2.5l1.6 2.5h-3.2z" />}
      {category === 'dress' && <path d="M12 12V8.5M12 12l2 1.5" />}
      {category === 'chrono' && (
        <>
          <circle cx="9" cy="12" r="1.8" />
          <circle cx="15" cy="12" r="1.8" />
          <path d="M9 3.2L8 1.8M15 3.2l1-1.4M20 12h2" />
        </>
      )}
      {category === 'field' && <path d="M12 5.5v2M12 16.5v2M5.5 12h2M16.5 12h2M12 12l2.5-2.5" />}
      {category === 'pilot' && (
        <>
          <path d="M12 6l1.4 2.4h-2.8z" />
          <rect x="20" y="10.5" width="2.5" height="3" rx="0.6" />
          <path d="M12 12v3" />
        </>
      )}
    </svg>
  );
}

function AxisBar({ high, low, score }) {
  const percent = ((score - 1) / 4) * 100;
  const leaning = score >= 3.5 ? high : low;
  return (
    <div className="quiz-axis">
      <div className="quiz-axis-labels">
        <span>{low}</span>
        <span>{high}</span>
      </div>
      <div className="quiz-axis-track" aria-hidden="true">
        <div className="quiz-axis-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="quiz-axis-value">
        Leans {leaning} ({score.toFixed(1)} of 5 toward {high})
      </p>
    </div>
  );
}

export default function QuizClient() {
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [step, setStep] = useState('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const timerRef = useRef(null);
  const pointerRef = useRef(false);
  const shouldFocusRef = useRef(false);
  const introHeadingRef = useRef(null);
  const legendRef = useRef(null);
  const resultHeadingRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  useEffect(() => {
    if (!shouldFocusRef.current) return;
    const target =
      step === 'intro'
        ? introHeadingRef.current
        : step === 'questions'
          ? legendRef.current
          : step === 'result'
            ? resultHeadingRef.current
            : null;
    target?.focus();
  }, [step, index]);

  const question = QUIZ_QUESTIONS[index];
  const currentAnswer = question ? answers[question.id] : undefined;

  function start() {
    shouldFocusRef.current = true;
    setStep('questions');
  }

  function finish(finalAnswers) {
    clearTimer();
    setStep('calculating');
    const computed = getQuizResult(finalAnswers);
    timerRef.current = setTimeout(
      () => {
        timerRef.current = null;
        setResult(computed);
        setStep('result');
      },
      prefersReducedMotion() ? 0 : CALCULATING_MS
    );
  }

  function advance(nextAnswers = answers) {
    clearTimer();
    if (!nextAnswers[QUIZ_QUESTIONS[index].id]) return;
    if (index < QUIZ_QUESTIONS.length - 1) {
      setIndex(index + 1);
    } else {
      finish(nextAnswers);
    }
  }

  function goBack() {
    clearTimer();
    if (index > 0) setIndex(index - 1);
  }

  function handleChange(value) {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    clearTimer();
    if (pointerRef.current) {
      timerRef.current = setTimeout(() => advance(nextAnswers), ADVANCE_DELAY_MS);
    }
  }

  function handleKeyDown(event) {
    pointerRef.current = false;
    if (event.key === 'Enter' && event.target.type === 'radio') {
      event.preventDefault();
      advance();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    advance();
  }

  function retake() {
    clearTimer();
    shouldFocusRef.current = true;
    setAnswers({});
    setIndex(0);
    setResult(null);
    setStep('intro');
  }

  const announcement =
    step === 'result' && result
      ? `Your result: You're ${result.watch.tagline}. ${result.watch.category}, ${result.watch.name}.`
      : step === 'calculating'
        ? 'Matching your personality...'
        : '';

  return (
    <div className="quiz-app">
      <div className="visually-hidden" aria-live="polite" role="status">
        {announcement}
      </div>

      {step === 'intro' && (
        <section className="quiz-panel quiz-intro" aria-labelledby="quiz-title">
          <h1 id="quiz-title" className="quiz-title" ref={introHeadingRef} tabIndex={-1}>
            What Watch Are You?
          </h1>
          <p className="quiz-subhead">10 questions. 60 seconds. 40 possible watches.</p>
          <p className="quiz-explainer">
            Rate each statement from 1 (strongly disagree) to 5 (strongly agree). We&apos;ll match
            your personality to one of five watch categories and recommend your perfect watch.
          </p>
          {hydrated && (
            <button type="button" className="cta-btn cta-primary quiz-start-btn" onClick={start}>
              Take the Quiz
            </button>
          )}
        </section>
      )}

      {step === 'questions' && question && (
        <section className="quiz-panel" aria-labelledby="quiz-kicker">
          <h1 id="quiz-kicker" className="quiz-kicker">
            What Watch Are You?
          </h1>
          <div className="quiz-progress">
            <p className="quiz-progress-label" id="quiz-progress-label">
              Question {index + 1} of {QUIZ_QUESTIONS.length}
            </p>
            <div
              className="quiz-progress-track"
              role="progressbar"
              aria-labelledby="quiz-progress-label"
              aria-valuemin={1}
              aria-valuemax={QUIZ_QUESTIONS.length}
              aria-valuenow={index + 1}
            >
              <div
                className="quiz-progress-fill"
                style={{ width: `${((index + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <form className="quiz-form" onSubmit={handleSubmit} noValidate>
            <fieldset
              key={question.id}
              className="quiz-question"
              onPointerDown={() => {
                pointerRef.current = true;
              }}
              onKeyDown={handleKeyDown}
            >
              <legend className="quiz-statement" ref={legendRef} tabIndex={-1}>
                {question.statement}
              </legend>
              <div className="quiz-scale">
                {SCALE_LABELS.map(({ value, label }) => (
                  <label key={value} className="quiz-chip">
                    <input
                      type="radio"
                      className="quiz-chip-input"
                      name={question.id}
                      value={value}
                      checked={currentAnswer === value}
                      onChange={() => handleChange(value)}
                    />
                    <span className="quiz-chip-number" aria-hidden="true">
                      {value}
                    </span>
                    <span className="quiz-chip-label">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="quiz-nav">
              <button
                type="button"
                className="quiz-btn quiz-btn-secondary"
                onClick={goBack}
                disabled={index === 0}
              >
                Back
              </button>
              <button type="submit" className="quiz-btn quiz-btn-primary" disabled={!currentAnswer}>
                {index === QUIZ_QUESTIONS.length - 1 ? 'See My Result' : 'Next'}
              </button>
            </div>
          </form>
        </section>
      )}

      {step === 'calculating' && (
        <section className="quiz-panel quiz-calculating" aria-label="Calculating your result">
          <div className="quiz-spinner" aria-hidden="true" />
          <p className="quiz-calculating-text">Matching your personality...</p>
        </section>
      )}

      {step === 'result' && result && (
        <section className="quiz-panel quiz-result" aria-labelledby="quiz-result-heading">
          <p className="quiz-kicker">What Watch Are You?</p>
          <h2
            id="quiz-result-heading"
            className="quiz-result-tagline"
            ref={resultHeadingRef}
            tabIndex={-1}
          >
            You&apos;re {result.watch.tagline}
          </h2>

          <p className="quiz-result-category">
            <CategoryIcon category={result.category} />
            {result.watch.category}
          </p>

          {result.watch.imageUrl ? (
            <figure className="quiz-result-photo">
              <Image
                src={result.watch.imageUrl}
                alt={`${result.watch.brand} ${result.watch.model}`}
                width={480}
                height={480}
                sizes="(max-width: 600px) 70vw, 280px"
              />
            </figure>
          ) : null}

          <div className="quiz-result-watch">
            <p className="quiz-result-watch-name">{result.watch.name}</p>
            <p className="quiz-result-watch-brand">
              {result.watch.brand} {result.watch.model}
            </p>
          </div>

          <p className="quiz-result-personality">{result.watch.personality}</p>

          <dl className="quiz-category-info">
            <div>
              <dt>Defining Feature</dt>
              <dd>{result.watch.categoryInfo.definingFeature}</dd>
            </div>
            <div>
              <dt>Original Purpose</dt>
              <dd>{result.watch.categoryInfo.originalPurpose}</dd>
            </div>
            <div>
              <dt>Best Worn With</dt>
              <dd>{result.watch.categoryInfo.bestWornWith}</dd>
            </div>
          </dl>

          <div className="quiz-axes">
            <h3 className="quiz-axes-heading">Your Scores</h3>
            {AXES.map((axis) => (
              <AxisBar key={axis.key} high={axis.high} low={axis.low} score={result.scores[axis.key]} />
            ))}
          </div>

          <div className="quiz-result-actions">
            <ShareResultButton result={result} />
            <button type="button" className="quiz-btn quiz-btn-secondary" onClick={retake}>
              Retake Quiz
            </button>
          </div>

          <div className="quiz-result-links">
            <Link href="/collection" className="quiz-link">
              Explore the Collection
            </Link>
            <Link href="/glossary" className="quiz-link">
              Learn the Lingo
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
