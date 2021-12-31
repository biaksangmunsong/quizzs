import StyledShare from "../styles/StyledShare"

const Share = ({text, exit}) => {
    
    return (
        <StyledShare>
            <div className="modal">
                <h1>Share result<button type="button" onClick={exit}><span></span><span></span></button></h1>
                <div className="btns">
                    <a href={`whatsapp://send?text=${text}`} dataaction="share/whatsapp/share" target="_blank" rel="noreferrer">
                        <span>Share via Whatsapp</span>
                    </a>
                    <a href={`https://twitter.com/share?url=https://quizzs.netlify.app&amp;text=${text}&amp;hashtags=quizzs`} target="_blank" rel="noreferrer">
                        <span>Share via Twitter</span>
                    </a>
                    <a href={`mailto:?subject=Quizzs test result&amp;body=${text}`} target="_blank" rel="noreferrer">
                        <span>Share via email</span>
                    </a>
                    <a href={`sms:?body=${text}`} target="_blank" rel="noreferrer">
                        <span>Share via sms</span>
                    </a>
                </div>
            </div>
            <div className="bg-layer" onClick={exit}></div>
        </StyledShare>
    )

}

export default Share