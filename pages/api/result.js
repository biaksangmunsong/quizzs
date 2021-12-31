const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sunt enim dolore illum sapiente incidunt hic commodi accusamus rem laboriosam!\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, sunt enim dolore illum sapiente incidunt hic commodi accusamus rem laboriosam!"

const handler = (req, res) => {

    if (req.method === "POST"){
        try {
            const answers = req.body
            if (!answers){
                return res
                .status(400)
                .send("BAD REQUEST")
            }
            const correctAnswers = JSON.parse(process.env.ANSWERS)


            let score = 0
            let grade = "Bad"
            let cat1Score = 0
            let cat1Grade = "Bad"
            let cat2Score = 0
            let cat2Grade = "Bad"
            let cat3Score = 0
            let cat3Grade = "Bad"


            answers.forEach((a, i) => {
                if (correctAnswers[i].aid === a.aid){
                    score++
                    if (i < 5){
                        cat1Score++
                    }
                    else if (i >= 5 && i < 10){
                        cat2Score++
                    }
                    else {
                        cat3Score++
                    }
                }
            })

            
            const percentage = Math.floor((score/answers.length)*100)
            if (percentage > 66){
                grade = "Excellent"
            }
            else if (percentage <= 66 && percentage > 33){
                grade = "Not bad"
            }
            else {
                grade = "Bad"
            }


            const cat1Percentage = Math.floor((cat1Score/5)*100)
            if (cat1Percentage > 66){
                cat1Grade = "Excellent"
            }
            else if (cat1Percentage <= 66 && cat1Percentage > 33){
                cat1Grade = "Not bad"
            }
            else {
                cat1Grade = "Bad"
            }


            const cat2Percentage = Math.floor((cat2Score/5)*100)
            if (cat2Percentage > 66){
                cat2Grade = "Excellent"
            }
            else if (cat2Percentage <= 66 && cat2Percentage > 33){
                cat2Grade = "Not bad"
            }
            else {
                cat2Grade = "Bad"
            }


            const cat3Percentage = Math.floor((cat3Score/5)*100)
            if (cat3Percentage > 66){
                cat3Grade = "Excellent"
            }
            else if (cat3Percentage <= 66 && cat3Percentage > 33){
                cat3Grade = "Not bad"
            }
            else {
                cat3Grade = "Bad"
            }


            res
            .status(200)
            .json({
                score,
                grade,
                max: answers.length,
                percentage,
                detailedData: [
                    {
                        name: "Category 1",
                        score: cat1Score,
                        percentage: cat1Percentage,
                        max: 5,
                        grade: cat1Grade,
                        description
                    },
                    {
                        name: "Category 2",
                        score: cat2Score,
                        percentage: cat2Percentage,
                        max: 5,
                        grade: cat2Grade,
                        description
                    },
                    {
                        name: "Category 3",
                        score: cat3Score,
                        percentage: cat3Percentage,
                        max: 5,
                        grade: cat3Grade,
                        description
                    }
                ]
            })
        }
        catch {
            res
            .status(500)
            .send("SERVER ERROR")
        }
    }
    else {
        res
        .status(400)
        .send("BAD REQUEST")
    }

}

export default handler