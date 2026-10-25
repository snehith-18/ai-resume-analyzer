import {
  BriefcaseBusiness,
  ClipboardList,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react'

const MAX_CHARACTERS = 4000

function JobDescriptionInput({ jobDescription, setJobDescription }) {
  const isReady = Boolean(jobDescription.trim())
  const isNearLimit = jobDescription.length >= MAX_CHARACTERS * 0.9
  const isAtLimit = jobDescription.length >= MAX_CHARACTERS

  const handleChange = (event) => {
    setJobDescription(event.target.value.slice(0, MAX_CHARACTERS))
  }

  const clearDescription = () => {
    setJobDescription('')
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <BriefcaseBusiness size={23} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900">
            Job Description
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Add the job requirements so AI can compare them with your resume.
          </p>
        </div>

        {isReady && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 size={14} />
            Ready
          </span>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4">
        <ClipboardList
          size={19}
          className="mt-0.5 shrink-0 text-indigo-600"
        />

        <div>
          <p className="text-sm font-semibold text-indigo-900">
            What should you include?
          </p>

          <p className="mt-1 text-sm leading-6 text-indigo-800">
            Include the job title, required technical skills, qualifications,
            responsibilities, and preferred experience.
          </p>
        </div>
      </div>

      {/* Text area heading */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <label
          htmlFor="job-description"
          className="flex items-center gap-2 text-sm font-semibold text-slate-700"
        >
          <FileText size={17} className="text-slate-400" />
          Job Requirements
        </label>

        {isReady && (
          <button
            type="button"
            onClick={clearDescription}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <X size={14} />
            Clear text
          </button>
        )}
      </div>

      {/* Input */}
      <textarea
        id="job-description"
        value={jobDescription}
        onChange={handleChange}
        placeholder={`Paste the complete job description here...

Example:
Job Title: Frontend Developer

Required Skills:
• React.js and JavaScript
• HTML and CSS
• REST API integration
• Git and GitHub

Responsibilities:
• Build responsive web applications
• Integrate frontend components with APIs
• Debug and improve application performance`}
        aria-label="Job description"
        aria-describedby="job-description-help job-description-count"
        maxLength={MAX_CHARACTERS}
        className="mt-3 h-64 w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />

      {/* Helper text */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p
          id="job-description-help"
          className="text-xs leading-5 text-slate-500"
        >
          {isReady
            ? 'Job requirements added successfully.'
            : 'Paste the job description provided by the employer.'}
        </p>

        <span
          id="job-description-count"
          aria-live="polite"
          className={`text-xs font-medium ${
            isNearLimit ? 'text-amber-600' : 'text-slate-400'
          }`}
        >
          {jobDescription.length.toLocaleString()} /{' '}
          {MAX_CHARACTERS.toLocaleString()} characters
        </span>
      </div>

      {/* Limit feedback */}
      {isAtLimit && (
        <p className="mt-3 text-xs leading-5 text-amber-700">
          You've reached the 4,000-character limit.
        </p>
      )}
    </section>
  )
}

export default JobDescriptionInput