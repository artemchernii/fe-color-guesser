import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
const getRandomColor = () => {
    const digits = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
    ];
    const result = new Array(6)
        .fill('')
        .map(() => digits[Math.floor(Math.random() * digits.length)])
        .join('');
    return `#${result}`;
};
enum Result {
    Correct,
    Wrong,
}
function App() {
    const [color, setColor] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<Result | undefined>(undefined);

    const pickColor = () => {
        const actualColor = getRandomColor();
        setColor(actualColor);
        setAnswers(
            [actualColor, getRandomColor(), getRandomColor()].sort(
                () => 0.5 - Math.random()
            )
        );
    };
    useEffect(() => {
        pickColor();
    }, []);

    const handleAnswerClick = (answer: string) => {
        if (answer === color) {
            setResult(Result.Correct);
        } else {
            setResult(Result.Wrong);
        }
    };

    return (
        <div className="App">
            <div className="wrapper">
                <div className="guess-me" style={{ background: color }}></div>
                <div className="buttons">
                    {answers.map((answer) => (
                        <button
                            onClick={() => handleAnswerClick(answer)}
                            key={answer}
                        >
                            {answer}
                        </button>
                    ))}
                </div>
                {result === Result.Wrong && (
                    <div className="result" style={{ color: 'red' }}>
                        Wrong Answer
                    </div>
                )}
                {result === Result.Correct && (
                    <div className="result" style={{ color: 'green' }}>
                        Correct Answer
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
