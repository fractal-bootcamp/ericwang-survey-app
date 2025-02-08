export type SurveyProps = {
    id: string,
    title: string,
    description: string,
    question: string,
}

export type SurveyListViewProps = {
    surveys: SurveyProps[]
}

export type SurveyEditModeProps = {
    editing: string,
    handleSetEditMode: (mode:strings) => void
}

export enum CREATE_EDIT_MODES {
    DEFAULT="Default",
    CREATE="Create",
    EDIT="Edit"
  }