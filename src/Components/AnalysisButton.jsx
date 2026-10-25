import { ArrowRight, LoaderCircle, Sparkles, CheckCircle2 } from 'lucide-react'

function AnalysisButton({
  resume,
  jobDescription,
  onAnalyze,
  isLoading = false,
}) {
  const hasResume = Boolean(resume?.trim())
  const hasJobDescription = Boolean(jobDescription?.trim())

  const isDisabled = !hasResume || !hasJobDescription || isLoading

  let statusMessage = ''

  if (!hasResume && !hasJobDescription) {
    statusMessage = 'Upload your resume and add a job description to continue.'
  } else if (!hasResume) {
    statusMessage = 'Please upload your resume to continue.'
  } else if (!hasJobDescription) {
    statusMessage = 'Please add the job description to continue.'
  } else {
    statusMessage = 'Everything is ready. Let AI analyze your resume.'
  }

  return (
    <section className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:flex-row sm:items-center sm:p-6">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            hasResume && hasJobDescription
              ? 'bg-violet-100 text-violet-600'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {isLoading ? (
            <LoaderCircle size={22} className="animate-spin" />
          ) : hasResume && hasJobDescription ? (
            <CheckCircle2 size={22} />
          ) : (
            <Sparkles size={22} />
          )}
        </div>

        <div>
          <h3 className="font-bold text-slate-900">
            {isLoading
              ? 'Analyzing your resume...'
              : hasResume && hasJobDescription
                ? 'Ready to discover your strengths?'
                : 'Let’s prepare your analysis'}
          </h3>

          <p
            className="mt-2 text-sm leading-6 text-slate-500"
            aria-live="polite"
          >
            {isLoading
              ? 'AI is comparing your resume with the job description. This may take a little while.'
              : statusMessage}
          </p>

          {!isLoading && hasResume && hasJobDescription && (
            <p className="mt-2 text-xs font-medium text-emerald-600">
              ✓ Resume and job description are ready
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onAnalyze}
        disabled={isDisabled}
        aria-busy={isLoading}
        className="group flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none sm:w-auto"
      >
        {isLoading ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Analyze Resume
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </>
        )}
      </button>
    </section>
  )
}

export default AnalysisButton