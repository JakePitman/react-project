import * as React from 'react'
import RatingQuestionOption from './RatingQuestionOption'
import axios from 'axios'


interface RatingQuestionProps {
  question: {
    id: number;
    title: string;
  },
  deleteQuestion: React.MouseEventHandler<HTMLButtonElement>;
}

interface RatingQuestionState {
  selectedOption: string;
  updatedQuestionNameInput: string | null;
  questionTitle: string;
}


class RatingQuestion extends React.Component<RatingQuestionProps, RatingQuestionState> {

  state = {
    selectedOption: 'Nothing selected',
    updatedQuestionNameInput: null,
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
          const targetElement: any = document.getElementById(`update-question-title-${this.questionData.id}`)
          targetElement.value = null
          const updatedQuestionNameInput: any = this.state.updatedQuestionNameInput
          this.setState({questionTitle: updatedQuestionNameInput})
        } )
        .catch( err => {
          console.log(err)
        })
    }else{
      alert('Please enter something first!')
    }

  }

  render(){
    return(
      <div>
        <h1>{this.state.questionTitle}</h1>
        <input type='text' id={`update-question-title-${this.questionData.id}`} placeholder='change title' onChange={this.updateQuestionNameInput}/>
        <button onClick={this.updateQuestionName}>Update</button>

        <h2>{this.state.selectedOption}</h2>
        <RatingQuestionOption questionId={this.questionData.id}  value='strongly-disagree' optionSelected={this.optionSelected} />
        <RatingQuestionOption questionId={this.questionData.id}  value='disagree' optionSelected={this.optionSelected} />
        <RatingQuestionOption questionId={this.questionData.id}  value='neutral' optionSelected={this.optionSelected} />
        <RatingQuestionOption questionId={this.questionData.id}  value='agree' optionSelected={this.optionSelected} />
        <RatingQuestionOption questionId={this.questionData.id}  value='strongly-agree' optionSelected={this.optionSelected} />
        
        <button data-question-id={this.questionData.id} onClick={this.props.deleteQuestion}>Delete Question</button>
      <hr/>
      </div>
    )
  }

}

export default RatingQuestion
