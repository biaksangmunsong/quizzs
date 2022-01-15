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
        padding: 60px 0;
        position: relative;
        
        &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            background-image: url(/pexels-gdtography-911738.jpg);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            opacity: .2;
        }

        .sub-container {
            display: block;
            width: 90%;
            max-width: 1000px;
            margin: auto;
            text-align: center;
            position: relative;
            z-index: 2;

            h2 {
                display: block;
                width: 100%;
                line-height: auto;
                font-size: 3.5rem;
                text-align: center;
                font-weight: 700;
                margin-bottom: 40px;
                
                @media screen and (max-width: 1200px){
                    font-size: 3rem;
                }

                @media screen and (max-width: 1000px){
                    font-size: 2.6rem;
                }

                @media screen and (max-width: 600px){
                    font-size: 2.2rem;
                }
                
                @media screen and (max-width: 500px){
                    font-size: 2rem;
                }
                
                @media screen and (max-width: 400px){
                    font-size: 1.9rem;
                }
            }
            
            .call-to-action {
                display: inline-block;
                height: 50px;
                overflow: hidden;
                padding: 0 50px;
                font-size: 1rem;
                text-align: center;
                font-weight: 700;
                border: 0;
                border-radius: 5px;
                outline: 0;
                background: #8a2be2;
                color: #ffffff;
                position: relative;
                cursor: pointer;

                img {
                    display: inline-block;
                    vertical-align: middle;
                    width: 20px;
                    opacity: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                }
                
                &:active {
                    background: #0000ff;
                }

                &.loading {
                    color: transparent;
                    cursor: progress;
                    
                    img {
                        opacity: 1;
                    }
                }
                
                @media screen and (max-width: 600px){
                    font-size: .8rem;
                }
            }
        }
    }
`

const ResultPage = () => {
    
    const router = useRouter()
    const [ usersUID, setUsersUID ] = useState("")
    const [ result, setResult ] = useState(null)
    const [ dataToShare, setDataToShare ] = useState(null)
    const [ metaData, setMetaData ] = useState({
        title: "Quizzs Result",
        description: "View quiz result on Quizzs"
    })
    
    useEffect(() => {
        if (router.query.id){
            setUsersUID(router.query.id)
        }
    }, [router])

    useEffect(() => {
        if (usersUID && db){
            const resultRef = doc(db, "results", usersUID)
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
    }, [usersUID])

    useEffect(() => {
        if (result){
            setMetaData({
                title: `Quizzs Result - ${result.usersName}`,
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
			</Head>
            {
                !result ?
                <div className="loading"><img src="/loading-red.gif" alt="loading"/></div> : ""
            }
            {
				dataToShare ?
				<Share data={dataToShare} exit={() => setDataToShare(null)}/> : ""
			}
            {
                (result && typeof(result) !== "string") ?
                <Result data={result} setDataToShare={setDataToShare} usersName={result.usersName} usersUID={usersUID}/> : ""
            }
            {
                result === "error" ?
                <div className="message">
					<div className="sub-container">
						<h2>Something went wrong! Please try again.</h2>
						<button type="button" className="call-to-action" onClick={() => window.location.reload()}>Reload</button>
					</div>
				</div> : ""
            }
            {
                result === "404" ?
                <div className="message">
					<div className="sub-container">
                        <h2>Result not found!</h2>
					</div>
				</div> : ""
            }
        </StyledResultPage>
    )

}

export default ResultPage