import * as React from 'react'

interface RatingQuestionOptionProps {
  questionId: number;
  value: string;
  optionSelected: React.ChangeEventHandler
}

const  RatingQuestionOption = (props: RatingQuestionOptionProps) => {
  // const optionSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    // props.optionSelected(event.target.value)
  // }

  return(
    <div>
      <input type="radio" name={props.questionId.toString()} value={props.value} onChange={props.optionSelected}/>
          {props.value}
    </div>
  )
 
}

export default RatingQuestionOption
