import { useState, useEffect, createContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

import competitionsService from '../services/competitions';
import attemptsService from '../services/attempts';
import eventsService from '../services/events';

import Question from '../components/Question';


export const AnswersContext = createContext();

const CompetitionTest = () => {
	const { eventId } = useParams();
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const [event, setEvent] = useState({});
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [isAllAnswered, setIsAllAnswered] = useState(true);

	useEffect(() => {
		eventsService.getEvent(eventId).then((returnedEvent) => {
			setEvent(returnedEvent);
			competitionsService.getQuestions(returnedEvent.competition.competitionId).then((data) => {
				setQuestions(data.questions);
			});
		});
	}, [eventId]);

	const handleSubmit = () => {
		if (Object.keys(answers).length !== questions.length) {
			setIsAllAnswered(false);
			setTimeout(() => {
				setIsAllAnswered(true);
			}, 2500)
			return;
		}

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
				<h1 className="m-auto mt-12 font-main text-7xl font-bold">{event.competition?.competitionId}</h1>
				<div className="grid grid-cols-2 mt-6 w-[60rem] m-auto gap-4">
					<AnswersContext.Provider value={{ answers, setAnswers }}>
						{questions.map((question) => (
							<Question
								key={question.title}
								question={question}
							/>
						))}
					</AnswersContext.Provider>
				</div>
				{!isAllAnswered ? (
					<div className="border border-red-500 text-red-500 text-center m-auto w-fit px-4 py-1 mt-6 rounded-lg">Please answer all questions before submitting</div>
				) : null}
				<button className="mt-6 font-main border border-black bg-pastel-green w-fit m-auto font-bold px-4 py-1 rounded-lg" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default CompetitionTest;
