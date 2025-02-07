import { type SurveyProps } from '../../types'

export const Survey: React.FC<SurveyProps> = ({ id, title, description }) => {
  return (
    <div className='p-4 border border-slate-500 rounded-xl flex flex-col gap-1 bg-slate-200 text-black'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <span>{description}</span>
    </div>
  )
}