import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";

import competitionsService from "../services/competitions"
import Question from "../components/Question";
import { useAuthContext } from "../hooks/useAuthContext";

export const AnswersContext = createContext();

const CompetitionTest = () => {
    const { competitionId } = useParams()
    const { user } = useAuthContext()

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({})

    useEffect(() => {
        competitionsService.getQuestions(competitionId).then((data) => {
            setQuestions(data.questions)
        })
    }, []);

    const handleSubmit = () => {
        const AttemptObject = {
            userEmail: user.email,
            competitionId,
            attempts: answers
        }

        console.log(AttemptObject)
    }

    return (
        <div className="flex flex-col">
            <h1 className="m-auto mt-12">{competitionId}</h1>
            <div className="grid grid-cols-2 mt-6 w-[60rem] m-auto">
                <AnswersContext.Provider value={{ answers, setAnswers }}>
                    {questions.map((question) => (
                        <Question key={question.title} question={question} />
                    ))}
                </AnswersContext.Provider>
            </div>
            <button className="mt-6" onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default CompetitionTest;