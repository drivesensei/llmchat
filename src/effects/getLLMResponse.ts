import { Answer } from '../types/answers'

export const getAnswerFromOllama: (
  q: string,
) => Promise<Answer | null> = async (questionText: string) => {
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
      stream: false,
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

    const j = await r.json()

    const answer: Answer = {
      id: Date.now(),
      text: j?.message?.content ?? 'none',
    }
    console.info({ answer })

    return answer
  } catch (error: unknown) {
    console.error('error fetching answers', error)
    if (error instanceof Error) {
      console.error(error.message, error.name)
    }
    return null
  }
}
