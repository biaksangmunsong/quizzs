import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import axios from "axios"
import { auth, db } from "../fbinit"
import { signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import Share from "../components/Share"
import Result from "../components/Result"
import StyledHome from "../styles/StyledHome"
import StyledHeader from "../styles/StyledHeader"

const maxTime = 900 // in seconds
const retestTimeout = 60 // in seconds

const Home = () => {
	
	const metaData = {
		title: "Answer 15 product management questions in 15 minutes",
		description: "There are 15 multiple choice questions and you will have 15 minutes to complete. All questions are mandatory and there are no negative marking. After you're done, you will be able to see how you did and share the results."
	}

	const router = useRouter()

	const [ authUser, authLoading, authError ] = useAuthState(auth)
	const [ usersData, setUsersData ] = useState(null)
	const [ userDataStatus, setUserDataStatus ] = useState("")
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
	const [ dataToShare, setDataToShare ] = useState(null)
	
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
		if (db && authUser){
			const time = Date.now()
			const userDataRef = doc(db, "users", authUser.uid)
			setLastTestTime(time)
			updateDoc(userDataRef, {
				lastTest: time
			})
		}
	}

	const signUserOut = async () => {
		try {
			if (window.confirm("Sign out?")){
				await signOut(auth)
				window.location.reload()
			}
		}
		catch {
			alert("Something went wrong, Please try again later!")
		}
	}
	
	const startQuiz = async () => {
		if (usersData){
			let ctt
			const lastTest = lastTestTime || usersData.lastTest
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
				try {
					const qs = [
						{
							id: 1,
							question: "A leading OTT player has just been launched in the Indian market. It has a wide variety of content in more than 10 languages and includes movies, TV shows, music and a lot more. The company is very optimistic of its success in India and wants to look at different modes of monetisation. Which of these monetisation model you would NOT propose for the app?",
							options: [
								{
									id: "A",
									text: "Ad-supported model"
								},
								{
									id: "B",
									text: "Subscription model"
								},
								{
									id: "C",
									text: "Referral traffic model"
								},
								{
									id: "D",
									text: "Content sale model/ App in app model"
								}
							]
						},
						{
							id: 2,
							question: "A few more years down the line, the OTT has seen some difficult times and is seeing a fall in engagement & retention of its users. Which of these is NOT a direct metric to look at while trying to find a solution to this problem?",
							options: [
								{
									id: "A",
									text: "No of new users who stream at least one content piece after launching the app for the 1st time"
								},
								{
									id: "B",
									text: "Average no. of hours streamed on the app per month by a user"
								},
								{
									id: "C",
									text: "Average no. of app crashes per sessionper user"
								},
								{
									id: "D",
									text: "No. of users who uninstall the app withD7 (Day 7) of installing the app"
								}
							]
						}
					]
					const questionsRef = doc(db, "questions", "questions")
					const q = await getDoc(questionsRef)
					
					setQuestions(q.data().questions)
					setStartTime(Date.now())
					setSeconds(0)
					
					changeLastTest()
				}
				catch {
					revertToInitialState()
				}
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
						usersName: usersData.name,
						answers: answers.current
					})
					const res = req.data
					const resultRef = doc(db, "results", authUser.uid)
					await setDoc(resultRef, res)
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

	const checkUserExists = async uid => {
		setUserDataStatus("loading")
		try {
			const userDataRef = doc(db, "users", uid)
			const userData = await getDoc(userDataRef)
			
			if (!userData.exists()){
				window.localStorage.setItem("userDataIncomplete", "1")
				router.replace("/signin")
			}
			else {
				setUserDataStatus("ready")
				setUsersData(userData.data())
			}
		}
		catch {
			setUserDataStatus("error")
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
		if (canTakeTest === 2 && usersData){
			setTimeout(() => {
				startQuiz()
				
				const currentTime = Date.now()
				const lastTest = lastTestTime || usersData.lastTest
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
		if (authUser && window){
			if (window.localStorage.getItem("userDataIncomplete")){
				return router.replace("/signin")
			}
			checkUserExists(authUser.uid)
		}
	}, [authUser, authError])
	
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
				dataToShare ?
				<Share data={dataToShare} setDataToShare={setDataToShare} exit={() => setDataToShare(null)}/> : ""
			}
			{
				(seconds < 0 && seconds < maxTime && (!result || result === "loading") && canTakeTest === 0) ?
				<div className="intro">
					<StyledHeader>
						<div className="title">qui<span>zzs</span></div>
						{
							(!authLoading && !authError && authUser) ?
							<button type="button" className="sign-out-btn" onClick={signUserOut}>Sign out</button> : ""
						}
					</StyledHeader>
					<div className="sub-container">
						{
							userDataStatus === "error" ?
							<h1>Something went wrong, please try again!</h1> : ""
						}
						{
							authError ?
							<h1>{authError.message}</h1> :
							<>
								<h1>Answer 15 product management questions in 15 minutes</h1>
								<p className="intro-line">There are 15 multiple choice questions and you will have 15 minutes to complete. All questions are mandatory and there are no negative marking. After you&apos;re done, you will be able to see how you did and share the results.</p>
							</>
						}
						{
							(!authLoading && !authError && authUser && userDataStatus === "ready") ?
							<button type="button" className={`call-to-action${questions === "loading" ? " loading" : ""}`} onClick={startQuiz}><img src="/loading.gif" alt="loading"/>Start Quiz</button> :
							<>
								{
									(!authLoading && !authError && !authUser && userDataStatus === "") ?
									<Link href="/signin">
										<button type="button" className={`call-to-action${questions === "loading" ? " loading" : ""}`}><img src="/loading.gif" alt="loading"/>Sign in to start</button>
									</Link> : ""
								}
								{
									((authLoading && !authError && !authUser) || userDataStatus === "loading") ?
									<button type="button" className="call-to-action loading"><img src="/loading.gif" alt="loading"/>Loading</button> : ""
								}
								{
									((!authLoading && authError && !authUser) || userDataStatus === "error") ?
									<button type="button" className="call-to-action" onClick={() => window.location.reload()}>Reload</button> : ""
								}
							</>
						}
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
				<div className="message">
					<div className="sub-container">
						<h2>Sorry, you&apos;re running out of time! Please come back later.</h2>
						<button type="button" className="call-to-action" onClick={() => window.location.reload()}>Restart</button>
					</div>
				</div> : ""
			}
			{
				(result && result !== "loading" && usersData && authUser) ?
				<Result data={result} setDataToShare={setDataToShare} usersName={usersData.name} usersUID={authUser.uid}/> : ""
			}
			{
				canTakeTest === 2 ?
				<div className="message">
					<div className="sub-container">
						<h2>You can take the test again in <span>{lastTestTimeDisplay}</span></h2>
					</div>
				</div> : ""
			}
		</StyledHome>
	)

}

export default Home