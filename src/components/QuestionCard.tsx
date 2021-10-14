import React from 'react'

// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props ={
    question:string;
    answers:string[];
    callback:any;
    userAnswer:any;
    questionNr:number;
    totalQuestions:number;


}

const QuestionCard : React.FC<Props>=({question,answers,callback,userAnswer,questionNr,totalQuestions}) =>{
    return (
        <Wrapper>
            <p className="number">
                Question:{questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html:question}}/>
            <div>
                {answers.map(answer=>(
                        <div key={answer}>
                            <button disabled={userAnswer} onClick={callback}>
                                <span dangerouslySetInnerHTML={{__html: answer}}/>

                            </button>
                        </div>
                    ))
                }


            </div>
        </Wrapper>
    )
}

export default QuestionCard
