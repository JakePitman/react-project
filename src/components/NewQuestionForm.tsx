import * as React from 'react'
import styled from 'styled-components'

const FormContainer = styled.div`
  width: 500px;
  border: 5px solid #517ec6;
`

const FormInput = styled.input`
  width: 100%;
  text-align: center;
  height: 50px;
`

const FormButton = styled.button`
  width: 100%;
  height: 30px;
  background: white;
  cursor: pointer;
  border: none;
  font-size: 15px;
  transition: all 0.5s;

  :hover {
    background: #517ec6;
    color: white;
  }
`

interface NewQuestionFormProps {
  updateNewQuestionTitleData: React.ChangeEventHandler;
  sendNewQuestionTitleData: React.MouseEventHandler<HTMLButtonElement>;
}

const NewQuestionForm = (props: NewQuestionFormProps) => (  
  <FormContainer>
    <FormInput type='text' placeholder='New Question Name' onChange={props.updateNewQuestionTitleData} />
    <br/>
    <FormButton onClick={props.sendNewQuestionTitleData}>Add question</FormButton>
  </FormContainer>
)

export default NewQuestionForm