import ReactMarkdown from 'react-markdown'

import { activeConversation } from '../store/conversation'
import { getQuestion } from '../actions/question'
import {
  addAnswerToActiveConversation,
  addQuestionToActiveConversation,
} from '../actions/conversation'
import { sidebarOpen } from '../store/sidebar'
import { getAnswer } from '../actions/answer'

import Sidebar from '@/components/sidebar'
import ChatBubble from '@/components/ChatBubble/chat-bubble'
import Input from '@/components/Input/input'
import type { Answer } from '@/types/answers'
import { createQuestion } from '@/actions/question'
import { setAnswer } from '@/actions/answer'
import { getAnswerFromOllama } from '@/effects/getLLMResponse'
import { toggleSidebar } from '@/store/sidebar'

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
                          ],
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
  const ansPromise: Promise<Answer> = getAnswerFromOllama(text)
  const ans: Answer = await ansPromise
  if (!ans) return
  setAnswer(ans)
  addAnswerToActiveConversation(ans.id)
}

export default MainContent
