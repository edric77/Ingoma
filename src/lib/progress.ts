const STORAGE_KEY = "ingoma-progress-v1"

export type ProgressState = {
  completedLessons: string[]
  quizScores: Record<string, number>
  completedCases: string[]
  points: number
  streak: number
  lastActiveDate: string | null
  activityDays: string[]
  phone: string | null
  displayName: string | null
  institution: string | null
  badges: string[]
}

const defaultState: ProgressState = {
  completedLessons: [],
  quizScores: {},
  completedCases: [],
  points: 0,
  streak: 0,
  lastActiveDate: null,
  activityDays: [],
  phone: null,
  displayName: null,
  institution: null,
  badges: [],
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultState }
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return { ...defaultState }
  }
}

function save(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function getProgress(): ProgressState {
  return load()
}

function updateStreakAndDaily(state: ProgressState): ProgressState {
  const t = today()
  if (state.lastActiveDate === t) return state

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yStr = yesterday.toISOString().slice(0, 10)

  let streak = state.streak
  if (state.lastActiveDate === yStr) {
    streak += 1
  } else if (state.lastActiveDate !== t) {
    streak = 1
  }

  const activityDays = state.activityDays.includes(t)
    ? state.activityDays
    : [...state.activityDays, t]

  let points = state.points + 5
  let badges = [...state.badges]

  if (streak >= 3 && !badges.includes("premier-pas")) badges.push("premier-pas")
  if (streak >= 7 && !badges.includes("semaine-solide")) {
    badges.push("semaine-solide")
    points += 50
  }
  if (streak >= 30 && !badges.includes("agent-assidu")) badges.push("agent-assidu")

  return {
    ...state,
    lastActiveDate: t,
    streak,
    activityDays,
    points,
    badges,
  }
}

export function completeLesson(lessonId: string): ProgressState {
  let state = load()
  state = updateStreakAndDaily(state)
  if (!state.completedLessons.includes(lessonId)) {
    state = {
      ...state,
      completedLessons: [...state.completedLessons, lessonId],
      points: state.points + 10,
    }
  }
  save(state)
  return state
}

export function completeQuiz(lessonId: string, scorePercent: number): ProgressState {
  let state = load()
  state = updateStreakAndDaily(state)
  const prev = state.quizScores[lessonId] ?? 0
  if (scorePercent > prev) {
    let add = 0
    if (scorePercent >= 100) add = 25
    else if (scorePercent >= 70) add = 15
    if (prev < 70 && scorePercent >= 70) {
      // full
    } else if (prev < 100 && scorePercent >= 100) {
      add = 10
    } else if (prev >= 70) {
      add = 0
    }
    state = {
      ...state,
      quizScores: { ...state.quizScores, [lessonId]: scorePercent },
      points: state.points + add,
    }
  } else {
    state = {
      ...state,
      quizScores: { ...state.quizScores, [lessonId]: Math.max(prev, scorePercent) },
    }
  }
  save(state)
  return state
}

export function completeCase(caseId: string): ProgressState {
  let state = load()
  state = updateStreakAndDaily(state)
  if (!state.completedCases.includes(caseId)) {
    state = {
      ...state,
      completedCases: [...state.completedCases, caseId],
      points: state.points + 30,
    }
  }
  save(state)
  return state
}

export function setProfile(data: {
  phone?: string
  displayName?: string
  institution?: string
}): ProgressState {
  let state = load()
  state = {
    ...state,
    phone: data.phone ?? state.phone,
    displayName: data.displayName ?? state.displayName,
    institution: data.institution ?? state.institution,
  }
  state = updateStreakAndDaily(state)
  save(state)
  return state
}

export function touchActivity(): ProgressState {
  let state = load()
  state = updateStreakAndDaily(state)
  save(state)
  return state
}

export const BADGE_LABELS: Record<string, string> = {
  "premier-pas": "Premier pas (3 j)",
  "semaine-solide": "Semaine solide (7 j)",
  "agent-assidu": "Agent assidu (30 j)",
}
