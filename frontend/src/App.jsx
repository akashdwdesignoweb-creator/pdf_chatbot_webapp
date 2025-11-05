import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleAsk = async () => {
    if (!question.trim()) return
    setLoading(true)
    try {
      const res = await axios.post(`${backendUrl}/ask`, { question })
      setAnswer(res.data.answer)
    } catch (err) {
      setAnswer('Error connecting to server.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">📘 PDF Chatbot</h1>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
          rows="3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the book..."
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
        {answer && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <strong>Answer:</strong>
            <p className="mt-2 text-gray-800 whitespace-pre-line">{answer}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
