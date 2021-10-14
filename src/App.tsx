import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';

// components

import QuestionCard from "./components/QuestionCard"

// Types 

import { QuestionsState,Difficulty } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS=10;

const App=()=> {

  const [loadind, setLoading]=useState(false);
  const [questions, setQuestions]=useState<QuestionsState[]>([]);
  const [number, setNumber]=useState(0);
  const [userAnswers, setUserAnswers]=useState<AnswerObject[]>([]);
  const [score, setScore]=useState(0);
  const [gameOver, setGameOver]=useState(true);


  // console.log(questions);
  


  const startTrivia=async()=>{

    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer=(e: React.MouseEvent<HTMLButtonElement>)=>{
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }

  }

  const nextQuestion=()=>{

  }
  return (
    <div className="App">
     <h1>REACT QUIZ</h1>
     <button className="start" onClick={startTrivia}>
       Start
     </button>
     <p className="score">Score:</p>
     <p>Loading Questions ...</p>
     {/* <QuestionCard
     questionNr={number +1}
     totalQuestions={TOTAL_QUESTIONS}
     question={questions[number].question}
     answers={questions[number].answers}
     userAnswer={userAnswers ? userAnswers[number]: undefined}
     callback={checkAnswer}

     /> */}
     <button className='next' onClick={nextQuestion}>
       Next Question
     </button>
    </div>
  );
}

export default App;
