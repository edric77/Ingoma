import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { BookOpen, Home, ListOrdered, HelpCircle, Award } from 'lucide-react'
import { LogoWithText } from './components/Logo'
import { cn } from './lib/utils'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import ParcoursPage from './pages/Parcours'
import LessonPage from './pages/Lesson'
import QuizPage from './pages/Quiz'
import CasePage from './pages/Case'
import GlossaryPage from './pages/Glossary'
import RankingPage from './pages/Ranking'
import ProfilePage from './pages/Profile'
import TutorPage from './pages/Tutor'
import CertificatePage from './pages/Certificate'
import { useEffect } from 'react'
import { touchActivity } from './lib/progress'

function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const hideNav = location.pathname === '/login'

  useEffect(() => {
    touchActivity()
  }, [location.pathname])

  return (
    <div className="min-h-svh flex flex-col bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper-light/95 backdrop-blur-sm">
        <div className="mx-auto max-w-lg px-4 h-14 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <LogoWithText />
          </NavLink>
          {!hideNav && (
            <NavLink
              to="/profil"
              className="text-sm text-forest font-medium hover:underline"
            >
              Profil
            </NavLink>
          )}
        </div>
      </header>

      <main className={cn("flex-1 mx-auto w-full max-w-lg px-4 py-6", !hideNav && "pb-28")}>
        {children}
      </main>

      {!hideNav && (
        <nav className="fixed bottom-0 inset-x-0 z-30 border-t border-line bg-paper-light/95 backdrop-blur-sm safe-area-pb">
          <div className="mx-auto max-w-lg flex justify-around py-2 px-2">
            <NavItem to="/" icon={Home} label="Accueil" />
            <NavItem to="/parcours/commande-publique" icon={BookOpen} label="Parcours" />
            <NavItem to="/classement" icon={ListOrdered} label="Classement" />
            <NavItem to="/glossaire" icon={Award} label="Glossaire" />
            <NavItem to="/tuteur" icon={HelpCircle} label="Aide" />
          </div>
        </nav>
      )}
    </div>
  )
}

function NavItem({
  to,
  icon: Icon,
  label,
}: {
  to: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors min-w-[3.5rem]",
          isActive ? "text-forest" : "text-ink-muted hover:text-ink"
        )
      }
    >
      <Icon className="size-5" />
      <span>{label}</span>
    </NavLink>
  )
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/parcours/:slug" element={<ParcoursPage />} />
        <Route path="/lecon/:track/:lesson" element={<LessonPage />} />
        <Route path="/quiz/:track/:lesson" element={<QuizPage />} />
        <Route path="/cas/:track" element={<CasePage />} />
        <Route path="/glossaire" element={<GlossaryPage />} />
        <Route path="/classement" element={<RankingPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/tuteur" element={<TutorPage />} />
        <Route path="/certificat/:slug" element={<CertificatePage />} />
      </Routes>
    </AppShell>
  )
}
