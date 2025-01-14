import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

import Header from '../components/Header';
import Welcome from '../components/Welcome';
import Events from '../components/Events';

import eventsService from '../services/events';
import attemptsService from '../services/attempts';
import UserDetails from '../components/UserDetails';

export const HomeContext = createContext();

const Home = () => {
	const [events, setEvents] = useState([]);
	const [attempts, setAttempts] = useState([]);
	const { user } = useAuthContext();
	const navigate = useNavigate();

	if (user) {
		if (user.role.name === 'ADMIN') {
			navigate('/admin');
		}
	}

	useEffect(() => {
		eventsService.getAll().then((events) => {
			setEvents(events);
		});

		if (user) {
			attemptsService.getAttemptsForUser(user.email).then((attempts) => {
				setAttempts(attempts);
			});
		}
	}, [user]);

	return (
		<div className='w-screen h-screen pb-8 bg-homeBg bg-no-repeat bg-center bg-cover'>
			<div className='m-auto max-w-[60rem]'>
				<Header user={user} />
				<Welcome user={user} />
				{!user ? (
					<div className='flex items-center justify-center border border-black bg-golden-yellow rounded-xl text-center py-2 mt-4 h-[4rem] shadow-xl font-main text-2xl font-bold tracking-wide'>
						Join us for exciting challenges that will sharpen your
						intellect and unleash your potential
					</div>
				) : (
					''
				)}

				<HomeContext.Provider value={{ attempts, setAttempts }}>
					{!user ? (
						<Events events={events} user={user} />
					) : (
						<div className='flex items-start gap-12'>
							<Events events={events} user={user} />
							<UserDetails user={user} />
						</div>
					)}
				</HomeContext.Provider>
			</div>
		</div>
	);
};

export default Home;
