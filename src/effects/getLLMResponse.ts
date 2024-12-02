import { Answer } from '../types/answers'

export const getAnswerFromOllama: (
  q: string,
  onPartialAnswer: (pa: string, done: boolean) => void,
) => Promise<Answer | null> = async (
  questionText: string,
  onPartialAnswer,
) => {
  try {
    console.info('querying...', questionText)

    const body = JSON.stringify({
      model: 'llama3.2',
      messages: [
        {
          role: 'system',
          content: 'you are wizard in any topic',
        },
        {
          role: 'user',
          content: questionText,
        },
      ],
      stream: true,
    })

    const requestOptions = {
      method: 'POST',
      body,
      headers: {
        Accept: 'application/json',
      },
    }

    const r = await fetch(
      'http://localhost:4000/api/chat',
      requestOptions,
    )

    const reader = r.body?.getReader()
    const decoder = new TextDecoder('utf-8')

    if (!reader?.read) return null

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value, { stream: true })
      console.info({ chunk })
      const chunkJSON = JSON.parse(chunk)

      if (!chunk || !chunkJSON?.message?.content) continue
      onPartialAnswer(chunkJSON.message.content as string, done)
    }
  } catch (error: unknown) {
    console.error('error fetching answers', error)
    if (error instanceof Error) {
      console.error(error.message, error.name)
    }
    onPartialAnswer('', true)
  }
}
