import { useRef, useState } from 'react'
import {
  FileText,
  FileUp,
  FileCheck2,
  X,
  AlertCircle,
  ClipboardPaste,
  LoaderCircle,
} from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

function ResumeInput({ resume, setResume }) {
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [isReading, setIsReading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')

  const fileInputRef = useRef(null)

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const handleFileUpload = async (file) => {
    if (!file) return

    setError('')

    const extension = file.name.split('.').pop()?.toLowerCase()
    const isTextFile = extension === 'txt'
    const isPdfFile = extension === 'pdf'

    if (!isTextFile && !isPdfFile) {
      setError('Unsupported file type. Please select a PDF or TXT file.')
      return
    }

    if (file.size === 0) {
      setError('This file is empty. Please select another file.')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5 MB. Please choose a smaller file.')
      return
    }

    setIsReading(true)

    try {
      let extractedText = ''

      if (isTextFile) {
        extractedText = await file.text()
      } else {
        const arrayBuffer = await file.arrayBuffer()

        const pdf = await pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
        }).promise

        const pages = []

        for (
          let pageNumber = 1;
          pageNumber <= pdf.numPages;
          pageNumber++
        ) {
          const page = await pdf.getPage(pageNumber)
          const content = await page.getTextContent()

          const pageText = content.items
            .map((item) => ('str' in item ? item.str : ''))
            .join(' ')

          pages.push(pageText)
        }

        extractedText = pages.join('\n\n')
      }

      if (!extractedText.trim()) {
        setError(
          'No selectable text was found. Scanned PDFs may require OCR.',
        )
        return
      }

      setResume(extractedText)
      setFileName(file.name)
      setFileSize(formatFileSize(file.size))
    } catch (err) {
      console.error('Resume extraction failed:', err)
      setError(
        'Unable to read this file. Please try another PDF or TXT file.',
      )
    } finally {
      setIsReading(false)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const clearResume = () => {
    setResume('')
    setFileName('')
    setFileSize('')
    setError('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)

    if (isReading) return

    const file = event.dataTransfer.files?.[0]

    if (file) {
      handleFileUpload(file)
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">
      {/* Section heading */}
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <FileText size={23} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900">Your Resume</h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Upload your resume or paste its contents below.
          </p>
        </div>

        {resume.trim() && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <FileCheck2 size={14} />
            Ready
          </span>
        )}
      </div>

      {/* Drag-and-drop upload area */}
      <div
        onDragOver={(event) => {
          event.preventDefault()

          if (!isReading) {
            setIsDragging(true)
          }
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsDragging(false)
          }
        }}
        onDrop={handleDrop}
        className={`mt-6 rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 sm:p-8 ${
          isDragging
            ? 'border-violet-500 bg-violet-50'
            : 'border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50/50'
        } ${isReading ? 'pointer-events-none opacity-70' : ''}`}
      >
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
            fileName
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-violet-100 text-violet-600'
          }`}
        >
          {isReading ? (
            <LoaderCircle size={28} className="animate-spin" />
          ) : fileName ? (
            <FileCheck2 size={28} />
          ) : (
            <FileUp size={28} />
          )}
        </div>

        <h4 className="mt-4 font-semibold text-slate-800">
          {isReading
            ? 'Reading your resume...'
            : isDragging
              ? 'Drop your file here'
              : fileName
                ? 'Resume uploaded successfully'
                : 'Drag and drop your resume here'}
        </h4>

        <p className="mt-2 text-sm text-slate-500">
          {isReading
            ? 'Extracting text from your document.'
            : 'PDF or TXT format · Maximum size 5 MB'}
        </p>

        {!isReading && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
          >
            <FileUp size={17} />
            Browse Files
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,application/pdf,text/plain"
          onChange={(event) => {
            const file = event.target.files?.[0]

            if (file) {
              handleFileUpload(file)
            }
          }}
          disabled={isReading}
          className="sr-only"
          aria-label="Upload resume file"
        />
      </div>

      {/* Uploaded file information */}
      {fileName && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600">
            <FileText size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-semibold text-slate-800"
              title={fileName}
            >
              {fileName}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {fileSize} · Text extracted successfully
            </p>
          </div>

          <button
            type="button"
            onClick={clearResume}
            disabled={isReading}
            aria-label="Remove uploaded resume"
            title="Remove resume"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            <X size={19} />
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0 text-red-600"
          />

          <p className="text-sm leading-6 text-red-700">{error}</p>
        </div>
      )}

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Or paste text
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Manual resume input */}
      <div>
        <label
          htmlFor="resume-content"
          className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
        >
          <ClipboardPaste size={17} className="text-slate-400" />
          Resume Content
        </label>

        <textarea
          id="resume-content"
          value={resume}
          onChange={(event) => {
            setResume(event.target.value)
            setFileName('')
            setFileSize('')
            setError('')
          }}
          placeholder="Paste your resume here, including your skills, experience, education, and projects..."
          aria-label="Resume content"
          maxLength={8000}
          className="h-52 w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span
            className={
              resume.length >= 8000
                ? 'font-medium text-amber-600'
                : 'text-slate-500'
            }
          >
            {resume.length.toLocaleString()} / 8,000 characters
          </span>

          <span className="text-slate-400">
            {resume.trim() ? 'Resume content added' : 'No resume content yet'}
          </span>
        </div>
      </div>
    </section>
  )
}

export default ResumeInput