import * as React from 'react'
// import axios from 'axios';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import RatingQuestion from './RatingQuestion'
import NewQuestionForm from './NewQuestionForm'


interface Question {
    id: number; 
    title: string;
}

type QuestionData = [Question]

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
      <div>
        {
          ratingQuestionData ?
          this.renderRatingQuestions(ratingQuestionData) :
          <h1>LOADING DATA</h1>
        }

        <NewQuestionForm 
          updateNewQuestionTitleData={this.updateNewQuestionTitleData} 
          sendNewQuestionTitleData={this.sendNewQuestionTitleData}
        />
      </div>
    );
  }

}

export default App