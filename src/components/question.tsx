import { questions } from '../store/question'
import { setActiveQuestion } from '../actions/question'

import type { Question } from '../types/question'

export default function Questions() {
  return questions.value.map((question: Question) => 
    <div key={question.id}>
      <button className="btn block w-full my-1" key={question.id} onClick={() => setActiveQuestion(question)}>
        {question.text}
      </button>
    </div>
  )
}