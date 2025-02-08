import { type SurveyProps } from '../../types'
import { useState, useEffect} from 'react'
import apiClient from 'client'

enum MODES {
  DEFAULT="Default",
  TAKE="Take",
  EDIT="Edit",
  RESULTS="Results"
}

export const Survey: React.FC<SurveyProps> = ({ id, title, description, question }) => {
  const [mode, setMode] = useState(MODES.DEFAULT)
  const [content, setContent] = useState('')
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    const fetchAnswers = async () => {
      const answers = await apiClient.survey({id: id}).results.get()
      console.log("answers:", answers.data)
      setAnswers(answers.data)
    }

    fetchAnswers()
  },[])

  const postSurvey = async () => {
    if(content) {
      await apiClient.survey({id: id}).results.post({
        content: content
      })
    }
  }

  const deleteSurvey = async () => {
    await apiClient.survey({id: id}).delete()
  }
  
  let modeComponent;
  switch(mode) {
    case MODES.TAKE:
      modeComponent = (
        <div className='flex flex-col gap-2 w-full mb-4'>
          <span className='font-bold'>{question}</span>
          <input required onChange={(e) => setContent(e.target.value)} className='input bg-white w-full border-slate-200' />
        </div>
      )
      break
    case MODES.RESULTS:
      modeComponent = (
        <div className='flex flex-col w-full'>
          <h2 className='text-xl font-bold mb-4'>All responses</h2>
          {answers.map((answer, index) => {
            return (
              <div className='border-t border-slate-300 py-2 flex gap-2'>
                <div className='font-bold'>{`${index + 1}.`}</div>
                {answer.content}
              </div>
            )
          }
          )}
          <div className='mt-4'>
            <button onClick={() => setMode(MODES.DEFAULT)}className='btn'>Back</button>
          </div>
        </div>
      )
      break
  }

  return (
    <div className='p-4 border border-slate-500 rounded-xl flex flex-col gap-1 bg-slate-100 text-black items-start'>
      <div className='w-full'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold'>{title}</h2>
          <span className=''>{description}</span>
        </div>
        {modeComponent}
      </div>
      <div className={`${mode !== MODES.DEFAULT && 'hidden'} flex gap-2`}>
        <button className='btn btn-primary' onClick={() => setMode(MODES.TAKE)}>Take survey</button>
        <button 
          className='btn btn-primary btn-outline' 
          onClick={() => {
            console.log("answers:", answers)
            setMode(MODES.RESULTS)
          }}
        >
          See results
        </button>
        <button className='btn'>Edit</button>
        <button 
          className='btn btn-error btn-outline'
          onClick={() => deleteSurvey()}
        >
          Delete
        </button>
      </div>
      <div className={`${mode !== MODES.TAKE && 'hidden'} flex gap-2 justify-end`}>
        <button 
          className='btn btn-primary' 
          onClick={() => {
            setMode(MODES.DEFAULT)
            postSurvey()
        }}>
          Submit
        </button>
        <button className='btn' onClick={() => setMode(MODES.DEFAULT)}>Cancel</button>
      </div>
    </div>
  )
}