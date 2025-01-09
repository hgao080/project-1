import { useState, useContext } from 'react';

import { DataContext } from '../pages/Admin';

const QuestionFilter = ({ setQuestionsToShow }) => {
    const { questions } = useContext(DataContext);
	const [difficultyFilter, setDifficultyFilter] = useState('ALL');

	const difficultyOptions = ['ALL', 'EASY', 'MEDIUM', 'HARD'];

    const handleDifficultyFilterChange = (e) => {
        setDifficultyFilter(e.target.value);
        setQuestionsToShow(questions.filter((question) => {
            if (e.target.value === 'ALL') {
                return true;
            }
            return question.difficulty === e.target.value;
        }));
    }

	return (
		<div className=''>
			<label htmlFor=''>Select difficulty: </label>
			<select value={difficultyFilter} onChange={handleDifficultyFilterChange}>
				{difficultyOptions.map((difficulty) => (
					<option key={difficulty} value={difficulty}>
						{difficulty}
					</option>
				))}
			</select>
		</div>
	);
};

export default QuestionFilter;
