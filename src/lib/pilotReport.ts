import { getProgress } from './progress'
import { TRACKS } from './catalog'

export type PilotReport = {
  v: 1
  id: string
  name: string
  phone: string | null
  institution: string | null
  points: number
  streak: number
  lessonsDone: number
  lessonsTotal: number
  activitiesDone: number
  casesDone: number
  dailyDone: boolean
  badges: string[]
  at: string
}

const BILAN_KEY = 'ingoma-bilan-pilote-v1'

export function buildReportFromProgress(): PilotReport {
  const p = getProgress()
  const lessonsTotal = TRACKS.reduce((n, t) => n + t.lessons.length, 0)
  const lessonsDone = p.completedLessons.length

  return {
    v: 1,
    id: p.displayName?.match(/\d{2}/)?.[0] || 'xx',
    name: p.displayName || 'Invité',
    phone: p.phone,
    institution: p.institution,
    points: p.points,
    streak: p.streak,
    lessonsDone,
    lessonsTotal,
    activitiesDone: p.completedActivities.length,
    casesDone: p.completedCases.length,
    dailyDone: p.completedDailies.length > 0,
    badges: p.badges,
    at: new Date().toISOString(),
  }
}

export function encodeReportLine(r: PilotReport): string {
  return [
    'INGOMA1',
    r.id,
    r.name.replace(/\|/g, '/'),
    String(r.points),
    String(r.streak),
    String(r.lessonsDone),
    String(r.lessonsTotal),
    String(r.activitiesDone),
    String(r.casesDone),
    r.dailyDone ? '1' : '0',
    r.badges.join(','),
    r.at.slice(0, 19),
  ].join('|')
}

export function decodeReportLine(line: string): PilotReport | null {
  const parts = line.trim().split('|')
  if (parts[0] !== 'INGOMA1' || parts.length < 12) return null
  return {
    v: 1,
    id: parts[1],
    name: parts[2],
    phone: null,
    institution: 'Pilote Ingoma',
    points: Number(parts[3]) || 0,
    streak: Number(parts[4]) || 0,
    lessonsDone: Number(parts[5]) || 0,
    lessonsTotal: Number(parts[6]) || 20,
    activitiesDone: Number(parts[7]) || 0,
    casesDone: Number(parts[8]) || 0,
    dailyDone: parts[9] === '1',
    badges: parts[10] ? parts[10].split(',').filter(Boolean) : [],
    at: parts[11] || new Date().toISOString(),
  }
}

export function decodeMany(text: string): PilotReport[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  const out: PilotReport[] = []
  for (const line of lines) {
    if (line.includes('r=')) {
      try {
        const u = new URL(line, 'https://x.local')
        const r = u.searchParams.get('r')
        if (r) {
          const decoded = decodeReportLine(decodeURIComponent(r))
          if (decoded) out.push(decoded)
          continue
        }
      } catch {
        /* fall through */
      }
    }
    const d = decodeReportLine(line)
    if (d) out.push(d)
  }
  return out
}

export function loadBilan(): PilotReport[] {
  try {
    const raw = localStorage.getItem(BILAN_KEY)
    if (!raw) return []
    return JSON.parse(raw) as PilotReport[]
  } catch {
    return []
  }
}

export function saveBilan(reports: PilotReport[]) {
  const map = new Map<string, PilotReport>()
  for (const r of reports) {
    const key = r.name || r.id
    const prev = map.get(key)
    if (!prev || prev.at < r.at) map.set(key, r)
  }
  const list = [...map.values()].sort((a, b) => b.points - a.points)
  localStorage.setItem(BILAN_KEY, JSON.stringify(list))
  return list
}

export function addToBilan(report: PilotReport): PilotReport[] {
  return saveBilan([...loadBilan(), report])
}

export function clearBilan() {
  localStorage.removeItem(BILAN_KEY)
}

export function bilanToCsv(reports: PilotReport[]): string {
  const header =
    'Testeur;Points;Série;Leçons;Activités;Cas;Défi jour;Badges;Horodatage'
  const rows = reports.map((r) =>
    [
      r.name,
      r.points,
      r.streak,
      `${r.lessonsDone}/${r.lessonsTotal}`,
      r.activitiesDone,
      r.casesDone,
      r.dailyDone ? 'Oui' : 'Non',
      r.badges.join(' '),
      r.at,
    ].join(';')
  )
  return [header, ...rows].join('\n')
}

export function statusOf(r: PilotReport): 'ok' | 'partiel' | 'vide' {
  if (r.points === 0 && r.lessonsDone === 0) return 'vide'
  if (r.lessonsDone >= 1 && r.activitiesDone >= 1) return 'ok'
  return 'partiel'
}
