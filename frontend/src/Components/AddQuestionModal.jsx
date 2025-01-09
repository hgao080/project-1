import { useContext, useState } from 'react';

import competitionService from '../services/competitions';

import { DataContext } from '../pages/Admin';

const AddQuestionModal = ({ handleToggle, competition }) => {
    const { questions, competitions, setCompetitions } = useContext(DataContext);

    const [questionsToAdd, setQuestionsToAdd] = useState([]);

    const handleCheckboxChange = (questionTitle) => {
        setQuestionsToAdd((prevQuestionTitles) => {
            if (prevQuestionTitles.includes(questionTitle)) {
                return prevQuestionTitles.filter((title) => title !== questionTitle);
            } else {
                return [...prevQuestionTitles, questionTitle];
            }
        });
    };

    const handleAddQuestions = () => {
        const data = {
            "questionTitles": questionsToAdd
        }

        competitionService
            .addQuestionsToCompetition(competition.title, data)
            .then((updatedCompetition) => {
                setCompetitions(competitions.map(comp => 
                    comp.title === updatedCompetition.title ? updatedCompetition : comp
                ));
                handleToggle();
            });
    };

    return (
        <div
            onClick={handleToggle}
            className='flex items-center justify-center fixed top-0 left-0 w-full h-full bg-[#00000055]'>
            <div
                onClick={(e) => e.stopPropagation()}
                className='bg-beige w-[40rem] h-[30rem] rounded-lg p-4 z-50 border border-black'>
                <h2 className=''>Please select all questions you would like to add:</h2>
                <div className=''>
                    {questions.map((question) => (
                        <div key={question.title} className=''>
                            <label>
                                <input
                                    type='checkbox'
                                    onChange={() => handleCheckboxChange(question.title)}
                                />
                                {question.title}
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleAddQuestions}
                    className='px-4 py-1 border border-black rounded-lg font-bold bg-pastel-green'>
                    Add Questions
                </button>
            </div>
        </div>
    );
};

export default AddQuestionModal;
