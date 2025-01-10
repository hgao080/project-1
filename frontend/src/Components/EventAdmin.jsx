import { useEffect, useState, useContext } from 'react';
import { FaTrash } from 'react-icons/fa';

import eventServices from '../services/events';
import SureCheck from './SureCheck';

import { DataContext } from '../pages/Admin';
import { useAuthContext } from '../hooks/useAuthContext';

const EventAdmin = ({ event, events, setEvents, user }) => {
	const { competitions, setMarkingResults, setIsNoResults, setUsers } = useContext(DataContext);

	const [isSure, setIsSure] = useState(false);
	const [selectedCompetition, setSelectedCompetition] = useState(
		competitions.length > 0 ? competitions[0].title : ''
	);
	const [linkedCompetition, setLinkedCompetition] = useState(event.competitionId);
	const [competitionStart, setCompetitionStart] = useState('');
	const [competitionEnd, setCompetitionEnd] = useState('');

	useEffect(() => {
		if (user && user.joinedEvents.includes(event.name)) {
			setIsJoined(true);
		}
	}, []);

	const handleDelete = () => {
		eventServices.deleteEvent(event.id).then(() => {
			setEvents(events.filter((existingEvent) => existingEvent.id !== event.id));
			setUsers((users) => {
				return users.map((user) => {
					return {
						...user,
						joinedEvents: user.joinedEvents.filter((joinedEvent) => joinedEvent !== event.name),
					};
				});
			});
		});
	};

	const addCompetition = (e) => {
		e.preventDefault();

		const data = {
			competitionId: selectedCompetition,
			competitionStart,
			competitionEnd,
		};

		eventServices.addCompetition(event.id, data).then((returnedEvent) => {
			setEvents((events) => {
				return events.map((event) =>
					event.id === returnedEvent.title ? returnedEvent : event
				);
			});
			setLinkedCompetition(returnedEvent.competitionId);
		});
	};

	const handleMark = () => {
		eventServices.markEvent(event.id).then((results) => {
			setIsNoResults(false);
			setMarkingResults(results);

			if (Object.keys(results).length == 0) {
				setIsNoResults(true);
			}
		});
	};

	const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className='flex flex-col border border-black w-full px-4 py-2 rounded-xl bg-pastel-orange shadow-lg font-body'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-col'>
					<h3 className='flex font-bold text-2xl gap-4 items-center'>
						{event.name}{' '}
						<span className='text-xl italic font-normal underline decoration-1 mb-[2px] self-end'>
							{formattedDate}
						</span>
						{!event.competitionId ? null : (
							<button
								onClick={handleMark}
								className='inline font-normal border border-black px-4 rounded-md text-sm bg-pastel-blue transition-all hover:translate-y-[-1px] active:translate-y-[1px]'>
								Mark Event
							</button>
						)}
					</h3>
					<p className='text-xl'>{event.description}</p>
				</div>

				{!isSure ? (
					<button
						onClick={() => {
							setIsSure(true);
						}}
						className='text-red-400 border rounded-full p-2 border-red-400 transition-all hover:translate-y-[-2px] active:translate-y-[2px] hover:cursor-pointer'>
						<FaTrash />
					</button>
				) : (
					<SureCheck
						confirm={handleDelete}
						cancel={() => {
							setIsSure(false);
						}}
					/>
				)}
			</div>

			{!linkedCompetition ? (
				<form onSubmit={addCompetition} className='flex gap-2 justify-between items-center'>
					<div className='flex flex-col gap-1'>
						<h2 className='font-bold underline'>Competition to assign:</h2>
						<select
							onChange={(e) => setSelectedCompetition(e.target.value)}
							value={selectedCompetition}
							className='rounded-md border border-black'>
							{competitions &&
								competitions.map((competition) => (
									<option key={competition.title} value={competition.title}>
										{competition.title}
									</option>
								))}
						</select>
						<div className='flex gap-2'>
							<label className='flex flex-col'>
								Start date & time:
								<input
									type='datetime-local'
									value={competitionStart}
									onChange={(e) => setCompetitionStart(e.target.value)}
									className='shrink border border-black px-1 font-body rounded'
									placeholder='Start DateTime'
								/>
							</label>

							<label className='flex flex-col'>
								End date & time:
								<input
									type='datetime-local'
									value={competitionEnd}
									onChange={(e) => setCompetitionEnd(e.target.value)}
									className='shrink border border-black px-1 font-body rounded'
									placeholder='End DateTime'
								/>
							</label>
						</div>
					</div>

					<button className='bg-pastel-blue border border-black px-2 font-body rounded self-end transition-all hover:translate-y-[-1px] active:translate-y-[1px]'>
						Add Competition
					</button>
				</form>
			) : (
				<div>
					<p className='underline decoration-1 font-bold'>Associated Competition</p>
					<p className=''>{linkedCompetition}</p>
				</div>
			)}
		</div>
	);
};

export default EventAdmin;
