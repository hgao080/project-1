import { useState } from "react";

import competitionsService from "../services/competitions"
import questionService from "../services/question"

const QuestionModal = ({ handleToggle, competitions, competition, setCompetitions }) => {
  const [title, setTitle] = useState("");
  const [choiceOne, setChoiceOne] = useState("");
  const [choiceTwo, setChoiceTwo] = useState("");
  const [choiceThree, setChoiceThree] = useState("");
  const [choiceFour, setChoiceFour] = useState("");
  const [correctChoice, setCorrectChoice] = useState();

  const clearModal = () => {
    setTitle('')
    setChoiceOne('')
    setChoiceTwo('')
    setChoiceThree('')
    setChoiceFour('')
    setCorrectChoice()
  }

  const handleAddQuestion = (e) => {
    e.preventDefault();

    const question = {
      title,
      options: [choiceOne, choiceTwo, choiceThree, choiceFour],
      correctChoiceIndex: correctChoice
    }

    questionService.createQuestion(question).then((returnedQuestion) => {
      competitionsService.addQuestionToCompetition(competition.title, returnedQuestion).then((updatedComp) => {
        setCompetitions((competitions) => {
          return competitions.map((comp) => comp.title === updatedComp.title ? updatedComp : comp)
        })

        clearModal()
        handleToggle()
      })
    })

  };

  return (
    <div
      onClick={handleToggle}
      className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-[#00000055]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-beige w-[40rem] h-[30rem] rounded-lg p-4 z-50"
      >
        <form action="" className="flex flex-col items-center">
          <label htmlFor="">Question Title</label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="pl-1"
          />

          <div className="grid grid-rows-2 grid-cols-2 mt-6 gap-x-12 gap-y-4">
            <div className="flex flex-col">
              <label htmlFor="" className="text-center">
                Option 1
              </label>
              <textarea
                onChange={(e) => {
                  setChoiceOne(e.target.value);
                }}
                name=""
                id=""
                className="w-[15rem] h-[5rem] text-center"
              ></textarea>
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="" className="text-center">
                Option 2
              </label>
              <textarea
              onChange={(e) => {
                setChoiceTwo(e.target.value);
              }}
                name=""
                id=""
                className="w-[15rem] h-[5rem] text-center"
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-center">
                Option 3
              </label>
              <textarea
              onChange={(e) => {
                setChoiceThree(e.target.value);
              }}
                name=""
                id=""
                className="w-[15rem] h-[5rem] text-center"
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-center">
                Option 4
              </label>
              <textarea
              onChange={(e) => {
                setChoiceFour(e.target.value);
              }}
                name=""
                id=""
                className="w-[15rem] h-[5rem] text-center"
              ></textarea>
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="">Correct Choice: </label>
            <select onChange={(e) => {
                  setCorrectChoice(e.target.value);
                }} id="correctOption" className="pl-1 mt-2 w-[5rem]">
              <option value={0}>Option 1</option>
              <option value={1}>Option 2</option>
              <option value={2}>Option 3</option>
              <option value={3}>Option 4</option>
            </select>
          </div>

          <button onClick={handleAddQuestion} className="mt-6">
            Add question
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;
