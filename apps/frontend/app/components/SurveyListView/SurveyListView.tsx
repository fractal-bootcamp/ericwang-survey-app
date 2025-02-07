import { Survey } from '../survey/survey';
import { type SurveyListViewProps } from '~/types';

export const SurveyListView: React.FC<SurveyListViewProps> = ({ surveys }) => {
  return (
    <main className="flex flex-col pt-16 pb-4 max-w-[600px] mx-auto">
      <h1 className="text-6xl font-semibold mb-8">Survey App</h1>
      <div className='flex flex-col gap-4'>
        {surveys.map((survey) => <Survey id={survey.id} title={survey.title} description={survey.description} />)}
      </div>
    </main>
  );
}
