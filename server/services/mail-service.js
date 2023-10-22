const nodemailer = require("nodemailer")

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            host:"smtp.gmail.com",
            port:587,
            secure: false,
            auth: {
                user:process.env.GMAIL_USER_EMAIL,
                pass:process.env.GMAIL_USER_PASSWORD
            }
        })
    }
    async SendActivationMail(to, link) {
        try {
            var api_domail = process.env.API_URL
            console.log(api_domail)
            var mailOptions = {
                from: process.env.GMAIL_USER_EMAIL,
                to:to,
                subject: `Hello ${to} it's your activation link`,
                text:"",
                html:
                `
                    <div>
                        <h1>For activate click</h1>
                        <a href="${api_domail}/api/activate/${link}"><div style="width:50%; height:40%; color:white; background-color:blue; margin: 0 auto; border-radius:10px; display:flex; algin-items:center; justify-content:center;"><h1 style="margin: 0 auto">Activate</h1></div></a>
                    </div>
                `
            }
            this.transporter.sendMail(mailOptions, (err,res) => {
                if (err) {
                    throw new Error(err)
                }
            })
        }
        catch(e) {
            throw new Error(e)
        }
    }
}

module.exports = new MailService()