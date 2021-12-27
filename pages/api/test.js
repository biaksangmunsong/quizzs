const handler = (req, res) => {
    
    res.status(200).send(process.env.TEST)

}

export default handler