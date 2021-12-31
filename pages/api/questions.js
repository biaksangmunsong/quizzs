import fs from "fs"
import path from "path"

const handler = (req, res) => {

    if (req.method === "GET"){
        try {
            const questions = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "questions.json")))
            res
            .status(200)
            .json(questions)
        }
        catch (err) {
            res
            .status(500)
            .send(err)
        }
    }
    else {
        res
        .status(400)
        .send("BAD REQUEST")
    }

}

export default handler