import * as React from 'react'

interface NewQuestionFormProps {
  updateNewQuestionTitleData: React.ChangeEventHandler;
  sendNewQuestionTitleData: React.MouseEventHandler<HTMLButtonElement>;
}

const NewQuestionForm = (props: NewQuestionFormProps) => (  
  <div>
    <input type='text' placeholder='New Question Name' onChange={props.updateNewQuestionTitleData} />
    <br/>
    <button onClick={props.sendNewQuestionTitleData}>Add question</button>
  </div>
)

export default NewQuestionForm
