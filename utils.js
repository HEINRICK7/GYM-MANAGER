
module.exports = {
    age: (timestamp)=>{
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();

        const month = today.getMonth() - birthDate.getMonth();


        if (month < 0 ||
            month == 0  &&
            today.getDate() <= birthDate.getDate()){

            // o mesmo que age = age - 1    
             --age;

            }

        return age;
    }
}