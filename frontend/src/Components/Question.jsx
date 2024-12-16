import { useState } from "react";

const Question = ({question}) => {
    const [selectedChoice, setSelectedChoice] = useState(null);

    return (
        <div className="">
            <h2>{question.title}</h2>
            <div className="grid grid-cols-2">
                    {question.options.map((option, index) => (
                        <div key={index}>
                        <label>
                          <input
                            type="radio"
                            value={index}
                            onChange={(e) => setSelectedChoice(e.target.value)}
                            checked={selectedChoice === index.toString()}
                          />
                          {option}
                        </label>
                      </div>
                    ))}
            </div>
        </div>
    );
}
 
export default Question;