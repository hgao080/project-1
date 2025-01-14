import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import EventForm from '../components/EventForm';
import EventsAdmin from '../components/EventsAdmin';
import Logout from '../components/Logout';
import Users from '../components/Users';
import CompetitionsQuestions from '../components/CompetitionsQuestions';

import eventsService from '../services/events';
import usersService from '../services/user';
import competitionsService from '../services/competitions';
import questionsService from '../services/question';

import { useAuthContext } from '../hooks/useAuthContext';

export const DataContext = createContext();

const Admin = () => {
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const [events, setEvents] = useState([]);
	const [competitions, setCompetitions] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [timeout, setTimeoutReached] = useState(false);
	const [isCompetitionsDisplayed, setisCompetitionsDisplayed] =
		useState(false);
	const [markingResults, setMarkingResults] = useState({});
	const [isNoResults, setIsNoResults] = useState(false);

	useEffect(() => {
		if (user) {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeoutReached(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (user) {
			eventsService.getAll().then((initialEvents) => {
				setEvents(initialEvents);
			});

			usersService
				.getUsers({ Authorization: `Bearer ${user.token}` })
				.then((users) => {
					setUsers(users);
				});

			competitionsService
				.getAll({ Authorization: `Bearer ${user.token}` })
				.then((initialCompetitions) => {
					setCompetitions(initialCompetitions);
				});

			questionsService
				.getAll({ Authorization: `Bearer ${user.token}` })
				.then((initialQuestions) => {
					setQuestions(initialQuestions);
				});
		}
	}, [user]);

	if (loading) {
		if (timeout) {
			navigate('/');
		}
		return <div>Loading...</div>;
	}

	if (!user || !user.isAdmin) {
		navigate('/');
	}

	const handleSwap = () => {
		setisCompetitionsDisplayed(!isCompetitionsDisplayed);
	};

	const handleClose = () => {
		setMarkingResults({});
		setIsNoResults(false);
	};

	return (
		<div className='w-screen h-screen bg-homeBg bg-no-repeat bg-center bg-cover font-main pb-8'>
			<div className='max-w-[60rem] flex justify-between items-center px-4 py-4 m-auto'>
				<h1 className='text-5xl italic underline decoration-3 font-bold tracking-wide'>
					Admin Page
				</h1>
				<div className=''>
					<button
						onClick={handleSwap}
						className='text-xl px-4 py-1 border border-black rounded-lg shadow-lg font-bold bg-pastel-blue transition-all decoration-1 hover:underline hover:translate-y-[-2px] active:translate-y-[2px]'>
						{!isCompetitionsDisplayed ? 'Competitions' : 'Events'}
					</button>
				</div>
				<Logout />
			</div>

			<div className='flex'>
				<DataContext.Provider
					value={{
						competitions,
						setCompetitions,
						setEvents,
						setMarkingResults,
						setIsNoResults,
						questions,
						setQuestions,
						setUsers,
					}}>
					{!isCompetitionsDisplayed ? (
						<div className='flex gap-4 m-auto'>
							<div className='flex flex-col'>
								<div className='flex gap-4'>
									<div className='flex w-[50rem] h-[28rem]'>
										<EventsAdmin
											events={events}
											setEvents={setEvents}
											user={user}
										/>
									</div>
									<EventForm
										events={events}
										setEvents={setEvents}
									/>
								</div>

								<div className=''>
									<Users users={users} events={events} />
								</div>
							</div>
							{markingResults &&
							Object.keys(markingResults).length > 0 ? (
								<div className='flex flex-col border border-black rounded-lg bg-beige p-2 w-[300px] shadow-lg'>
									<h3 className='underline font-bold text-2xl decoration-1 font-main'>
										Marking Results
									</h3>
									{Object.entries(markingResults).map(
										([key, result]) => (
											<div
												key={key}
												className='grid grid-cols-2 text-xl'>
												<p className=''>
													{result.userEmail}
												</p>
												<p className='justify-self-end'>
													{result.result}
												</p>
											</div>
										)
									)}
									<button
										onClick={handleClose}
										className='border border-black rounded-lg mt-auto self-start px-4 bg-pastel-blue transition-all hover:translate-y-[-2px] active:translate-y-[2px] shadow-md'>
										Close
									</button>
								</div>
							) : isNoResults ? (
								<div className='flex flex-col border border-black rounded-lg bg-beige p-2 w-[300px] shadow-lg'>
									<h3 className='underline font-bold text-2xl decoration-1 font-main'>
										Marking Results
									</h3>
									<div className='text-xl'>
										No results to show
									</div>
									<button
										onClick={handleClose}
										className='border border-black rounded-lg mt-auto self-start px-4 bg-pastel-blue transition-all hover:translate-y-[-2px] active:translate-y-[2px] shadow-md'>
										Close
									</button>
								</div>
							) : null}
						</div>
					) : (
						<CompetitionsQuestions />
					)}
				</DataContext.Provider>
			</div>
		</div>
	);
};

export default Admin;
