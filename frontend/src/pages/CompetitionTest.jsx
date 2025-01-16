import { useState, useEffect, createContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
	const [competitionEnd, setCompetitionEnd] = useState('');

	useEffect(() => {
		if (user) {
			eventsService.getEvent(eventId).then((returnedEvent) => {
				if (returnedEvent === null) {
					return navigate('/');
				}

				setEvent(returnedEvent);

				const competitionStart = new Date(
					returnedEvent.competition.competitionStart
				);
				const competitionEnd = new Date(
					returnedEvent.competition.competitionEnd
				);
				const options = {
					hour: '2-digit',
					minute: '2-digit',
					hour12: true,
				};
				setCompetitionEnd(
					competitionEnd.toLocaleTimeString('en-US', options)
				);
				const now = new Date();

				if (!(now >= competitionStart && now <= competitionEnd)) {
					return navigate('/');
				}

				attemptsService
					.getAttemptsForUser(user.email)
					.then((attempts) => {
						if (
							attempts.some(
								(attempt) =>
									attempt.eventId === returnedEvent.id
							)
						) {
							return navigate('/');
						}

						const timeRemaining = competitionEnd - now;
						console.log(timeRemaining);

						if (timeRemaining > 0 && !timeoutSetRef.current) {
							timeoutSetRef.current = true;

							if (timeRemaining > 5 * 60 * 1000) {
								setTimeout(() => {
									toast('5 Minutes Remaining', {
										icon: '🕒',
									});
								}, timeRemaining - 5 * 60 * 1000);
							}
							if (timeRemaining > 1 * 60 * 1000) {
								setTimeout(() => {
									toast('1 Minute Remaining', {
										icon: '🕒',
									});
								}, timeRemaining - 1 * 60 * 1000);
							}

							setTimeout(handleAutoSubmit, timeRemaining);
						}

						competitionsService
							.getQuestions(
								returnedEvent.competition.competitionId
							)
							.then((data) => {
								setQuestions(data.questions);
								setAnswers(
									data.questions.reduce((acc, question) => {
										acc[question.title] = -1;
										return acc;
									}, {})
								);
							});
					});
			});
		}
	}, [eventId, user]);

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
			eventId: currentEvent.id,
			attempts: currentAnswers,
			competitionEnd: currentEvent.competition.competitionEnd,
		};

		attemptsService.saveAttempt(attemptObject).then(() => {
			navigate('/');
			toast.success('Attempt auto-submitted successfully');
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
			eventId: event.id,
			attempts: answers,
			competitionEnd: event.competition.competitionEnd,
		};

		attemptsService.saveAttempt(attemptObject).then(() => {
			navigate('/');
			toast.success('Attempt submitted successfully');
		});
	};

	return (
		<div className='bg-homeBg min-h-screen pb-12 bg-no-repeat bg-cover bg-center'>
			<div className='flex flex-col'>
				<h1 className='m-auto mt-12 font-main text-7xl font-bold'>
					{event.competition?.competitionId}
				</h1>
				<p className='flex m-auto mt-4 bg-golden-yellow px-4 py-2 border border-black rounded-lg font-main text-3xl font-bold'>
					This competition ends at {competitionEnd}
				</p>
				<div className='flex gap-4 mt-6 min-w-[40rem] m-auto'>
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
