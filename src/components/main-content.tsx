import ReactMarkdown from 'react-markdown'

import { activeConversation } from '../store/conversation'
import { getQuestion } from '../actions/question'
import {
  addAnswerToActiveConversation,
  addQuestionToActiveConversation,
} from '../actions/conversation'
import { sidebarOpen } from '../store/sidebar'
import { getAnswer, setStreamedAnswer } from '../actions/answer'
import Sidebar from '../components/sidebar'
import ChatBubble from '../components/ChatBubble/chat-bubble'
import Input from '../components/Input/input'
import type { Answer } from '../types/answers'
import { createQuestion } from '../actions/question'
import { getAnswerFromOllama } from '../effects/getLLMResponse'
import { toggleSidebar } from '../store/sidebar'

const MainContent = () => (
  <div className="flex h-screen overflow-hidden bg-gray-100">
    <Sidebar open={sidebarOpen.value} onToggle={toggleSidebar} />

    <main className="flex-1 overflow-y-auto p-4">
      <Input
        id="question"
        classes="w-full"
        placeholder="Ask a question"
        onTextEnter={onCreateQuestion}
        disabled={!activeConversation.value?.id}
      />

      {activeConversation.value?.questionIds
        ? activeConversation.value.questionIds.map(
            (questionId: number, index: number) => (
              <div key={index} className="my-5">
                <ChatBubble
                  text={getQuestion(questionId)?.text}
                />

                <div className="card bg-base-100 shadow-xl mt-4">
                  <div className="card-body">
                    <ReactMarkdown
                      children={
                        getAnswer(
                          activeConversation.value?.answerIds?.[
                            index
                          ] || 0,
                        )?.text ?? `loading...`
                      }
                    />
                  </div>
                </div>
              </div>
            ),
          )
        : null}
    </main>
  </div>
)

const onCreateQuestion = async (text: string) => {
  const question = createQuestion(text)
  addQuestionToActiveConversation(question.id)

  const an: Answer = {
    id: Date.now(),
    text: '',
  }

  addAnswerToActiveConversation(an.id)

  getAnswerFromOllama(text, setStreamedAnswer(an))
}

export default MainContent
