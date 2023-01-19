import axios from 'axios';

const nodemailer = require("nodemailer");

// Config
const mailConfig = {
    host: "smtp.gmail.com",
    port: 465, // or 587
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER, // your gmail account
        pass: process.env.NEXT_PUBLIC_GMAIL_PASS // your gmail app password
    }
}

const adminEmail = 'Atividades Complementares <noreply@cambauba.org.br>';

// Function for grabbing template files
async function getPubFile(file) {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${file}`);
    return res.data;
}

export default async function handler(req, res) {
    sendEmails(req, res);
}

async function sendEmails(req, res) {
    // Create our Nodemailer transport handler
    let transporter = nodemailer.createTransport(mailConfig);

    // Fetch our template files
    const template = await getPubFile("/email-templates/template.html");
    const inscricaoHtml = await getPubFile("/email-templates/inscricao.html");
    const inscricaoTxt = await getPubFile("/email-templates/inscricao.txt");

    // Format our recipient email address
    const recipEmail = `${req.body.name} <${req.body.email}>`;

    // Format our customer-bound email from received form data
    let sendHtml = template.replace("%BODY%", inscricaoHtml)
        .replace("%PRIORITARIA%", req.body.prioritaria)
        .replace("%ESPORTIVA%", req.body.esportiva)
        .replace("%CULTURAL%", req.body.cultural)
        .replace("%OPTATIVA%", req.body.optativa);

    let sendTxt = inscricaoTxt
        .replace("%PRIORITARIA%", req.body.prioritaria)
        .replace("%ESPORTIVA%", req.body.esportiva)
        .replace("%CULTURAL%", req.body.cultural)
        .replace("%OPTATIVA%", req.body.optativa);

    // Send our customer-bound email
    let info = await transporter.sendMail({
        from: adminEmail,
        to: recipEmail, // list of receivers
        subject: "Inscrição Realizada - Atividade Complementar 2023 ✔", // Subject line
        text: sendTxt, // plain text body
        html: sendHtml, // html body
    });

    if (info.messageId) {
        res.status(200).json({ status: 1 });
    } else {
        res.status(200).json({ status: 0, message: "Failed to send message!" });
    }
}