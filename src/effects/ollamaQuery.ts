import type { AnswerLLM } from '@/types/answers'

type OllamaAnswerFn = (q: string) => Promise<AnswerLLM>

export const getOllamaAnswer: OllamaAnswerFn = async (
  questionText: string,
) => {
  try {
    console.info('querying ollama...', questionText)
    return {
      text: 'Ollama response at ' + Date.now(),
    }
  } catch (error: unknown) {
    console.error('error fetching answers', error)
    return { text: '' }
  }
}
