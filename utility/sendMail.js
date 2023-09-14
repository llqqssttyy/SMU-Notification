import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { EMAIL_SERVICE, EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        user: EMAIL_ADDRESS, // 발신자 메일 주소
        pass: EMAIL_PASSWORD, // 발신자 메일 비밀번호
    },
});

export const sendMail = async (html, date) => {
    const mailOptions = {
        from: EMAIL_ADDRESS,
        to: EMAIL_ADDRESS,
        subject: `[${date}] 상명대학교 공지사항 알림`,
        html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log("Email Sent : ", info);
            return info;
        }
    });
};
