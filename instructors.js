const fs = require('fs');
const data = require("./data.json");
const { age } = require('./utils');

exports.show = (req, res)=>{
    const { id } = req.params;

    const foundInstructor = data.instructors.find((instructor)=>{
        return id == instructor.id;     
    })

    if(!foundInstructor) return res.send("instructor not found");


    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
    }
    return res.render("instructors/show",{instructor});
}

exports.post = (req, res)=>{
    const keys = Object.keys(req.body);
 
    for(key of keys) {
        if (req.body[key] == ""){
            return res.send("Por favor preencha todos os campos");
        }
    }

    let {avatar_url, name, birth, gender, services }=req.body;

    const id = Number(data.instructors.length + 1);
    birth = Date.parse(req.body.birth);
    const created_at = Date.now();
    
 
    data.instructors.push({
        id,
        avatar_url,
        name,
        gender,
        birth,
        services,
        created_at,
    });
    

    fs.writeFile("data.json", JSON.stringify(data, null, 2),(err)=>{
        if(err){
            return res.send(err);
        }else{
            return res.redirect("/instructors");
        }
    })

}

exports.edit = (req, res)=>{
    const { id } = req.params;

    const foundInstructor = data.instructors.find((instructor)=>{
        return id == instructor.id;     
    })

    if(!foundInstructor) return res.send("instructor not found");

    return res.render('instructors/edit',{instructor: foundInstructor});
}
