import { useContext, useState } from "react";
import { AnswersContext } from "../pages/CompetitionTest";

const Question = ({ question }) => {
  const {answers, setAnswers} = useContext(AnswersContext)

  const handleSelectChoice = (questionTitle, index) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionTitle]: index,
    }))
  }

  return (
    <div className="w-full border p-4 py-6 border-black bg-beige rounded-lg shadow-md">
      <h2 className="font-main text-3xl font-bold text-center">{question.title}</h2>
      <div className="grid grid-cols-2 mt-1">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              value={index}
              id={`${question.title}-${index}`}
              onChange={() => handleSelectChoice(question.title, index)}
              checked={answers[question.title] === index}
              className=""
            />
            <label htmlFor={`${question.title}-${index}`} className="pl-2">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;