const handler = (req, res) => {
    
    const categories = [
        {
            title: "Technical product manager",
            desc: "A technical product manager (PM) is a product manager with a strong technical background that is typically focused on the more technical aspects of the product. A technical PM works more closely with the engineering team than the business, sales, and marketing teams of the organization.",
            value: 0,
            full: 0,
            remark: "",
            color: "#2f9d52"
        },
        {
            title: "API product manager",
            desc: "The concept of Application Programming Interface (API) is that it allows two different applications to communicate with each other. For this to happen, an API product manager has to make sure that the systems in place continue to work effectively.",
            value: 0,
            full: 0,
            remark: "",
            color: "#742ea9"
        },
        {
            title: "UX product manager",
            desc: "UX is short for User Experience Design, and it can be defined as the branch of design that creates easy-to-use and delightful products that focus on the user's needs. UX is very important to all Product Managers because it is a key component of the 4 pillars of Product Leadership.",
            value: 0,
            full: 0,
            remark: "",
            color: "#ff0000"
        },
        {
            title: "Hardware product manager",
            desc: "As a Hardware Product Manager, you will engage with business and engineering teams to plan, investigate and launch improvement initiatives and product releases.",
            value: 0,
            full: 0,
            remark: "",
            color: "#e4c061"
        },
        {
            title: "AI product manager",
            desc: "An AI product manager is a specialized product management professional whose job is to manage the planning, development, launch, and success of products/solutions powered by AI, machine learning, and deep learning technologies.",
            value: 0,
            full: 0,
            remark: "",
            color: "#444444"
        },
        {
            title: "Startup product manager",
            desc: "Startup PMs, also known as “first product managers,” are responsible for setting up the very foundations of product management at a newly established company. Since they’re a crucial part of their company’s foundational team, there’s a lot of pressure involved. That being said, the job comes with many attractive intrinsic and financial perks.",
            value: 0,
            full: 0,
            remark: "",
            color: "#f9704b"
        },
        {
            title: "Growth product manager",
            desc: "Growth Product Managers are responsible for leading experimentation along with data-driven decision-making in an organization to drive products to reach the next level of scale, impact, and profitability. You need to analyze your experiment results and make improvements to your strategies constantly.",
            value: 0,
            full: 0,
            remark: "",
            color: "#999999"
        }
    ]
    
    if (req.method === "POST"){
        try {
            const answers = req.body ? req.body.answers : null
            const fullName = req.body ? req.body.fullName : null
            const correctAnswers = JSON.parse(process.env.ANSWERS)
            const questionsInCategories = JSON.parse(process.env.CATEGORIES)
            
            if (!answers || !fullName || answers.length !== correctAnswers.length){
                return res
                .status(400)
                .send("BAD REQUEST")
            }
            if (questionsInCategories.length !== categories.length){
                return res
                .status(500)
                .send("SERVER ERROR")
            }


            const full = answers.length
            let score = 0
            answers.forEach((a,i) => {
                if (a === correctAnswers[i]){
                    score++
                }
            })
            const percentage = Math.floor((score/full)*100)
            const remark = percentage > 80 ? percentage === 100 ? "Perfect" : "Excellent" : percentage > 50 ? "Not bad" : "Bad"
            
            
            let categoryFull = 0
            let categoryScore = 0
            categories.forEach((c,i) => {
                const questionsInCategory = questionsInCategories[i]
                questionsInCategory.forEach(qid => {
                    const correctAnswer = correctAnswers[qid]
                    const inputAnswer = answers[qid]

                    if (correctAnswer === inputAnswer){
                        c.value += 1
                    }
                })
                
                c.full = questionsInCategory.length
                const cPercentage = Math.floor((c.value/c.full)*100)
                c.remark = cPercentage > 80 ? cPercentage === 100 ? "You are fully qualified" : "You are qualified" : cPercentage > 50 ? "You need to improve a bit on this area" : "You need to improve on this area"
                categoryScore += c.value
                categoryFull += questionsInCategory.length
            })
            const categoryPercentage = Math.floor((categoryScore/categoryFull)*100)
            
            return res
            .status(200)
            .json({
                fullName,
                full,
                score,
                remark,
                detailedResult: {
                    full: categoryFull,
                    percentage: categoryPercentage,
                    details: categories
                }
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