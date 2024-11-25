import Sidebar from './sidebar';
import ChatBubble from './chat-bubble';
import Answers from './answers';

import type { Answer } from '../types/answers';

import { activeQuestion } from '../store/question';
import { answers } from '../store/answer';

import { createQuestion } from '../actions/question';
import { setAnswers } from '../actions/answer';

import { getAnswers } from '../effects/getLLMResponse';

export default function MainContent() {
  const onCreateQuestion = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const val = target.value.trim();

    if (event.code === 'Enter' && val !== '') {
      createQuestion(val);
      target.value = '';

      getAnswers(val)
        .then((ans: Answer[] | null) => {
          console.info({ ans });
          if (!ans) return;
          setAnswers([...ans]);
        })
        .catch(console.error);
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Main grid layout */}
      <div className="grid lg:grid-cols-[250px,1fr]">
        <Sidebar />

        {/* Main content */}
        <main className="p-4 h-screen scoll-y">
          <div className="flex justify-end mb-4">
            <div className="form-control w-full max-w-xs">
              {/* TODO: Use a debounced function here */}
              <input
                type="text"
                placeholder={
                  activeQuestion.value?.text?.trim()
                    ? activeQuestion.value.text
                    : 'Ask a question'
                }
                className="input input-bordered w-full"
                onKeyUp={onCreateQuestion}
                disabled={!activeQuestion.value}
              />
            </div>
          </div>

          {activeQuestion.value?.text ? (
            <ChatBubble text={activeQuestion.value.text} />
          ) : null}

          {activeQuestion.value?.id &&
          answers.value?.[activeQuestion.value.id] ? (
            <Answers />
          ) : null}
        </main>
      </div>
    </div>
  );
}
