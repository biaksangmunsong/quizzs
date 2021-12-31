import { useState, useEffect, useRef } from "react"
import Head from "next/head"
import axios from "axios"
import Share from "../components/Share"
import Result from "../components/Result"
import StyledHome from "../styles/StyledHome"

const maxTime = 900 // in seconds
const retestTimeout = 60 // in seconds
const Home = () => {
	
	const metaData = {
		title: "Answer 15 product management questions in 15 minutes",
		description: "There are 15 multiple choice questions and you will have 15 minutes to complete. All questions are mandatory and there are no negative marking. After you're done, you will be able to see how you did and share the results."
	}
	
	const [ questions, setQuestions ] = useState(null)
	const [ seconds, setSeconds ] = useState(-1)
	const [ startTime, setStartTime ] = useState(null)
	const secondsRef = useRef(0)
	const [ timeDisplay, setTimeDisplay ] = useState("00:00")
	const [ currentQuestion, setCurrentQuestion ] = useState(0)
	const answers = useRef([])
	const [ answer, setAnswer ] = useState(null)
	const [ result, setResult ] = useState(null)
	const [ canTakeTest, setCanTakeTest ] = useState(0)
	const [ lastTestTime, setLastTestTime ] = useState(Date.now())
	const [ lastTestTimeDisplay, setLastTestTimeDisplay ] = useState("00:00")
	const [ textToShare, setTextToShare ] = useState(null)
	
	const revertToInitialState = () => {
		setStartTime(null)
		setSeconds(-1)
		setTimeDisplay("00:00")
		setCurrentQuestion(0)
		answers.current = []
		setAnswer(null)
		setQuestions(null)
		setCanTakeTest(0)
		setLastTestTime(Date.now())
		setLastTestTimeDisplay("00:00")
	}
	
	const changeLastTest = () => {
		const time = Date.now()
		if (window && window.Storage !== undefined){
			window.localStorage.setItem("last-test", String(time))
		}
	}
	
	const startQuiz = async () => {
		let lastTest, ctt
		if (window && window.Storage !== undefined){
			lastTest = Number(window.localStorage.getItem("last-test"))
		}
		const currentTime = Date.now()
		if (lastTest){
			setLastTestTime(lastTest)
			const timePassed = (currentTime-lastTest)/1000 // in seconds
			if (timePassed >= retestTimeout){
				setCanTakeTest(1)
				ctt = 1
			}
			else {
				setCanTakeTest(2)
				ctt = 2
			}
		}
		else {
			setCanTakeTest(1)
			ctt = 1
		}
		
		if (!questions && ctt === 1){
			setQuestions("loading")
			try {
				const q = await axios.get("/api/questions")
				setQuestions(q.data)
				setStartTime(Date.now())
				setSeconds(0)

				changeLastTest()
			}
			catch {
				revertToInitialState()
			}
		}
	}

	const quit = () => {
		if (seconds < maxTime && answers.current.length < questions.length){
			if (confirm("Are you sure you want to quit the test?")){
				secondsRef.current = -1
				revertToInitialState()

				changeLastTest()
			}
		}
	}
	
	const next = async (qid, aid) => {
		if (seconds < maxTime && qid && aid){
			if (answers.current.length < questions.length){
				answers.current = [...answers.current, {qid, aid}]
				if (qid < questions.length){
					setCurrentQuestion(currentQuestion+1)
				}
			}
			if (qid === questions.length && result !== "loading"){
				setResult("loading")
				changeLastTest()
				try {
					const req = await axios.post("/api/result", answers.current)
					const res = req.data
					console.log(res)
					setResult(res)
				}
				catch {
					setResult(null)
				}
			}
		}
	}
	
	const selectOption = option => {
		setAnswer(option)
	}
	
	useEffect(() => {
		if (startTime && questions && questions.length && answers.current.length < questions.length && canTakeTest === 1){
			secondsRef.current = seconds

			if (seconds < maxTime){
				setTimeout(() => {
					if (secondsRef.current > -1){
						const timeNow = Date.now()
						const secondsPassed = Math.floor((timeNow-startTime)/1000)
						setSeconds(secondsPassed)
					}
				}, 1000)
			}
		}
	}, [startTime, seconds, questions, canTakeTest])

	useEffect(() => {
		if (seconds > -1){
			if (seconds < maxTime){
				const timeRemaining = maxTime - seconds
				let min = Math.floor(timeRemaining/60)
				let sec = timeRemaining-(min*60)

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
				changeLastTest()
			}
		}
	}, [seconds])
	
	useEffect(() => {
		setAnswer(null)
	}, [currentQuestion])
	
	useEffect(() => {
		if (window){
			window.onbeforeunload = (seconds > -1 && seconds < maxTime && answers.current.length < questions.length && canTakeTest === 1) ? e => {
				changeLastTest()
				e.returnValue = "You are about to quit the test!"
			} : null
		}
	}, [seconds, questions, canTakeTest])

	useEffect(() => {
		if (canTakeTest === 2){
			setTimeout(() => {
				startQuiz()
				
				const currentTime = Date.now()
				const timePassed = retestTimeout-Math.floor((currentTime-lastTestTime)/1000) // in seconds
				let min = Math.floor(timePassed/60)
				let sec = timePassed-(min*60)

				if (min < 10){
					min = `0${min}`
				}
				if (sec < 10){
					sec = `0${sec}`
				}
				
				setLastTestTimeDisplay(`${min}:${sec}`)
			}, lastTestTimeDisplay === "00:00" ? 0 : 1000)
		}
	}, [canTakeTest, lastTestTime, lastTestTimeDisplay])
	
	return (
		<StyledHome>
			<Head>
				<title>{metaData.title}</title>
                <meta property="og:title" content={metaData.title} key="title"/>
				<meta name="description" content={metaData.description}/>
                <meta property="og:description" content={metaData.description} key="description"/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
			</Head>
			{
				textToShare ?
				<Share text={textToShare} exit={() => setTextToShare(null)}/> : ""
			}
			{
				(seconds < 0 && seconds < maxTime && (!result || result === "loading") && canTakeTest === 0) ?
				<div className="intro">
					<div className="sub-container">
						<div className="title">qui<span>zzs</span></div>
						<h1>Answer 15 product management questions in 15 minutes</h1>
						<p className="intro-line">There are 15 multiple choice questions and you will have 15 minutes to complete. All questions are mandatory and there are no negative marking. After you&apos;re done, you will be able to see how you did and share the results.</p>
						<button type="button" className={`start-btn${questions === "loading" ? " loading" : ""}`} onClick={startQuiz}><img src="/loading.gif" alt="loading"/>Start Quiz</button>
					</div>
				</div> : ""
			}
			{
				(seconds > -1 && seconds < maxTime && (!result || result === "loading") && canTakeTest === 1) ?
				<div className="questions">
					<header>
						<div className="sub-container">
							<div className={`timer${seconds >= maxTime ? " up" : ""}`}>{timeDisplay}</div>
							<div className="current-question">{currentQuestion+1}/{questions.length}</div>
							<div className="btns">
								<button type="button" className="quit active" onClick={quit}>Quit test</button>
								<button
									type="button"
									className={`next${answer ? " active" : ""}${result === "loading" ? " loading" : ""}`}
									onClick={() => next(questions[currentQuestion].id, answer)}
								><img src="/loading.gif" alt="loading"/>Next</button>
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
			{
				seconds >= maxTime ?
				<div className="time-up">
					<div className="sub-container">
						<h2>Sorry, you&apos;re running out of time! Please come back later.</h2>
						<button type="button" className="restart-btn" onClick={() => window.location.reload()}>Restart</button>
					</div>
				</div> : ""
			}
			{
				(result && result !== "loading") ?
				<Result data={result} setTextToShare={setTextToShare}/> : ""
			}
			{
				canTakeTest === 2 ?
				<div className="cannot-take-test">
					<div className="sub-container">
						<h2>You can take the test again in <span>{lastTestTimeDisplay}</span></h2>
					</div>
				</div> : ""
			}
		</StyledHome>
	)

}

export default Home