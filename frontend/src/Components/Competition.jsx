import { useState } from "react";
import QuestionModal from "./QuestionModal";
import AddQuestionModal from "./AddQuestionModal";

const Competition = ({ competition }) => {
    const [isModalShowing, setIsModalShowing] = useState(false);

    const toggleModal = () => {
        setIsModalShowing(!isModalShowing)
    }

  return (
    <div className="flex items-center border border-black w-full px-4 py-2 justify-between rounded-xl bg-pastel-orange shadow-lg font-body">
      <div className="flex flex-col">
        <h3 className="flex font-normal text-2xl items-end gap-4">
          {competition.title}
        </h3>

        <ul className="list-disc pl-4">
          {competition.questionIds
            ? competition.questionIds.map((questionTitle) => (
              <li key={questionTitle} className="">{questionTitle}</li>
              ))
            : null}
        </ul>
      </div>
      
      <button onClick={toggleModal} disabled={isModalShowing} className="self-start min-w-fit border border-black px-4 rounded text-xl bg-pastel-blue transition-all hover:translate-y-[-2px] active:translate-y-[2px]">Add Question</button>
      {isModalShowing ? <AddQuestionModal handleToggle={toggleModal} competition={competition}/> : null}
    </div>
  );
};

export default Competition;
