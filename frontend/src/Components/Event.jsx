import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import userServices from '../services/user';
import SureCheck from './SureCheck';
import { useAuthContext } from '../hooks/useAuthContext';
import { HomeContext } from '../pages/Home';

const Event = ({ event }) => {
	const navigate = useNavigate();

	const { attempts } = useContext(HomeContext);
	const { user, dispatch } = useAuthContext();
	const [isJoined, setIsJoined] = useState(
		user && user.joinedEvents.includes(event.name)
	);
	const [isSure, setIsSure] = useState(false);
	const [isCompetitionActive, setIsCompetitionActive] = useState(false);
	const [isAttempted, setIsAttempted] = useState(false);
	const intervalSetRef = useRef(false);

	const linkedComp = event.competition.competitionId;
	const competitionStart = event.competition.competitionStart;
	const competitionEnd = event.competition.competitionEnd;

	useEffect(() => {
		const checkCompetitionActive = () => {
			const now = new Date();
			setIsCompetitionActive(
				now >= new Date(competitionStart) &&
					now <= new Date(competitionEnd)
			);
		};

		checkCompetitionActive();

		if (!intervalSetRef.current) {
			const now = new Date();
			const millisecondsUntilNextMinute =
				(60 - now.getSeconds()) * 1000 - now.getMilliseconds();

			setTimeout(() => {
				checkCompetitionActive();
				const intervalId = setInterval(checkCompetitionActive, 60000);
				intervalSetRef.current = true;

				return () => clearInterval(intervalId);
			}, millisecondsUntilNextMinute);
		}
	}, []);

	useEffect(() => {
		const checkIsAttempted = () => {
			setIsAttempted(
				attempts.some((attempt) => attempt.competitionId === linkedComp)
			);
		};

		checkIsAttempted();
	}, [attempts]);

	const handleJoin = (e) => {
		e.preventDefault();
		userServices
			.updateJoinedEvents(user.username, { eventName: event.name })
			.then((returnedUser) => {
				dispatch({ type: 'LOGIN', payload: returnedUser });

				const storedUser = JSON.parse(localStorage.getItem('user'));
				storedUser.joinedEvents = returnedUser.joinedEvents;
				localStorage.setItem('user', JSON.stringify(storedUser));

				setIsSure(false);
				setIsJoined(true);
			});
	};

	const handleStartComp = () => {
		navigate(`/competition/${event.id}`);
	};

	const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className='flex border border-black w-full px-4 py-2 justify-between items-center rounded-xl bg-pastel-orange shadow-lg font-body'>
			<div className='flex flex-col'>
				<h3 className='flex font-bold text-2xl items-end gap-4'>
					{event.name}{' '}
					<span className='text-xl italic font-normal underline decoration-1 mb-[2px]'>
						{formattedDate}
					</span>
				</h3>
				<p className='text-xl'>{event.description}</p>
			</div>

			{user ? (
				<div className='flex items-center gap-4'>
					{!isSure ? (
						isJoined ? (
							linkedComp ? (
								!isAttempted ? (
									<div className=''>
										<button
											onClick={handleStartComp}
											disabled={!isCompetitionActive}
											className='border border-black px-4 rounded bg-pastel-blue disabled:opacity-50'>
											Start Competition
										</button>
										{isCompetitionActive ? (
											''
										) : (
											<p className='text-red-500 mt-1'>
												Competition inactive
											</p>
										)}
									</div>
								) : (
									<p className='text-red-500 mt-1'>
										Already attempted
									</p>
								)
							) : (
								<p className=''>No associated competition</p>
							)
						) : (
							<button
								onClick={() => {
									setIsSure(true);
								}}
								className={`border border-black py-1 rounded bg-pastel-blue font-bold disabled:opacity-50 disabled:border-gray-800 w-[3.5rem] transition-all active:translate-y-[2px] shadow-lg ${
									isJoined
										? ''
										: ' hover:translate-y-[-2px] hover:cursor-pointer'
								}`}
								disabled={isJoined}>
								Join
							</button>
						)
					) : (
						<SureCheck
							confirm={handleJoin}
							cancel={() => {
								setIsSure(false);
							}}
						/>
					)}
				</div>
			) : null}
		</div>
	);
};

export default Event;
