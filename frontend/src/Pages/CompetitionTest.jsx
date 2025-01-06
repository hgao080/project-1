import { useState, useEffect, createContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import competitionsService from '../services/competitions';
import attemptsService from '../services/attempts';
import Question from '../components/Question';
import { useAuthContext } from '../hooks/useAuthContext';

export const AnswersContext = createContext();

const CompetitionTest = () => {
	const { competitionId } = useParams();
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});

	useEffect(() => {
		competitionsService.getQuestions(competitionId).then((data) => {
			setQuestions(data.questions);
		});
	}, []);

	const handleSubmit = () => {
		const attemptObject = {
			userEmail: user.email,
			competitionId,
			attempts: answers,
		};

		attemptsService.saveAttempt(attemptObject).then(() => {
			navigate('/');
		});
	};

	return (
		<div className="bg-homeBg min-h-screen bg-no-repeat bg-cover bg-center">
			<div className="flex flex-col">
				<h1 className="m-auto mt-12 font-main text-7xl font-bold">{competitionId}</h1>
				<div className="grid grid-cols-2 mt-6 w-[60rem] m-auto gap-x-4">
					<AnswersContext.Provider value={{ answers, setAnswers }}>
						{questions.map((question) => (
							<Question
								key={question.title}
								question={question}
							/>
						))}
					</AnswersContext.Provider>
				</div>
				<button className="mt-6 font-main border border-black bg-pastel-green w-fit m-auto font-bold px-4 py-1 rounded-lg" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default CompetitionTest;
