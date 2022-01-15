import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { auth, db } from "../fbinit"
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import StyledSignIn from "../styles/StyledSignIn"
import StyledHeader from "../styles/StyledHeader"

const SignIn = () => {

    const metaData = {
		title: "Sign in to quizzs",
        description: "Sign in to answer 15 questions in 15 minutes."
    }
    
    const router = useRouter()
    const [ status, setStatus ] = useState({status: "loading"})
    const [ authUser, authLoading, authError ] = useAuthState(auth)
    const [ isNewUser, setIsNewUser ] = useState(false)
    const [ emailSent, setEmailSent ] = useState(false)
    const [ emailSendError, setEmailSendError ] = useState(null)
    const [ email, setEmail ] = useState("")
    const [ sendingEmail, setSendingEmail ] = useState(false)
    const [ emailIsValid, setEmailIsValid ] = useState(false)
    const [ name, setName ] = useState("")
    const [ phone, setPhone ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ profession, setProfession ] = useState("")
    const [ submittingNewUserForm, setSubmittingNewUserForm ] = useState(false)
    const [ newUserFormError, setNewUserFormError ] = useState(null)
    
    const sendSignInLink = address => {
		const actionCodeSettings = {
            url: window.location.href,
            handleCodeInApp: true
        }
        
        setEmailSendError(null)
        sendSignInLinkToEmail(auth, address, actionCodeSettings)
		.then(() => {
            setEmailSent(true)
            window.localStorage.setItem("emailForSignin", address)
            setSendingEmail(false)
        })
        .catch(error => {
            setEmailSent(false)
            setEmailSendError(error)
            setSendingEmail(false)
        })
    }

    const checkUserExists = async uid => {
        try {
            const userDataRef = doc(db, "users", uid)
            const userData = await getDoc(userDataRef)
            
            if (userData.exists()){
                router.replace("/")
            }
            else {
                setStatus({status: "new-user"})
                setIsNewUser(true)
            }
        }
        catch (error){
            setStatus({status: "error", error})
        }
    }

    const handleEmailChange = e => {
        setEmail(e.target.value)
        
        const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (regexEmail.test(e.target.value)){
            setEmailIsValid(true)
        }
        else {
            setEmailIsValid(false)
        }
    }

    const handleInputChange = e => {
        if (e.target.name === "name"){
            setName(e.target.value)
        }
        else if (e.target.name === "phone"){
            setPhone(e.target.value)
        }
        else if (e.target.name === "description"){
            setDescription(e.target.value)
            if (e.target.value && e.target.value !== "Professional"){
                setProfession(e.target.value)
            }
            else {
                setProfession("")
            }
        }
        else if (e.target.name === "profession"){
            setProfession(e.target.value)
        }
    }

    const createUserData = async (uid, emailAddress, usersName, phoneNumber, desc) => {
        try {
            const userDataRef = doc(db, "users", uid)
            setDoc(userDataRef, {
                name: usersName,
                email: emailAddress,
                phone: phoneNumber,
                description: desc
            })
            setSubmittingNewUserForm(false)
            window.localStorage.removeItem("userDataIncomplete")
            router.replace("/")
        }
        catch (error){
            setNewUserFormError(error)
            setSubmittingNewUserForm(false)
        }
    }

    const handleNewUserFormSubmit = e => {
        e.preventDefault()
        if (!submittingNewUserForm && authUser){
            setSubmittingNewUserForm(true)
            setNewUserFormError(null)
            createUserData(authUser.uid, authUser.email, name, phone, description !== "Professional" ? description : profession)
        }
    }
    
    const handleEmailSubmit = e => {
        e.preventDefault()
        
        if (!sendingEmail && emailIsValid){
            setSendingEmail(true)
            setEmailSendError(null)
            sendSignInLink(email)
        }
    }
    
    useEffect(() => {
        if (authUser){
            setIsNewUser(false)
            if (window.localStorage.getItem("userDataIncomplete")){
                setStatus({status: "new-user"})
                return setIsNewUser(true)
            }
            checkUserExists(authUser.uid)
        }
        else if (authError){
            setStatus({status: "error", error: authError})
        }
        else {
            if (!authLoading){
                if (isSignInWithEmailLink(auth, router.asPath)){
                    let emailForSignin = ""
                    
                    if (!window.Storage !== undefined){
                        emailForSignin = window.localStorage.getItem("emailForSignin")
                    }
                    
                    if (!emailForSignin){
                        emailForSignin = window.prompt("Please enter your email again to confirm?")
                    }
                    
                    signInWithEmailLink(auth, emailForSignin, router.asPath)
                    .then(() => {
                        window.localStorage.removeItem("emailForSignin")
                        window.localStorage.setItem("userDataIncomplete", "1")
                    })
                    .catch(error => {
                        setStatus({status: "error", error})
                    })
                }
                else {
                    setStatus({status: "not-signed-in"})
                }
            }
        }
    }, [authUser, authLoading, authError])
    
    return (
        <StyledSignIn>
            <Head>
				<title>{metaData.title}</title>
				<meta property="og:title" content={metaData.title} key="title"/>
				<meta name="description" content={metaData.description}/>
				<meta property="og:description" content={metaData.description} key="description"/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
			</Head>
            <StyledHeader>
                <div className="title always-centered">qui<span>zzs</span></div>
            </StyledHeader>
            <main>
                <div className="sub-container">
                    {
                        status.status === "loading" ?
                        <div className="loading"><img src="/loading-red.gif" alt="loading"/></div> : ""
                    }
                    {
                        status.status === "not-signed-in" ?
                        <form className="email-form" onSubmit={handleEmailSubmit}>
                            <h1>Sign in with email</h1>
                            <h2>Sign in without password, we&apos;ll send you a signin link to your inbox.</h2>
                            <div className="input-and-button">
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    className="email-input"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                <button type="submit" className={`${emailIsValid ? "active" : ""}${sendingEmail ? " loading" : ""}`}><img src="/loading.gif" alt="loading"/>Send email</button>
                            </div>
                            {
                                emailSent ?
                                <p className="message success">Email sent! Check your inbox for signin link.</p> : ""
                            }
                            {
                                emailSendError ?
                                <p className="message error">{emailSendError.message}</p> : ""
                            }
                        </form> : ""
                    }
                    {
                        isNewUser ?
                        <form className="new-user-form" onSubmit={handleNewUserFormSubmit}>
                            <h1>Almost ready</h1>
                            <h2>Answer a few more questions and you&apos;re ready to take the test.</h2>
                            <input type="text" className="short" name="name" placeholder="Full name *" onChange={handleInputChange} value={name} required/>
                            <input type="text" className="short no-margin" name="phone" placeholder="Phone number" onChange={handleInputChange} value={phone}/>
                            <select name="description" onChange={handleInputChange} value={description} required>
                                <option value="">What best describes you?</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="Student">Student</option>
                                <option value="Professional">Professional</option>
                            </select>
                            <input type={description === "Professional" ? "text" : "hidden"} name="profession" placeholder="Your Profession *" onChange={handleInputChange} value={profession} required={description === "Professional" ? true : false}/>
                            <button type="submit" className={`new-user-submit-btn${submittingNewUserForm ? " loading" : ""}`}><img src="/loading.gif" alt="loading"/>Submit</button>
                            {
                                newUserFormError ?
                                <p className="message error">{newUserFormError.message}</p> : ""
                            }
                        </form> : ""
                    }
                </div>
            </main>
            {
				status.status === "error" ?
                <div className="page-message">
					<div className="sub-container">
                        <h2>{status.error.message}</h2>
                        <button type="button" className="call-to-action" onClick={() => window.location.reload()}>Reload</button>
					</div>
				</div> : ""
			}
        </StyledSignIn>
    )

}

export default SignIn