import {
  LayoutDashboard,
  FileText,
  ChartNoAxesColumn,
  Settings,
  Sparkles,
  ChevronRight,
  Lightbulb,
} from 'lucide-react'

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Resume Analysis', icon: FileText, active: false },
  { label: 'Skills Report', icon: ChartNoAxesColumn, active: false },
  { label: 'Settings', icon: Settings, active: false },
]

function Sidebar() {
  return (
    <aside className="flex min-h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-5">
      {/* Logo */}
      <div className="flex items-center gap-3 px-1">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-200">
          <Sparkles size={23} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Resume<span className="text-violet-600">AI</span>
          </h1>

          <p className="mt-0.5 text-xs text-slate-500">
            Your career companion
          </p>
        </div>
      </div>

      {/* Workspace badge */}
      <div className="mt-7 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
          <LayoutDashboard size={19} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">
            Career Workspace
          </p>

          <p className="mt-0.5 text-xs text-slate-500">
            AI-powered tools
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8" aria-label="Main navigation">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <div className="space-y-1.5">
          {navigation.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              type="button"
              aria-current={active ? 'page' : undefined}
              title={
                active
                  ? label
                  : `${label} navigation is not available yet`
              }
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition duration-200 ${
                active
                  ? 'bg-violet-50 text-violet-700 ring-1 ring-violet-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon
                size={19}
                className={`shrink-0 ${
                  active
                    ? 'text-violet-600'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />

              <span className="flex-1">{label}</span>

              {active && (
                <ChevronRight
                  size={16}
                  className="text-violet-500"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Career tip */}
      <div className="mt-8 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
          <Lightbulb size={20} />
        </div>

        <h2 className="mt-4 text-sm font-bold text-slate-900">
          A little career advice
        </h2>

        <p className="mt-2 text-xs leading-6 text-slate-600">
          Highlight relevant projects and measurable achievements to make
          your resume more impactful.
        </p>
      </div>

      {/* Bottom section */}
      <div className="mt-auto hidden border-t border-slate-100 pt-5 md:block">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <Sparkles size={16} />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-700">
              ResumeAI
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Your next opportunity starts here.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar