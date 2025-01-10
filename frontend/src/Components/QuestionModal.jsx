import { useState, useContext } from 'react';

import questionService from '../services/question';

import { DataContext } from '../pages/Admin';

const QuestionModal = ({ handleToggle }) => {
	const { setQuestions } = useContext(DataContext);

	const [title, setTitle] = useState('');
	const [choiceOne, setChoiceOne] = useState('');
	const [choiceTwo, setChoiceTwo] = useState('');
	const [choiceThree, setChoiceThree] = useState('');
	const [choiceFour, setChoiceFour] = useState('');
	const [correctChoice, setCorrectChoice] = useState(0);
	const [difficulty, setDifficulty] = useState('');
	const [topics, setTopic] = useState([]);
	const [error, setError] = useState('');

	const clearModal = () => {
		setTitle('');
		setChoiceOne('');
		setChoiceTwo('');
		setChoiceThree('');
		setChoiceFour('');
		setCorrectChoice();
		setDifficulty('');
		setError('');
	};

	const handleAddQuestion = (e) => {
		e.preventDefault();

		if (!title) {
			setError('Please enter a question title');
			setTimeout(() => {
				setError('');
			}, 2500);
			return;
		}

		if (!choiceOne || !choiceTwo || !choiceThree || !choiceFour) {
			setError('Please enter all options');
			setTimeout(() => {
				setError('');
			}, 2500);
			return;
		}

		if (!difficulty) {
			setError('Please select a difficulty level');
			setTimeout(() => {
				setError('');
			}, 2500);
			return;
		}

		const question = {
			title,
			options: [choiceOne, choiceTwo, choiceThree, choiceFour],
			correctChoiceIndex: correctChoice,
			difficulty,
			topics,
		};

		questionService.createQuestion(question).then((returnedQuestion) => {
			setQuestions((prevQuestions) => [
				...prevQuestions,
				returnedQuestion,
			]);

			clearModal();
			handleToggle();
		});
	};

	const handleTopicClick = (topic) => {
		if (topics.includes(topic)) {
			setTopic(topics.filter((t) => t !== topic));
		} else {
			setTopic([...topics, topic]);
		}
	};

	return (
		<div
			onClick={handleToggle}
			className='flex items-center justify-center fixed top-0 left-0 w-full h-full bg-[#00000055]'>
			<div
				onClick={(e) => e.stopPropagation()}
				className='bg-beige w-[40rem] rounded-lg p-4 z-50 border border-black'>
				<form action='' className='flex flex-col items-center'>
					<label className='font-bold text-2xl'>Question Title</label>
					<input
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						type='text'
						className='px-1 text-xl font-body rounded-lg text-center w-[60%] border border-black'
					/>

					<div className='grid grid-rows-2 grid-cols-2 mt-4 gap-x-12 gap-y-4 text-xl'>
						<div className='flex flex-col'>
							<label htmlFor='' className='text-center font-bold'>
								Option 1
							</label>
							<textarea
								onChange={(e) => {
									setChoiceOne(e.target.value);
								}}
								name=''
								id=''
								className='w-[15rem] h-[5rem] text-center rounded-lg scrollbar-none p-1 font-body border border-black'></textarea>
						</div>
						<div className='flex flex-col items-center'>
							<label htmlFor='' className='text-center font-bold'>
								Option 2
							</label>
							<textarea
								onChange={(e) => {
									setChoiceTwo(e.target.value);
								}}
								name=''
								id=''
								className='w-[15rem] h-[5rem] text-center rounded-lg scrollbar-none p-1 font-body border border-black'></textarea>
						</div>
						<div className='flex flex-col'>
							<label htmlFor='' className='text-center font-bold'>
								Option 3
							</label>
							<textarea
								onChange={(e) => {
									setChoiceThree(e.target.value);
								}}
								name=''
								id=''
								className='w-[15rem] h-[5rem] text-center rounded-lg scrollbar-none p-1 font-body border border-black'></textarea>
						</div>
						<div className='flex flex-col'>
							<label htmlFor='' className='text-center font-bold'>
								Option 4
							</label>
							<textarea
								onChange={(e) => {
									setChoiceFour(e.target.value);
								}}
								name=''
								id=''
								className='w-[15rem] h-[5rem] text-center rounded-lg scrollbar-none p-1 font-body border border-black'></textarea>
						</div>
					</div>

					<div className='mt-2 text-xl'>
						<label className='font-bold'>Correct Choice: </label>
						<select
							value={correctChoice}
							onChange={(e) => {
								setCorrectChoice(e.target.value);
							}}
							id='correctOption'
							className='pl-1 mt-2 w-[5rem] font-bold'>
							<option value={0}>Option 1</option>
							<option value={1}>Option 2</option>
							<option value={2}>Option 3</option>
							<option value={3}>Option 4</option>
						</select>
					</div>

					<div className='flex w-full'>
						<div className='flex flex-col flex-1 justiy-center items-center'>
							<label className='text-2xl underline font-bold decoration-2'>
								Difficulty
							</label>

							<div className='flex gap-4 mt-1'>
								<button
									onClick={() => setDifficulty('EASY')}
									disabled={difficulty === 'EASY'}
									className={`border border-black rounded-lg px-2 py-1 text-xl tracking-wide font-bold ${
										difficulty === 'EASY'
											? 'bg-pastel-blue'
											: ''
									}`}>
									Easy
								</button>
								<button
									onClick={() => setDifficulty('MEDIUM')}
									disabled={difficulty === 'MEDIUM'}
									className={`border border-black rounded-lg px-2 py-1 text-xl tracking-wide font-bold ${
										difficulty === 'MEDIUM'
											? 'bg-pastel-blue'
											: ''
									}`}>
									Medium
								</button>
								<button
									onClick={() => setDifficulty('HARD')}
									disabled={difficulty === 'HARD'}
									className={`border border-black rounded-lg px-2 py-1 text-xl tracking-wide font-bold ${
										difficulty === 'HARD'
											? 'bg-pastel-blue'
											: ''
									}`}>
									Hard
								</button>
							</div>
						</div>

						<div className='flex flex-col flex-1 justify-center items-center'>
							<label className='text-2xl underline font-bold decoration-2'>
								Topics
							</label>

							<div className='flex flex-wrap justify-center gap-4 mt-1 '>
								<button
									type='button'
									onClick={() =>
										handleTopicClick('MECHANICS')
									}
									className={`border border-black rounded-lg px-2 py-1 text-xl tracking-wide font-bold ${
										topics.includes('MECHANICS')
											? 'bg-pastel-blue'
											: ''
									}`}>
									Mechanics
								</button>
								<button
									type='button'
									onClick={() => handleTopicClick('WAVES')}
									className={`border border-black rounded-lg px-2 py-1 text-xl tracking-wide font-bold ${
										topics.includes('WAVES')
											? 'bg-pastel-blue'
											: ''
									}`}>
									Waves
								</button>
								<button
									type='button'
									onClick={() => handleTopicClick('ALGEBRA')}
									className={`border border-black rounded-lg px-2 py-1 text-xl tracking-wide font-bold ${
										topics.includes('ALGEBRA')
											? 'bg-pastel-blue'
											: ''
									}`}>
									Algebra
								</button>
								<button
									type='button'
									onClick={() => handleTopicClick('GEOMETRY')}
									className={`border border-black rounded-lg px-2 py-1 text-xl tracking-wide font-bold ${
										topics.includes('GEOMETRY')
											? 'bg-pastel-blue'
											: ''
									}`}>
									Geometry
								</button>
							</div>
						</div>
					</div>

					{error && (
						<p className='mt-4 px-2 py-1 text-red-500 text-center border border-red-500 rounded-lg font-bold text-xl'>
							{error}
						</p>
					)}

					<button
						onClick={handleAddQuestion}
						className='mt-4 px-4 py-2 border border-black rounded-lg bg-pastel-green font-bold text-2xl font-body transition-all hover:translate-y-[-2px] active:translate-y-[2px]'>
						Create question
					</button>
				</form>
			</div>
		</div>
	);
};

export default QuestionModal;
