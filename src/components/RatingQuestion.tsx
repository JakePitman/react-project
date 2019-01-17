import * as React from 'react'
import RatingQuestionOption from './RatingQuestionOption'
import axios from 'axios'
import styled from 'styled-components'
import {
  RatingQuestionProps,
  RatingQuestionState
} from './interfaces'

const QuestionContainer = styled.div`
  display: flex;
  margin: 20px;
  height: 200px;
`

const QuestionColumn = styled.div`
  background: #517ec6;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px 0px 0px 5px;
`

const AnswersColumn = styled.div`
  width: 500px;
  border: 10px solid #517ec6;
  display: flex;
  justify-content: space-around;
  background: white;
  align-items: center;
  border-radius: 0px 5px 5px 0px;
`

const ChangeTitleContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
`

const ChangeTitleInput = styled.input`
  height: 30px;
  margin-bottom: 5px;
  font-size: 15px;
  border-radius: 5px;
`
const UpdateButton = styled.button`
  height: 30px;
  font-size: 15px;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
  border: 1px solid #517ec6;

  :hover {
    background: #517ec6;
    color: white;
    border: 1px solid white;
  }
`

const DeleteButton = styled.button`
  width: 95%;
  margin: 10px;
  height: 30px;
  font-size: 15px;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
  border: 1px solid #517ec6;

  :hover {
    background: #517ec6;
    color: white;
    border: 1px solid white;
  }
`

const QuestionTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 20px;
  color: white;
`

const SelectionIndicator = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 30px;
  width: 50%;
`

const OptionsContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  border-right: 1px solid #517ec6;
`

class RatingQuestion extends React.Component<RatingQuestionProps, RatingQuestionState> {

  state = {
    selectedOption: 'Nothing selected',
    updatedQuestionNameInput: '',
    questionTitle: this.props.question.title
  }

  ratingQuestionsUrl = 'http://localhost:3001/ratingQuestions'

  questionData = {...this.props.question}

  optionSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({selectedOption: e.target.value})
  }

  updateQuestionNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState ({ updatedQuestionNameInput: e.target.value })
  }

  updateQuestionName = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(this.state.updatedQuestionNameInput){
      axios.put(
        `${this.ratingQuestionsUrl}/${this.questionData.id}`,
        { title: this.state.updatedQuestionNameInput }
      )
        .then( res => {
          // const targetElement: any = document.getElementById(`update-question-title-${this.questionData.id}`)
          // targetElement.value = null
          // const updatedQuestionNameInput: any = this.state.updatedQuestionNameInput
          // this.setState({questionTitle: updatedQuestionNameInput})
          this.setState({
            questionTitle: this.state.updatedQuestionNameInput,
            updatedQuestionNameInput: ''
          })
        } )
        .catch( err => {
          console.log(err)
        })
    }else{
      alert('Please enter something first!')
    }

  }

  questionValues = [
    'strongly-disagree',
    'disagree',
    'neutral',
    'agree',
    'strongly-agree'
  ]

  optionColors: any = { 
    'strongly-disagree': '#d31d3b',
    'disagree': '#ea7b04',
    'neutral': '#f2da00',
    'agree': '#b9f100',
    'strongly-agree': '#3dce04'
  }

  renderQuestionOptions = () => {
    return this.questionValues.map((questionValue, i) => {
      return (
        <RatingQuestionOption key={questionValue} questionId={this.questionData.id}  value={questionValue} optionSelected={this.optionSelected} />
      )
    })
  }

  render(){
    return(
      <QuestionContainer>
        <QuestionColumn>
          <QuestionTitle>"{this.state.questionTitle}"</QuestionTitle>
          <ChangeTitleContainer>
            <ChangeTitleInput type='text' value={this.state.updatedQuestionNameInput} placeholder='change title' onChange={this.updateQuestionNameInput}/>
            <UpdateButton onClick={this.updateQuestionName}>Update</UpdateButton>
          </ChangeTitleContainer>
          <DeleteButton data-question-id={this.questionData.id} onClick={this.props.deleteQuestion}>Delete Question</DeleteButton>
        </QuestionColumn>
        <AnswersColumn>
          <OptionsContainer>
            {this.renderQuestionOptions()}
          </OptionsContainer>
          <SelectionIndicator style={{color: this.optionColors[this.state.selectedOption]}}> {this.state.selectedOption} </SelectionIndicator>
        </AnswersColumn>
      </QuestionContainer>
    )
  }

}

export default RatingQuestion
