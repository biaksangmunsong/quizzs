import { useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import StyledResult from "../styles/StyledResult"

const Result = ({data, setDataToShare, usersName, usersUID}) => {
    
    const [ hoveredCategoryOnChart, setHoveredCategoryOnChartOnChart ] = useState(-1)
    const [ hoveredCategoryOnRef, setHoveredCategoryOnChartOnRef ] = useState(-1)
    
    const share = () => {
        if (data){
            const text = `Quizzs Result - ${usersName}`
            const url = `${window.location.origin}/result?id=${usersUID}`
            
            if (window && window.navigator.canShare){
                window.navigator.share({text,url})
                .then(() => setDataToShare(null))
                .catch(() => setDataToShare(null))
            }
            else {
                setDataToShare({text,url})
            }
        }
    }
    
    return (
        <StyledResult>
            <div className="sub-container">
                <h1>Quiz Result</h1>
                <div className="users-name">{data.usersName}</div>
                <div className="card">
                    <div className="head">
                        Overview
                        <div className="right">
                            <strong>{data.score}</strong>/{data.full}<span>{data.remark}</span>
                        </div>
                    </div>
                    <div className="pie-chart">
                        <div className="chart">
                            <PieChart
                                startAngle={-90}
                                totalValue={data.detailedResult.full}
                                data={data.detailedResult.details}
                                label={({dataEntry}) => {
                                    const percentage = Math.floor((dataEntry.value/data.detailedResult.full)*100)
                                    if (percentage > 3){
                                        return `${percentage}%`
                                    }
                                    return ""
                                }}
                                labelStyle={{
                                    fontSize: "5px",
                                    fill: "#ffffff"
                                }}
                                lineWidth={50}
                                labelPosition={75}
                                animate={true}
                                paddingAngle={2}
                                onMouseOver={(e, i) => setHoveredCategoryOnChartOnChart(i)}
                                onMouseOut={() => setHoveredCategoryOnChartOnChart(-1)}
                                segmentsShift={i => i === hoveredCategoryOnRef ? 5 : 0}
                                radius={45}
                            />
                            <div className="percentage"><strong>{data.detailedResult.percentage}</strong>%</div>
                        </div>
                        <div className="reference">
                            {
                                data.detailedResult.details.map((dr,i) => {
                                    return (
                                        <div
                                            className={`category${hoveredCategoryOnChart > -1 ? " blured" : ""}${hoveredCategoryOnChart === i ? " hovered" : ""}`}
                                            onMouseOver={() => setHoveredCategoryOnChartOnRef(i)}
                                            onMouseOut={() => setHoveredCategoryOnChartOnRef(-1)}
                                            key={i}
                                        >
                                            <div className="color-code" style={{background: dr.color}}></div>
                                            <div className="category-title">{dr.title}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    data.detailedResult.details.map((dr,i) => {
                        return (
                            <div className="card" key={i}>
                                <div className="head">
                                    {dr.title}
                                    <div className="right"><strong>{Math.floor((dr.value/dr.full)*100)}</strong>%</div>
                                </div>
                                <section>
                                    <div className="score"><strong>{dr.value}</strong>/{dr.full}<span>{dr.remark}</span></div>
                                    <div className="description">{dr.desc}</div>
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