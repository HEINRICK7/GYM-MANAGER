exports.post = (req, res)=>{
    const keys = Object.keys(req.body)
 
    for(key of keys) {
        if (req.body[key]== ""){
            return res.send("Por favor preencha todos os campos")
        }
    }
    return res.send(req.body)
 }
 