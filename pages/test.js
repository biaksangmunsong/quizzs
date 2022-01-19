import { useState, useEffect } from "react"
import Head from "next/head"
import { db } from "../fbinit"
import { doc, getDoc } from "firebase/firestore"
import Form from "../components/Form"
import Questions from "../components/Questions"
import StyledTest from "../styles/StyledTest"

const Test = () => {

    const metaData = {
		title: "Product Management Skills Assessment Test",
		description: "The first AI-based test that assists you in scoring and evaluating your abilities prior to applying to top product companies. It's free and only takes 45 minutes."
    }
    
    const [ userDetails, setUserDetails ] = useState("loading")
    const [ userForm, setUserForm ] = useState({
        email: "",
        fullName: "",
        phone: "",
        description: "",
        profession: "",
		lastTest: 0
    })
    
    useEffect(() => {
        if (db){
            if (window && window.Storage !== undefined){
                const usersEmail = window.localStorage.getItem("email")
                if (usersEmail){
                    const usersDetailsRef = doc(db, "users", usersEmail)
                    getDoc(usersDetailsRef)
                    .then(snapshot => {
                        if (snapshot.exists()){
                            setUserDetails(snapshot.data())
                        }
                        else {
                            setUserDetails(null)
                        }
                    })
                    .catch(() => {
                        setUserDetails("error")
                    })
                }
                else {
                    setUserDetails(null)
                }
            }
            else {
                setUserDetails(null)
            }
        }
    }, [])
    
    return (
        <StyledTest>
            <Head>
				<title>{metaData.title}</title>
				<meta property="og:title" content={metaData.title} key="title"/>
				<meta name="description" content={metaData.description}/>
				<meta property="og:description" content={metaData.description} key="description"/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
			</Head>
            {
                userDetails === "loading" ?
                <div className="page-loading"><img src="/loading.gif" alt="loading"/></div> : ""
            }
            {
                !userDetails ?
                <Form
                    userForm={userForm}
                    setUserForm={setUserForm}
                    setUserDetails={setUserDetails}
                /> : ""
            }
            {
                userDetails === "error" ?
                <div className="message">
                    <div className="sub-container">
                        <p>Something went wrong, please try again.</p>
                        <button type="button" className="cta" onClick={() => window.location.reload()}>Reload</button>
                    </div>
                </div> : ""
            }
            {
                (userDetails && typeof(userDetails) === "object") ?
                <Questions userDetails={userDetails}/> : ""
            }
        </StyledTest>
    )

}

export default Test