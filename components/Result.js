import { useState, useEffect } from "react"
import StyledResult from "../styles/StyledResult"

const ScoreGraphPoints = detailedData => {

    let max = 0
    detailedData.forEach(gd => max = gd.max > max ? gd.max : max)
    
    const points = []
    for (let i = 0; i < max; i++){
        points.push(i+1)
    }

    return (
        <>
            {
                points.map(p => {
                    return (
                        <div className={`point${p === 1 ? " one" : ""}`} key={p} style={{width: `${100/max}%`}}>
                            {p === 1 ? <span className="zero">0</span> : ""}
                            <span>{p}</span>
                        </div>
                    )
                })
            }
        </>
    )

}

const Result = ({data, setTextToShare}) => {
    
    const [ detailedData, setDetailedData ] = useState([])

    const share = () => {
        if (data){
            let tts = `Quizzs test result%0A%0AScore: ${data.score}/${data.max} (${data.grade})%0APercentage: ${data.percentage}%25`
            data.detailedData.forEach((dd,i) => {
                tts += `%0A%0A${dd.name}:%0AScore: ${dd.score}/${dd.max} (${dd.grade})%0APercentage: ${dd.percentage}%25%0ADescription: ${dd.description}`
            })
            
            if (window && window.navigator.canShare){
                window.navigator.share({text:tts.split("%0A").join("\n").split("%25").join("%")})
                .then(() => setTextToShare(null))
                .catch(() => setTextToShare(null))
            }
            else {
                setTextToShare(tts)
            }
        }
    }

    useEffect(() => {
        if (data.detailedData.length){
            setTimeout(() => {
                setDetailedData(data.detailedData)
            }, 100)
            
            const initialData = []
            data.detailedData.forEach(id => {
                initialData.push({
                    ...id,
                    score: 0
                })
            })
            setDetailedData(initialData)
        }
    }, [data])

    return (
        <StyledResult>
            <div className="sub-container">
                <div className="title">qui<span>zzs</span></div>
                <div className="card">
                    <div className="head">
                        Your Score
                        <div className="scores">
                            <div className="score">
                                <strong>{data.score}</strong>/{data.max}<span>{data.grade}</span>
                            </div>
                            <div className="percentage">
                                <strong>{data.percentage}</strong>%
                            </div>
                        </div>
                    </div>
                    <div className="graph">
                        {
                            detailedData.map((d,i) => {
                                return (
                                    <div className="category" key={i}>
                                        <div className="name">{d.name}</div>
                                        <div className="bar" style={{width: `${(d.score/d.max)*100}%`}}>
                                            <div className={`score${d.score < (d.max/2) ? " outside" : ""}`}><strong>{d.score}</strong>/{d.max}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="line-horizontal">{ScoreGraphPoints(detailedData)}</div>
                    </div>
                </div>
                {
                    detailedData.map((d,i) => {
                        return (
                            <div className="card" key={i}>
                                <div className="head">{d.name}</div>
                                <section>
                                    <div className="score"><strong>{d.score}</strong>/{d.max}<span>{d.grade}</span></div>
                                    <div className="percentage"><strong>{d.percentage}</strong>%</div>
                                    <div className="description">{d.description}</div>
                                </section>
                            </div>
                        )
                    })
                }
                <button type="button" className="share-btn" onClick={share}>Share Result</button>
            </div>
        </StyledResult>
    )

}

export default Result