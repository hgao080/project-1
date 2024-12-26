import { useContext, useState } from "react";
import { AnswersContext } from "../Pages/CompetitionTest";

const Question = ({ question }) => {
  const {answers, setAnswers} = useContext(AnswersContext)

  const handleSelectChoice = (questionTitle, index) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionTitle]: index,
    }))
  }

  return (
    <div className="w-full">
      <h2 className="">{question.title}</h2>
      <div className="grid grid-cols-2">
        {question.options.map((option, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="radio"
              value={index}
              id={`${question.title}-${index}`}
              onChange={() => handleSelectChoice(question.title, index)}
              checked={answers[question.title] === index}
              className=""
            />
            <label htmlFor={`${question.title}-${index}`} className="">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;