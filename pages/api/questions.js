import fs from "fs"
import path from "path"

const handler = (req, res) => {

    if (req.method === "GET"){
        try {
            const questions = JSON.parse(fs.readFileSync(path.join(process.cwd(), "res", "questions.json")))
            res
            .status(200)
            .json(questions)
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