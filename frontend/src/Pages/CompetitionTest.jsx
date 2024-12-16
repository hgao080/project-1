import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import competitionsService from "../services/competitions"
import Question from "../components/Question";

const CompetitionTest = () => {
    const { competitionId } = useParams()

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        competitionsService.getQuestions(competitionId).then((data) => {
            setQuestions(data.questions)
        })
    }, []);

    return (
        <div className="">
            <h1 className="">{competitionId}</h1>
            <div className="flex flex-col w-full items-center">
                {questions.map((question) => (
                    <Question key={question.title} question={question}/>
                ))}
            </div>
        </div>
    );
}
 
export default CompetitionTest;