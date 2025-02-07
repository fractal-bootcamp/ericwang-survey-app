export type SurveyProps = {
    id: string,
    title: string,
    description: string,
    question: string
}

export type SurveyListViewProps = {
    surveys: SurveyProps[]
}

export type SurveyEditModeProps = {
    editing: boolean,
    handleSetEditMode: (bool:boolean) => void
}