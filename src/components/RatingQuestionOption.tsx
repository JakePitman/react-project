import * as React from 'react'
import styled from 'styled-components'
import { RatingQuestionOptionProps} from './interfaces'

const OptionContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OptionInput = styled.input`
  font-size: 100px;
  cursor: pointer;
`

const OptionValue = styled.p`
  text-align: left;
  width: 70%;
`

const  RatingQuestionOption = (props: RatingQuestionOptionProps) => {
  // const optionSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    // props.optionSelected(event.target.value)
  // }

  return(
    <OptionContainer>
      <OptionInput type="radio" name={props.questionId.toString()} value={props.value} onChange={props.optionSelected}/>
      <OptionValue>{props.value}</OptionValue>
    </OptionContainer>
  )
 
}

export default RatingQuestionOption