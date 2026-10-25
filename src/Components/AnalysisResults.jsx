import {
  CheckCircle2,
  Target,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Lightbulb,
  ShieldCheck,
  Award,
  ArrowUpRight,
} from 'lucide-react'

function AnalysisResults({ analysis }) {
  if (!analysis) return null

  const matchedSkills = Array.isArray(analysis.matchedSkills)
    ? analysis.matchedSkills
    : []

  const missingSkills = Array.isArray(analysis.missingSkills)
    ? analysis.missingSkills
    : []

  const strengths = Array.isArray(analysis.strengths)
    ? analysis.strengths
    : []

  const suggestions = Array.isArray(analysis.suggestions)
    ? analysis.suggestions
    : []

  const matchScore = Math.min(
    100,
    Math.max(0, Number(analysis.matchScore) || 0),
  )

  const scoreLabel =
    matchScore >= 80
      ? 'Strong match'
      : matchScore >= 60
        ? 'Good potential'
        : matchScore >= 40
          ? 'Room to improve'
          : 'Needs improvement'

  const scoreColor =
    matchScore >= 80
      ? 'text-emerald-600'
      : matchScore >= 60
        ? 'text-violet-600'
        : matchScore >= 40
          ? 'text-amber-600'
          : 'text-rose-600'

  const scoreBackground =
    matchScore >= 80
      ? 'bg-emerald-500'
      : matchScore >= 60
        ? 'bg-violet-600'
        : matchScore >= 40
          ? 'bg-amber-500'
          : 'bg-rose-500'

  return (
    <section
      aria-labelledby="analysis-results-heading"
      className="mt-8 space-y-6"
    >
      {/* Header */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <Sparkles size={25} />
              </div>

              <div>
                <h2
                  id="analysis-results-heading"
                  className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
                >
                  Resume Analysis
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  AI-powered insights for your target role
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700">
              <Sparkles size={14} />
              Powered by Gemini AI
            </div>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3">
          {/* Match score */}
          <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                <Target size={22} />
              </div>

              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                Estimated
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-600">
              Resume Match Score
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-4xl font-bold tracking-tight ${scoreColor}`}>
                {matchScore}%
              </span>
            </div>

            <p className={`mt-1 text-sm font-semibold ${scoreColor}`}>
              {scoreLabel}
            </p>

            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-violet-100"
              role="progressbar"
              aria-label="Estimated resume match score"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={matchScore}
            >
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${scoreBackground}`}
                style={{ width: `${matchScore}%` }}
              />
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Estimated alignment with the job description.
            </p>
          </div>

          {/* Matched skills */}
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                <CheckCircle2 size={22} />
              </div>

              <span className="text-xs font-medium text-emerald-700">
                Identified
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-600">
              Matching Skills
            </p>

            <p className="mt-1 text-4xl font-bold tracking-tight text-emerald-700">
              {matchedSkills.length}
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              Relevant skills found in your resume.
            </p>
          </div>

          {/* Missing skills */}
          <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                <TrendingUp size={22} />
              </div>

              <span className="text-xs font-medium text-amber-700">
                Improvement areas
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-600">
              Skills to Develop
            </p>

            <p className="mt-1 text-4xl font-bold tracking-tight text-amber-700">
              {missingSkills.length}
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              Skills to review for your target role.
            </p>
          </div>
        </div>
      </div>

      {/* Overall assessment */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Award size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-slate-900">
              Overall Assessment
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {analysis.summary || 'No overall assessment was provided.'}
            </p>
          </div>
        </div>
      </div>

      {/* Skills sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Matching skills */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Matching Skills
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Skills identified in your resume
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700">
              {matchedSkills.length}
            </span>
          </div>

          {matchedSkills.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {matchedSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-sm font-medium text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <CheckCircle2 size={15} className="shrink-0" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">
              No matching skills were identified in this analysis.
            </p>
          )}
        </div>

        {/* Missing skills */}
        <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <AlertCircle size={21} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Skills to Develop
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Potential gaps to review
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700">
              {missingSkills.length}
            </span>
          </div>

          {missingSkills.length > 0 ? (
            <ul className="mt-5 space-y-3">
              {missingSkills.map((skill, index) => (
                <li
                  key={`${skill}-${index}`}
                  className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/50 p-3 transition hover:bg-amber-50"
                >
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />

                  <span className="text-sm leading-6 text-slate-700">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">
              No missing skills were identified by this analysis.
            </p>
          )}
        </div>
      </div>

      {/* Strengths */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Resume Strengths
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Highlights worth emphasizing in your application.
            </p>
          </div>
        </div>

        {strengths.length > 0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {strengths.map((strength, index) => (
              <div
                key={`${strength}-${index}`}
                className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 transition duration-200 hover:border-emerald-200 hover:bg-emerald-50/30"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-sm leading-6 text-slate-700">
                  {strength}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-5 text-sm text-slate-500">
            No strengths were provided.
          </p>
        )}
      </div>

      {/* Improvement suggestions */}
      <div className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Lightbulb size={22} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Improvement Suggestions
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Actionable recommendations to improve your resume.
            </p>
          </div>
        </div>

        {suggestions.length > 0 ? (
          <ol className="mt-5 space-y-3">
            {suggestions.map((suggestion, index) => (
              <li
                key={`${suggestion}-${index}`}
                className="group flex items-start gap-3 rounded-xl border border-slate-200 p-4 transition duration-200 hover:border-violet-200 hover:bg-violet-50/40"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700 transition group-hover:bg-violet-600 group-hover:text-white">
                  {index + 1}
                </span>

                <p className="flex-1 pt-1 text-sm leading-6 text-slate-700">
                  {suggestion}
                </p>

                <ArrowUpRight
                  size={17}
                  className="mt-1 shrink-0 text-slate-400 transition group-hover:text-violet-600"
                />
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-5 text-sm text-slate-500">
            No improvement suggestions were provided.
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50/70 p-4 sm:p-5">
        <Sparkles size={20} className="mt-0.5 shrink-0 text-violet-600" />

        <div>
          <h3 className="text-sm font-semibold text-violet-950">
            A note about AI-generated results
          </h3>

          <p className="mt-1 text-sm leading-6 text-violet-900/80">
            This analysis is intended to support your job application.
            The match score is an estimate, not a guarantee of hiring
            success. Review the recommendations carefully and ensure
            your resume accurately reflects your qualifications.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AnalysisResults