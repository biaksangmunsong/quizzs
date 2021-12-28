import fs from "fs"
import path from "path"
import { useState, useEffect } from "react"
import StyledHome from "../styles/StyledHome"

const maxTime = 10
const Home = ({questions}) => {

	const [ seconds, setSeconds ] = useState(0)
	const [ timeDisplay, setTimeDisplay ] = useState("00:00")
	const [ currentQuestion, setCurrentQuestion ] = useState(0)
	const [ answers, setAnswers ] = useState([])
	const [ answer, setAnswer ] = useState(null)
	
	const startQuiz = () => {
		setSeconds(1)
	}
	
	const selectOption = option => {
		setAnswer(option)
	}
	
	useEffect(() => {
		if (seconds > 0 && questions && questions.length){
			if (seconds < maxTime){
				setTimeout(() => {
					setSeconds(seconds+1)
				}, 1000)
			}
			else {
				console.log("Time up")
			}
		}
	}, [seconds, questions])

	useEffect(() => {
		if (seconds){
			if (seconds < maxTime){
				let min = Math.floor(seconds/60)
				let sec = seconds-(min*60)

				if (min < 10){
					min = `0${min}`
				}
				if (sec < 10){
					sec = `0${sec}`
				}

				setTimeDisplay(`${min}:${sec}`)
			}
			else {
				setTimeDisplay("Time up")
			}
		}
	}, [seconds])
	
	useEffect(() => {
		setAnswer(null)
	}, [currentQuestion])
	
	return (
		<StyledHome>
			{
				seconds < 1 ?
				<div className="intro">
					<div className="sub-container">
						<div className="title">qui<span>zzs</span></div>
						<h1>Answer 15 product management questions in 15 minutes</h1>
						<p className="intro-line">There are 15 multiple choice questions and you will have 15 minutes to complete. All questions are mandatory and there are no negative marking. After you're done, you will be able to see how you did and share the results.</p>
						<button type="button" className="start-btn" onClick={startQuiz}>Start Quiz</button>
					</div>
				</div> : ""
			}
			{
				seconds > 0 ?
				<div className="questions">
					<header>
						<div className="sub-container">
							<div className={`timer${seconds >= maxTime ? " up" : ""}`}>{timeDisplay}</div>
							<div className="btns">
								<button type="button" className={`prev${currentQuestion > 0 ? " active" : ""}`}>Prev</button>
								<button type="button" className="quit active">Quit test</button>
								<button type="button" className={`next${answer ? " active" : ""}`}>Next</button>
							</div>
						</div>
					</header>
					<div className="question">
						<h2>{questions[currentQuestion].question}</h2>
						<ul>
							{
								questions[currentQuestion].options.map(option => {
									return (
										<li key={option.id}>
											<div className={`radio${answer === option.id ? " selected" : ""}`} onClick={() => selectOption(option.id)}></div>
											<span className="option-id" onClick={() => selectOption(option.id)}>{option.id}.</span>
											<span className="text" onClick={() => selectOption(option.id)}>{option.text}</span>
										</li>
									)
								})
							}
						</ul>
					</div>
				</div> : ""
			}
		</StyledHome>
	)

}

export const getServerSideProps = async () => {

	const questions = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "questions.json")))
	
	return {
		props: {
			questions: (questions && questions.length) ? questions : []
		}
	}

}

export default Home