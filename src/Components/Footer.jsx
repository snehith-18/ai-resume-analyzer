
import { Heart, Sparkles } from 'lucide-react'

function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 py-6">
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Sparkles size={16} className="text-violet-600" />
          <span className="font-semibold text-slate-700">ResumeAI</span>
          <span>· AI-powered career insights</span>
        </div>

        <p className="flex items-center gap-1 text-xs text-slate-400">
          Built with <Heart size={13} className="text-rose-500" /> for your career journey
        </p>
      </div>
    </footer>
  )
}

export default Footer
