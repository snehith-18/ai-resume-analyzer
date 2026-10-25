import { Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react'

function Header() {
  return (
    <header className="mb-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        {/* Page title */}
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
            <Sparkles size={14} />
            AI-POWERED CAREER TOOL
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Resume Analyzer
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Compare your resume with a job description, discover relevant
            skills, identify potential gaps, and find ways to strengthen
            your application.
          </p>
        </div>

        {/* Workspace status */}
        <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:self-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Workspace
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full bg-emerald-500"
                aria-hidden="true"
              />

              <span className="text-xs font-medium text-emerald-700">
                Ready to analyze
              </span>
            </div>
          </div>

          <ArrowUpRight
            size={17}
            className="ml-2 text-slate-400"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-7 h-px bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />
    </header>
  )
}

export default Header