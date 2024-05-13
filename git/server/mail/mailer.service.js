// mailer.service.js
const nodemailer = require("nodemailer");

const MailService = {
  sendWelcomeMail: async (email, username) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: "ivan.maslakov.99@mail.ru",
          pass: "bif2cYPnqpmgFxwZg4CJ",
        },
        tls: { rejectUnauthorized: false },
      });

      await transporter.sendMail({
        from: "Аэропорт Смязино <ivan.maslakov.99@mail.ru>",
        to: email,
        subject: "Аэропорт Смязино, Успешная регистрация!",
        text: `Дорогой ${username},\n\nМы рады, что вы пользуетесь нашим сайтом! Вы сможете у нас забронировать VIP-зал или просмотреть все рейсы, связанные с нашим аэропортом.`,
        html: `
          
         <div style="background: url('https://www.vnukovo.ru/thumbs/webp/resize/1280x-/uploads/content/home-slider-1-xl-2x.jpg') no-repeat center; background-size: cover; padding: 20px; text-align: center;">
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border: 1px solid #ddd;">
            <h2 style="color: #333;">Добро пожаловать в Аэропорт Смязино!</h2>
            <p style="color: #555;">Дорогой ${username},</p>
            <p style="color: #555;">
              Мы рады, что вы пользуетесь нашим сайтом! Теперь вы сможете бронировать VIP-зал или просматривать все рейсы, связанные с нашим аэропортом.
            </p>
            <p style="color: #555;">
              Если у вас возникнут вопросы, пожалуйста, свяжитесь с нашей службой поддержки.
            </p>
            <p style="color: #555;">С уважением,</p>
            <p style="color: #555;"><strong>Команда Аэропорта Смязино</strong></p>
          </div>
          </div>
          <!-- Футер с черным фоном и текстом -->
          <div style="background-color: #000; padding: 10px; text-align: center;">
            <p style="color: #fff; font-size: 24px;">СМЯЗИНО</p>
            <p style="color: white;">Спасибо, что выбрали нас!</p>
          </div>
      
          
          
        `,
      });

      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error(`Error sending welcome email to ${email}:`, error);
      throw error;
    }
  },
};

module.exports = MailService;
