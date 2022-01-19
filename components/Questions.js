import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { db } from "../fbinit"
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore"
import StyledQuestions from "../styles/StyledQuestions"

const maxTime = 2700 // in seconds
const retestTimeout = 60 // in seconds

const Questions = ({userDetails}) => {
    
    const router = useRouter()
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
	const [ lastTestTime, setLastTestTime ] = useState(null)
	const [ lastTestTimeDisplay, setLastTestTimeDisplay ] = useState("00:00")
    
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
		if (db){
            const time = Date.now()
            const userDataRef = doc(db, "users", userDetails.email)
            setLastTestTime(time)
			updateDoc(userDataRef, {
				lastTest: time
			})
        }
	}
	
	const quit = () => {
		if (seconds < maxTime && answers.current.length < questions.length){
			if (confirm("Are you sure you want to quit the test?")){
				secondsRef.current = -1
				revertToInitialState()

				changeLastTest()
                router.push("/")
            }
        }
	}
	
	const next = async (qid, aid) => {
		if (seconds < maxTime && qid && aid){
			if (answers.current.length < questions.length){
				answers.current = [...answers.current, aid]
				if (qid < questions.length){
					setCurrentQuestion(currentQuestion+1)
				}
			}
			if (qid === questions.length && result !== "loading"){
				setResult("loading")
				changeLastTest()
				try {
					const req = await axios.post("/api/result", {
						fullName: userDetails.fullName,
						answers: answers.current
					})
					const res = {
                        ...req.data,
						lastUpdated: Timestamp.now().toMillis()
					}
					const resultRef = doc(db, "results", userDetails.email)
					await setDoc(resultRef, res)
					router.replace(`/result?email=${userDetails.email}`)
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

    const startQuiz = () => {
        let ctt
		const lastTest = lastTestTime || userDetails.lastTest
        const currentTime = Date.now()
        const timePassed = (currentTime-lastTest)/1000 // in seconds
		if (timePassed >= retestTimeout){
			setCanTakeTest(1)
			ctt = 1
		}
		else {
			setCanTakeTest(2)
			ctt = 2
		}
		
		if (!questions && ctt === 1){
			setQuestions("loading")
            const questionsRef = doc(db, "questions", "questions")
            getDoc(questionsRef)
            .then(snapshot => {
                setQuestions(snapshot.data().questions)
                setStartTime(Date.now())
                setSeconds(0)
                changeLastTest()
            })
            .catch(() => {
                revertToInitialState()
            })
        }
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
		if (canTakeTest === 2 && userDetails){
			setTimeout(() => {
				startQuiz()
				
				const currentTime = Date.now()
				const lastTest = lastTestTime || userDetails.lastTest
				const timePassed = retestTimeout-Math.floor((currentTime-lastTest)/1000) // in seconds
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
	
	useEffect(() => {
		startQuiz()
    }, [])
    
    return (
        <StyledQuestions>
            {
				(seconds > -1 && seconds < maxTime && (!result || result === "loading") && canTakeTest === 1) ?
				<>
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
								><img src="/loading-red.gif" alt="loading"/>Next</button>
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
				</> : ""
			}
			{
                seconds >= maxTime ?
                <div className="message">
					<div className="sub-container">
						<p>Sorry, you&apos;re running out of time! Please come back later.</p>
						<button type="button" className="cta" onClick={() => window.location.reload()}>Reload</button>
					</div>
				</div> : ""
			}
			{
                canTakeTest === 2 ?
                <div className="message">
					<div className="sub-container">
						<p>You can take the test again in <span>{lastTestTimeDisplay}</span></p>
					</div>
				</div> : ""
			}
        </StyledQuestions>
    )

}

export default Questions