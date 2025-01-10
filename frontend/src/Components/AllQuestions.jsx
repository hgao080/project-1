import { useContext, useState } from 'react';

import QuestionModal from './QuestionModal';

import { DataContext } from '../pages/Admin';
import QuestionFilter from './QuestionFilter';

const AllQuestions = () => {
	const { questions } = useContext(DataContext);
	const [questionsToShow, setQuestionsToShow] = useState(questions);
	const [isQuestionShowing, setIsQuestionShowing] = useState(false);

	const toggleQuestion = () => {
		setIsQuestionShowing(!isQuestionShowing);
	};

	return (
		<div className='shadow-lg'>
			<h2 className='text-center text-warm-brown text-5xl underline decoration-2 font-bold mt-4'>
				Questions
			</h2>
			<div className='flex justify-between items-center'>
				<QuestionFilter setQuestionsToShow={setQuestionsToShow} />
				<button
					onClick={toggleQuestion}
					disabled={isQuestionShowing}
					className='border border-black rounded-lg bg-pastel-green mr-1 px-4 py-1 font-body font-bold text-xl transition-all hover:translate-y-[-2px] active:translate-y-[2px]'>
					Create Question
				</button>
			</div>

			<div className='flex flex-col gap-2 h-[16rem] bg-beige p-4 border border-black rounded-lg mt-2 overflow-auto scrollbar-none'>
				{questionsToShow.map((question) => (
					<div
						key={question.title}
						className='bg-pastel-orange border border-black rounded-lg p-4 py-2 shadow-md '>
						<div className='flex items-center gap-2 '>
							<h3 className='font-bold font-body text-2xl'>{question.title}</h3>
							<p className='border border-black rounded-lg px-2 py-0 font-bold text-xl bg-golden-yellow'>
								{question.difficulty}
							</p>
							{question.topics
								? question.topics.map((topic) => (
										<p
											key={topic}
											className='border border-black rounded-lg px-2 py-0 font-bold text-xl bg-pastel-blue'>
											{topic}
										</p>
								  ))
								: null}
						</div>

						<div className='grid grid-cols-2 gap-2 mt-1'>
							{question.options.map((option, index) => (
								<div
									key={index}
									className={`text-center font-body border border-black rounded-lg ${
										index === question.correctChoiceIndex
											? 'bg-pastel-green'
											: ''
									}`}>
									{option}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			{isQuestionShowing ? <QuestionModal handleToggle={toggleQuestion} /> : null}
		</div>
	);
};

export default AllQuestions;
