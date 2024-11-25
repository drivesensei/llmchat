import { effect } from '@preact/signals-react';

import type { Answer } from '../types/answers';

import { activeQuestion } from '../store/question';
import {
  answers,
  selectedAnswer,
  shouldShowIfAnswerIsCorrect,
} from '../store/answer';

export const setAnswers = (ans: Answer[]) => {
  if (!activeQuestion.value?.id) return;
  const refAnswers = answers.value;
  refAnswers[activeQuestion.value.id] = ans;

  answers.value = {
    ...refAnswers,
  };
};

export const setSelectedAnswer = (a: Answer) => {
  setToggleAnswerMessage(false);
  selectedAnswer.value = a;
};

export const setToggleAnswerMessage = (v: boolean = true) => {
  shouldShowIfAnswerIsCorrect.value = v;
};

effect(() => console.info(answers.value, 'ans'));
