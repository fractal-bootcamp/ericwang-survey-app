import { type SurveyProps } from '../../types'
import { useState } from 'react'
import apiClient from 'client'

export const Survey: React.FC<SurveyProps> = ({ id, title, description, question }) => {
  const [takeMode, setTakeMode] = useState(false)
  const [content, setContent] = useState('')

  const postSurvey = () => {
    console.log('content')
    if(content) {
      apiClient.survey({id: id}).results.post({
        content: content
      })
    }
  }

  return (
    <div className='p-4 border border-slate-500 rounded-xl flex flex-col gap-1 bg-slate-100 text-black items-start'>
      <div className='w-full'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold'>{title}</h2>
          <span className=''>{description}</span>
        </div>
        {takeMode && 
          <div className='flex flex-col gap-2 w-full mb-4'>
            <span className='font-bold'>{question}</span>
            <input required onChange={(e) => setContent(e.target.value)} className='input bg-white w-full border-slate-200' />
          </div>}
      </div>
      <div className={`${takeMode && 'hidden'} flex gap-2`}>
        <button className='btn btn-primary' onClick={() => setTakeMode(true)}>Take survey</button>
        <button className='btn btn-primary btn-outline' onClick={() => setTakeMode(true)}>See results</button>
        <button className='btn'>Edit</button>
        <button className='btn btn-error btn-outline'>Delete</button>
      </div>
      <div className={`${!takeMode && 'hidden'} flex gap-2 justify-end`}>
        <button 
          className='btn btn-primary' 
          onClick={() => {
            setTakeMode(false)
            postSurvey()
        }}>
          Submit
        </button>
        <button className='btn' onClick={() => setTakeMode(false)}>Cancel</button>
      </div>
    </div>
  )
}