import { useState } from 'react'
import {
  CheckCircle2,
  Target,
  TrendingUp,
  AlertCircle,
  Clock,
  RefreshCw,
  Sparkles,
} from 'lucide-react'

import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import ResumeInput from '../Components/ResumeInput'
import JobDescriptionInput from '../Components/JobDescriptionInput'
import AnalysisButton from '../Components/AnalysisButton'
import AnalysisResults from '../Components/AnalysisResults'
import Footer from '../Components/Footer'

function Dashboard() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const handleAnalyze = async () => {
    if (isLoading) return

    if (!resume.trim() || !jobDescription.trim()) {
      setErrorMessage(
        'Please provide both your resume and the job description.',
      )
      return
    }

    setIsLoading(true)
    setAnalysis(null)
    setErrorMessage('')
    setElapsedSeconds(0)

    const startTime = Date.now()

    const timer = setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - startTime) / 1000),
      )
    }, 1000)

    try {
      const response = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume,
          jobDescription,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            data.error ||
              'The AI service has reached its request limit. Please wait before trying again.',
          )
        }

        if (response.status === 503) {
          throw new Error(
            'The AI service is temporarily busy. Please wait a little and try again.',
          )
        }

        if (response.status === 504) {
          throw new Error(
            'The AI analysis took too long. Please check the backend and try again later.',
          )
        }

        throw new Error(
          data.error || `Resume analysis failed (${response.status}).`,
        )
      }

      if (
        typeof data.matchScore !== 'number' ||
        typeof data.summary !== 'string'
      ) {
        throw new Error(
          'The AI returned an unexpected result. Please try again.',
        )
      }

      setAnalysis(data)

      // Bring the results into view after a successful analysis.
      setTimeout(() => {
        document
          .getElementById('analysis-results-heading')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
      }, 100)
    } catch (error) {
      console.error('Resume analysis error:', error)

      setErrorMessage(
        error.message ||
          'Unable to analyze the resume. Please check that the backend is running.',
      )
    } finally {
      clearInterval(timer)
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    if (!isLoading) {
      handleAnalyze()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Sidebar */}
      <div className="md:fixed md:inset-y-0 md:left-0 md:z-10">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:ml-64 lg:p-10">
        <div className="mx-auto max-w-7xl">
          <Header />

          {/* Welcome banner */}
          <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-600 p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-violet-100">
                <Sparkles size={14} />
                AI-POWERED CAREER INSIGHTS
              </div>

              <h2 className="mt-5 max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Turn your resume into an opportunity.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-violet-100 sm:text-base">
                Discover how your experience aligns with your target role.
                Identify relevant skills, understand potential gaps, and
                find practical ways to strengthen your application.
              </p>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={18} />
                  Skill matching
                </span>

                <span className="flex items-center gap-2">
                  <Target size={18} />
                  Role alignment
                </span>

                <span className="flex items-center gap-2">
                  <TrendingUp size={18} />
                  Improvement insights
                </span>
              </div>
            </div>
          </section>

          {/* Form heading */}
          <section className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm">
                <Target size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Analyze your resume
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Provide your resume and target job description to begin.
                </p>
              </div>
            </div>
          </section>

          {/* Input sections */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ResumeInput
              resume={resume}
              setResume={setResume}
            />

            <JobDescriptionInput
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
            />
          </div>

          {/* Analyze button */}
          <div className="mt-6">
            <AnalysisButton
              resume={resume}
              jobDescription={jobDescription}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
          </div>

          {/* Loading feedback */}
          {isLoading && (
            <section
              className="mt-6 overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm"
              role="status"
              aria-live="polite"
            >
              <div className="h-1.5 overflow-hidden bg-violet-100">
                <div className="h-full w-1/3 animate-pulse rounded-full bg-violet-600" />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <RefreshCw
                      size={23}
                      className="animate-spin"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900">
                      Analyzing your resume
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      AI is comparing your resume with the job description
                      and preparing personalized insights.
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700">
                      <Clock size={16} />
                      Elapsed time: {elapsedSeconds} seconds
                    </div>

                    {elapsedSeconds >= 30 && (
                      <p className="mt-3 text-sm leading-6 text-amber-700">
                        The analysis is taking longer than expected.
                        Please keep this page open while the request is
                        processing.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Error feedback */}
          {errorMessage && (
            <section
              className="mt-6 rounded-2xl border border-red-200 bg-white p-5 shadow-sm sm:p-6"
              role="alert"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertCircle size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900">
                    Analysis unsuccessful
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {errorMessage}
                  </p>

                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={isLoading}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <RefreshCw size={16} />
                    Try Again
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Results */}
          <AnalysisResults analysis={analysis} />

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default Dashboard