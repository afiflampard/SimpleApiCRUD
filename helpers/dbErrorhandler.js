"use strict"
const uniqueMessage = error =>{
    let output;
    try{
        let fieldname = error.message.substring(
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
        );
        console.log("CartAt", fieldName.charAt(0));
        console.log("Slice ",fieldName.slice(1))
        output = fieldName.charAt(0).toUpperCase()+
        fieldName.slice(1) + " Sudah ada";
    }catch(ex){
        output = "Email sudah ada";
    }
    return output;
};

exports.errorHandler = error =>{
    let message = "";
    if(error.code){
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
        
            default:
                message = "Ada yang salah";
                break;
        }
    }else{
        for(let errorName in error.errorors){
            if(error.errorors[errorName].message){
                message = error.errorors[errorName].message
            }
        }
    }
    return message;
}
