import { effect } from '@preact/signals-react';

import type { Question } from '../types/question';
import { questions, activeQuestion } from '../store/question';
import { setToggleAnswerMessage } from './answer';

export const createQuestion = (text: string = '') => {
  const question: Question = {
    id: Date.now(),
    text,
  };

  // question from the input text, UPDATE existing question
  if (text !== '') {
    if (!activeQuestion.value?.id) return;

    question.id = activeQuestion.value?.id;
    const updatedQuestions = questions.value.map((q) => {
      if (q.id === question.id) {
        return {
          id: q.id,
          text: question.text,
        };
      }
      return q;
    });

    questions.value = [...updatedQuestions];
    // question from the sidebar button
  } else {
    questions.value = [...questions.value, question];
  }

  setActiveQuestion(question);
};

export const setActiveQuestion = (question: Question) => {
  activeQuestion.value = question;
  setToggleAnswerMessage(false);
};

effect(() => {
  console.info(questions.value);
});
