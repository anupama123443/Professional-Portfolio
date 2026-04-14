require ('dotenv').config();
const nodemailer  = require("nodemailer");


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.Email_User,
        pass: process.env.Email_Password,
    },
});

const mailOption = {
    from : process.env.Email_User,
    to : process.env.Email_User,
    subject : "email varification",
    text : "Hello, email is sent ",
};

transporter.sendMail(mailOption ,(error,info) => {
    if(error){
        return console.log("Error occured", error);
    }
    console.log("Email sent successfully",info.response);
});