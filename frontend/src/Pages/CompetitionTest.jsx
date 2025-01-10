import { useState, useEffect, createContext, useRef } from 'react';
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
	const eventRef = useRef(event);
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const answersRef = useRef(answers);
	const [isAllAnswered, setIsAllAnswered] = useState(true);
	const timeoutSetRef = useRef(false);

	useEffect(() => {
		eventsService.getEvent(eventId).then((returnedEvent) => {
			setEvent(returnedEvent);

			competitionsService
				.getQuestions(returnedEvent.competition.competitionId)
				.then((data) => {
					setQuestions(data.questions);
					setAnswers(
						data.questions.reduce((acc, question) => {
							acc[question.title] = -1;
							return acc;
						}, {}),
					);
				});

			const competitionEnd = new Date(returnedEvent.competition.competitionEnd);
			const now = new Date();
			const timeRemaining = competitionEnd - now;

			if (timeRemaining > 0 && !timeoutSetRef.current) {
				timeoutSetRef.current = true;
				setTimeout(handleAutoSubmit, timeRemaining);
			}
		});
	}, [eventId]);

	useEffect(() => {
		eventRef.current = event;
	}, [event]);

	useEffect(() => {
		answersRef.current = answers;
	}, [answers]);

	const handleAutoSubmit = () => {
		const currentEvent = eventRef.current;
		const currentAnswers = answersRef.current;

		const attemptObject = {
			userEmail: user.email,
			competitionId: currentEvent.competition.competitionId,
			attempts: currentAnswers,
			competitionEnd: currentEvent.competition.competitionEnd,
		};

		attemptsService.saveAttempt(attemptObject).then(() => {
			navigate('/');
		});
	};

	const handleSubmit = () => {
		if (Object.values(answers).some((answer) => answer === -1)) {
			setIsAllAnswered(false);
			setTimeout(() => {
				setIsAllAnswered(true);
			}, 2500);
			return;
		}

		const attemptObject = {
			userEmail: user.email,
			competitionId: event.competition.competitionId,
			attempts: answers,
			competitionEnd: event.competition.competitionEnd,
		};

		attemptsService.saveAttempt(attemptObject).then(() => {
			navigate('/');
		});
	};

	return (
		<div className='bg-homeBg min-h-screen bg-no-repeat bg-cover bg-center'>
			<div className='flex flex-col'>
				<h1 className='m-auto mt-12 font-main text-7xl font-bold'>
					{event.competition?.competitionId}
				</h1>
				<div className='grid grid-cols-2 mt-6 w-[60rem] m-auto gap-4'>
					<AnswersContext.Provider value={{ answers, setAnswers }}>
						{questions.map((question) => (
							<Question key={question.title} question={question} />
						))}
					</AnswersContext.Provider>
				</div>
				{!isAllAnswered ? (
					<div className='border border-red-500 text-red-500 text-center m-auto w-fit px-4 py-1 mt-6 rounded-lg'>
						Please answer all questions before submitting
					</div>
				) : null}
				<button
					className='mt-6 font-main border border-black bg-pastel-green w-fit m-auto font-bold px-4 py-1 rounded-lg'
					onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default CompetitionTest;
