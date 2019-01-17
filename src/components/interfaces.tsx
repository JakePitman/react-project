export interface Question {
    id: number; 
    title: string;
}

export type QuestionData = [Question]

export interface RatingQuestionProps {
  question: {
    id: number;
    title: string;
  },
  deleteQuestion: React.MouseEventHandler<HTMLButtonElement>;
}

export interface RatingQuestionState {
  selectedOption: string;
  updatedQuestionNameInput: string;
  questionTitle: string;
}

export interface RatingQuestionOptionProps {
  questionId: number;
  value: string;
  optionSelected: React.ChangeEventHandler;
}