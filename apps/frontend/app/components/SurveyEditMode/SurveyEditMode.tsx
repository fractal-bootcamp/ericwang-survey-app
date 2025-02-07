import { type SurveyEditModeProps } from '../../types'
import { useState } from 'react'
import apiClient from 'client'


export const SurveyEditMode: React.FC<SurveyEditModeProps> = ({ editing, handleSetEditMode }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [question, setQuestion] = useState('')
  
  const handleSurveyPost = () => {
    apiClient.surveys.post({
      title: title,
      description: description,
      question: question
    })
    console.log('success')
  }

  return (
    <div className={`${!editing && 'hidden'} p-4 border border-slate-500 rounded-xl flex flex-col gap-4 bg-slate-100 text-black mb-8`}>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-bold'>Title</h2>
        <input 
          type="text" 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Give your survey a title" 
          className="input bg-white w-full border-slate-200"
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-bold'>Description</h2>
        <textarea 
          onChange={(e) => setDescription(e.target.value)} 
          className="textarea bg-white w-full border-slate-200" 
          placeholder="Write a short description" />
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-xl font-bold'>Question</h2>
        <input 
          type="text" 
          onChange={(e) => setQuestion(e.target.value)} 
          placeholder="Add a survey question" 
          className="input bg-white w-full border-slate-200" 
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <button 
          onClick={() => {
            handleSetEditMode(false)
            handleSurveyPost()
          }} 
          className='btn btn-primary grow'
        >
          Create Survey
        </button>
        <button 
          onClick={() => {
            handleSetEditMode(false)
          }} 
          className='btn grow'
        >
          Cancel
        </button>
      </div>
      
    </div>
  )
}