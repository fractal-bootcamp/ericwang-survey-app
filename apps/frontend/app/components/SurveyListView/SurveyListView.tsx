import { useState } from 'react';
import { Survey } from '../survey/survey';
import { CREATE_EDIT_MODES } from '~/types';
import { type SurveyListViewProps } from '~/types';
import { SurveyEditMode } from '../SurveyEditMode/SurveyEditMode';

export const SurveyListView: React.FC<SurveyListViewProps> = ({ surveys }) => {
  const [editMode, setEditMode] = useState(CREATE_EDIT_MODES.DEFAULT)

  const handleSetEditMode = ( mode:CREATE_EDIT_MODES ) => {
    setEditMode(mode)
  }
  
  return (
    <main className="flex flex-col pt-16 pb-4 max-w-[600px] mx-auto">
      <div className='mb-8 w-full'>
        <h1 className="text-6xl font-semibold">Survey App</h1>
      </div>
      <button onClick={() => setEditMode(CREATE_EDIT_MODES.CREATE)} className={`${editMode === CREATE_EDIT_MODES.CREATE && 'hidden'} btn btn-primary w-full mb-8`}>
          New Survey +
      </button>
      <SurveyEditMode editing={editMode} handleSetEditMode={handleSetEditMode} />
      <div className='flex flex-col gap-4'>
        <h2 className='text-3xl font-bold'>All surveys</h2>
        {surveys.map((survey) => {
            return <Survey id={survey.id} title={survey.title} description={survey.description} question={survey.question} />
        })}
      </div>
    </main>
  );
}
