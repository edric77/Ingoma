export type ActivityType =
  | 'mcq'
  | 'truefalse'
  | 'flashcard'
  | 'fillblank'
  | 'order'
  | 'match'
  | 'dragdrop'
  | 'decision'

export type McqItem = {
  type: 'mcq'
  id: string
  question: string
  choices: string[]
  correctIndex: number
  explanation: string
  timedSeconds?: number
}

export type TrueFalseItem = {
  type: 'truefalse'
  id: string
  statement: string
  correct: boolean
  explanation: string
}

export type FlashcardItem = {
  type: 'flashcard'
  id: string
  front: string
  back: string
  distractors?: string[]
}

export type FillBlankItem = {
  type: 'fillblank'
  id: string
  text: string
  answer: string
  alternatives?: string[]
  explanation: string
}

export type OrderItem = {
  type: 'order'
  id: string
  prompt: string
  items: string[]
  correctOrder: number[]
  explanation: string
}

export type MatchItem = {
  type: 'match'
  id: string
  prompt: string
  pairs: { left: string; right: string }[]
  explanation: string
}

export type DragDropItem = {
  type: 'dragdrop'
  id: string
  prompt: string
  items: string[]
  categories: { id: string; label: string; correctItems: string[] }[]
  explanation: string
}

export type DecisionItem = {
  type: 'decision'
  id: string
  scenario: string
  role: string
  choices: { id: string; label: string; consequence: string; correct: boolean }[]
  debrief: string
}

export type ActivityItem =
  | McqItem
  | TrueFalseItem
  | FlashcardItem
  | FillBlankItem
  | OrderItem
  | MatchItem
  | DragDropItem
  | DecisionItem

export type Lesson = {
  id: string
  slug: string
  title: string
  durationMin: number
  content: string[]
  keyPoints: string[]
  activities: ActivityItem[]
}

export type CaseStudy = {
  id: string
  title: string
  scenario: string
  role: string
  questions: { id: string; prompt: string; expectedKeywords: string[] }[]
}

export type Track = {
  slug: string
  title: string
  description: string
  lessons: Lesson[]
  caseStudy: CaseStudy
}

export type DailyChallenge = {
  id: string
  date: string
  title: string
  trackSlug: string
  activity: ActivityItem
  points: number
}
