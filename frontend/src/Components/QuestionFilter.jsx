import { useState, useContext, useEffect } from 'react';

import { DataContext } from '../pages/Admin';
import { use } from 'react';

const QuestionFilter = ({ setQuestionsToShow }) => {
	const { questions } = useContext(DataContext);
	const [difficultyFilter, setDifficultyFilter] = useState('ALL');
	const [topicFilter, setTopicFilter] = useState([]);

	const difficultyOptions = ['ALL', 'EASY', 'MEDIUM', 'HARD'];
	const topics = ['MECHANICS', 'WAVES', 'ALGEBRA', 'GEOMETRY'];

    const filterQuestions = () => {
        let filteredQuestions = questions;

        if (difficultyFilter !== 'ALL') {
            filteredQuestions = filteredQuestions.filter((question) => question.difficulty === difficultyFilter);
        }

        if (topicFilter.length > 0) {
            filteredQuestions = filteredQuestions.filter((question) => topicFilter.every((topic) => question.topics.includes(topic)));
        }

        setQuestionsToShow(filteredQuestions);
    }

    useEffect(() => {
        filterQuestions();
    }, [difficultyFilter, topicFilter, questions]);


	const handleDifficultyFilterChange = (e) => {
		setDifficultyFilter(e.target.value);
	};

	const handleTopicsClick = (e) => {
		const clickedTopic = e.target.value;
		if (topicFilter.includes(clickedTopic)) {
			setTopicFilter(topicFilter.filter((topic) => clickedTopic !== topic));
		} else {
			setTopicFilter([...topicFilter, clickedTopic]);
		}
	};

	return (
		<div className='flex gap-8 items-center'>
			<div className=''>
				<label>Select difficulty: </label>
				<select value={difficultyFilter} onChange={handleDifficultyFilterChange}>
					{difficultyOptions.map((difficulty) => (
						<option key={difficulty} value={difficulty}>
							{difficulty}
						</option>
					))}
				</select>
			</div>
			<div className='flex items-center gap-2'>
				<label className=''>Select topics: </label>
				<div className='flex gap-2'>
					{topics.map((topic) => (
						<button
							value={topic}
							onClick={handleTopicsClick}
							className={`border border-black rounded-lg px-2 py-0 ${topicFilter.includes(topic) ? 'bg-pastel-blue' : 'bg-pastel-orange'}`}>
							{topic}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default QuestionFilter;
