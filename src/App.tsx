import * as React from 'react'
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import styled from 'styled-components';
import RatingQuestion from './components/RatingQuestion'
import NewQuestionForm from './components/NewQuestionForm'
import {
  Question,
  QuestionData
} from './components/interfaces'


const AppContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
`

class App extends React.Component {
  state = {
    name: 'React',
    ratingQuestionData: null,
    newQuestionTitle: null
  }

  

  ratingQuestionsUrl = 'http://localhost:3001/ratingQuestions'


  componentDidMount() {
    axios.get('/ratingQuestions', { baseURL: 'http://localhost:3001' })
    .then(({data}) => {
      this.setState({ratingQuestionData: data})
    })
  }

  //------------NEW FORM FUNCTIONS----------------------
  updateNewQuestionTitleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({newQuestionTitle: e.target.value})
  }

  sendNewQuestionTitleData = (e: React.FormEvent<HTMLButtonElement>) => {
    if(this.state.newQuestionTitle) {
      axios.post(this.ratingQuestionsUrl, { 
        title: this.state.newQuestionTitle
      })
        .then(res => {
          const data: any = this.state.ratingQuestionData
          const updatedQuestionData = data.concat(res.data)
          this.setState({ratingQuestionData: updatedQuestionData})
        }
      )
        .catch(err => console.log(err))
    }else{
      alert('Please enter something first!')
    }
  }

  //------------DELETE QUESTION FUNCTIONS----------------------
  deleteQuestion = (e: React.FormEvent<HTMLButtonElement>) => {
    const targetElement: any = e.target
    const questionId = targetElement.dataset.questionId
    axios.delete(`${this.ratingQuestionsUrl}/${questionId}`)
      .then(res => {
        const data: any = this.state.ratingQuestionData
        const filteredQuestions = data.filter( (question: Question) => question.id.toString() !== questionId )
        console.log(filteredQuestions)
        this.setState({ ratingQuestionData: filteredQuestions })
      })
      .catch(err => {
        console.log(err)
      })
  }



  renderRatingQuestions = (data: QuestionData) => {
    return data.map((question: Question) => <RatingQuestion key={question.id} deleteQuestion={this.deleteQuestion} question={question}/>)
  }

  render() {
    const { name, ratingQuestionData } = this.state
    return (
      <AppContainer>
        <QuestionsContainer>
          {
            ratingQuestionData ?
            this.renderRatingQuestions(ratingQuestionData) :
            <h1>LOADING DATA</h1>
          }
        </QuestionsContainer>

        <NewQuestionForm 
          updateNewQuestionTitleData={this.updateNewQuestionTitleData} 
          sendNewQuestionTitleData={this.sendNewQuestionTitleData}
        />
      </AppContainer>
    );
  }

}

export default App