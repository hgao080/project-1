import { useState } from "react";
import QuestionModal from "./QuestionModal";

const Competition = ({ competition }) => {
    const [isQuestionShowing, setIsQuestionShowing] = useState(true);

    const toggleQuestion = () => {
        setIsQuestionShowing(!isQuestionShowing)
    }

  return (
    <div className="flex items-center border border-black w-full px-4 py-2 justify-between items-start rounded-xl bg-pastel-orange shadow-lg font-body">
      <div className="flex flex-col">
        <h3 className="flex font-bold text-2xl items-end gap-4">
          {competition.title}
        </h3>

        <div className="grid grid-flow-col grid-rows-2  grid-cols-4 gap-x-4">
          {competition.questionIds
            ? competition.questionIds.map((questionTitle) => (
                <div key={questionTitle} className="">
                  {questionTitle}
                </div>
              ))
            : null}
        </div>
      </div>
      
      <button onClick={toggleQuestion} disabled={isQuestionShowing} className="border border-black px-4 rounded text-xl">Add Question</button>
      {isQuestionShowing ? <QuestionModal handleToggle={toggleQuestion}/> : null}
    </div>
  );
};

export default Competition;
