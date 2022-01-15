import StyledShare from "../styles/StyledShare"

const Share = ({data, exit}) => {
    
    return (
        <StyledShare>
            <div className="modal">
                <h1>Share result<button type="button" onClick={exit}><span></span><span></span></button></h1>
                <div className="btns">
                    <a href={`http://www.linkedin.com/shareArticle?mini=true&url=${data.url}`} target="_blank" rel="noreferrer">
                        <span>Share on Linkedin</span>
                    </a>
                    <a href={`whatsapp://send?text=${data.text}%0A%0A${data.url}`} dataaction="share/whatsapp/share" target="_blank" rel="noreferrer" className="mobile-only">
                        <span>Share on Whatsapp</span>
                    </a>
                    <a href={`https://twitter.com/share?url=${data.url}&amp;text=${data.text}&amp;hashtags=quizzs`} target="_blank" rel="noreferrer">
                        <span>Share on Twitter</span>
                    </a>
                    <a href={`mailto:?subject=Quizzs test result&amp;body=${data.text}%0A%0A${data.url}`} target="_blank" rel="noreferrer">
                        <span>Share on email</span>
                    </a>
                    <a href={`sms:?body=${data.text}%0A%0A${data.url}`} target="_blank" rel="noreferrer" className="mobile-only">
                        <span>Share on sms</span>
                    </a>
                    <a href={`http://reddit.com/submit?url=${data.url}&title=${data.text}`} target="_blank" rel="noreferrer">
                        <span>Share on Reddit</span>
                    </a>
                    <a href={`http://www.facebook.com/sharer.php?u=${data.url}`} target="_blank" rel="noreferrer">
                        <span>Share on Facebook</span>
                    </a>
                </div>
            </div>
            <div className="bg-layer" onClick={exit}></div>
        </StyledShare>
    )

}

export default Share