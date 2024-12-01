import type { Answer } from '@/types/answers'
import {
  setSelectedAnswer,
  setToggleAnswerMessage,
} from '@/actions/answer'
import {
  answers,
  selectedAnswer,
  shouldShowIfAnswerIsCorrect,
} from '@/store/answer'
import { activeQuestion } from '@/store/question'

export default function Answers() {
  const activeAnwers =
    answers.value[activeQuestion.value?.id || 0] || []

  return (
    <div className="card bg-base-100 shadow-xl mt-4">
      <div className="card-body">
        <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
          {/* Column 1: Radio buttons */}
          <div className="space-y-3">
            {activeAnwers.map(
              (answer: Answer, index: number) => (
                <div key={index} className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="radio"
                      name="answer"
                      className="radio radio-primary"
                      value={answer.text}
                      onClick={() => setSelectedAnswer(answer)}
                    />
                    <span className="label-text">
                      {answer.text}
                    </span>
                  </label>
                </div>
              ),
            )}
          </div>

          {/* Column 2: Send button */}
          <div>
            <button
              className="btn btn-primary"
              onClick={() => setToggleAnswerMessage(true)}
            >
              Send
            </button>
            {shouldShowIfAnswerIsCorrect.value ? (
              <div>
                {selectedAnswer.value?.isCorrect
                  ? 'Correct answer'
                  : 'Wrong answer'}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
