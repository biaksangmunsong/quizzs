import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { db } from "../../fbinit"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import Result from "../../components/Result"
import Share from "../../components/Share"
import styled from "styled-components"

const StyledResultPage = styled.div`
    display: block;
    width: 100%;

    .loading {
        display: flex;
        width: 100%;
        min-height: 100vh;
        padding: 50px 0;

        img {
            display: block;
            width: 60px;
            height: 60px;
            margin: auto;
        }
    }
    
    .message {
        display: flex;
        width: 100%;
        min-height: 100vh;
        padding: 50px 0;

        .sub-container {
            display: block;
            width: 90%;
            max-width: 600px;
            margin: auto;
            text-align: center;
            
            p {
                display: block;
                width: 100%;
                line-height: 40px;
                font-size: 30px;
                text-align: center;
                color: #ffffff;
                font-weight: 700;

                @media screen and (max-width: 600px){
                    line-height: 35px;
                    font-size: 25px;
                }
            }

            .cta {
                display: inline-block;
                padding: 0 30px;
                line-height: 40px;
                border: 0;
                border-radius: 4px;
                background: #ffffff;
                text-align: center;
                font-weight: 700;
                text-transform: uppercase;
                font-family: "Raleway", sans-serif;
                color: #222222;
                font-size: 14px;
                margin-top: 20px;

                @media screen and (max-width: 600px){
                    line-height: 38px;
                    font-size: 13px;
                }
            }
        }
    }
`

const ResultPage = () => {
    
    const router = useRouter()
    const [ email, setEmail ] = useState("")
    const [ result, setResult ] = useState(null)
    const [ dataToShare, setDataToShare ] = useState(null)
    const [ metaData, setMetaData ] = useState({
        title: "Quizzs Result",
        description: "View quiz result on Quizzs"
    })
    
    useEffect(() => {
        if (router.query.email){
            setEmail(router.query.email)
        }
    }, [router])
    
    useEffect(() => {
        if (email && db){
            const resultRef = doc(db, "results", email)
            getDoc(resultRef).then(result => {
                if (result.exists()){
                    setResult(result.data())
                }
                else {
                    setResult("404")
                }
            }).catch(() => {
                setResult("error")
            })
        }
    }, [email])

    useEffect(() => {
        if (result){
            setMetaData({
                title: `Quizzs Result - ${result.fullName}`,
                description: `View quiz result of ${result.usersName} on Quizzs`
            })
        }
    }, [result])
    
    return (
        <StyledResultPage>
            <Head>
				<title>{metaData.title}</title>
				<meta property="og:title" content={metaData.title} key="title"/>
				<meta name="description" content={metaData.description}/>
				<meta property="og:description" content={metaData.description} key="description"/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
                <meta name="msapplication-TileColor" content="#dddddd"/>
                <meta name="theme-color" content="#dddddd"/>
			</Head>
            {
                !result ?
                <div className="loading"><img src="/loading.gif" alt="loading"/></div> : ""
            }
            {
				dataToShare ?
				<Share data={dataToShare} exit={() => setDataToShare(null)}/> : ""
			}
            {
                (result && typeof(result) !== "string") ?
                <Result data={result} setDataToShare={setDataToShare} fullName={result.fullName} email={email}/> : ""
            }
            {
                result === "error" ?
                <div className="message">
					<div className="sub-container">
						<p>Something went wrong! Please try again.</p>
						<button type="button" className="cta" onClick={() => window.location.reload()}>Reload</button>
					</div>
				</div> : ""
            }
            {
                result === "404" ?
                <div className="message">
					<div className="sub-container">
                        <p>Result not found!</p>
					</div>
				</div> : ""
            }
        </StyledResultPage>
    )

}

export default ResultPage