const {SendMailClient} = require("zeptomail")

const url = "api.zeptomail.com/";
const token = "Zoho-enczapikey wSsVR61zrBakC6srlDP5Ie8wm1wGDlinRB8u2AOgvnGoHP2Upsc4lU3LAwWuSaMbETFhEjcV8Oogm0pV0mEIh94tmVtTDCiF9mqRe1U4J3x17qnvhDzPWGpZkBqMJYIMzghikmhgG84k+g==";

let client = new SendMailClient({url, token});

class SendMail{
    async send(to,subject,body){
        client.sendMail({
            "from": 
            {
                "address": "admin@wisdocity.ai",
                "name": "noreply"
            },
            "to": 
            [
                {
                "email_address": 
                    {
                        "address": to,
                        "name": "Admin"
                    }
                }
            ],
            "subject": subject,
            "htmlbody": body,
        }).then((resp) => console.log("success")).catch((error) => console.log("error"+error));
    }
}

module.exports = new SendMail();
