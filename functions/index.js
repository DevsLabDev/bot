const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const nodemailer = require('nodemailer');
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'devslabgt@gmail.com',
    pass: 'devslab1234',
  },
});
const APP_NAME = 'DevsLab GT';
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.addMember = functions.https.onRequest((request, response) => {
	console.log(request.body);
	admin.database().ref("members").push({
		"name": request.body['first name'] + " " + request.body['last name'],
		"email": request.body.EMAIL,
		"phone": request.body.PHONE,
		"gender": request.body.gender,
	});
});
// [START sendRegisterEmail]
exports.sendWelcomeEmail = functions.database.ref('members/{assistant}').onCreate((event) => {
	var registro = event.data.val();
  return sendWelcomeEmail(registro.email, registro.name);
});
// [END sendRegisterEmail]
function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <info@devslabgt.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `¡Bienvenido a  ${APP_NAME}!`;
  mailOptions.text = `¡Hola ${displayName || ""}! Bienvenido a ${APP_NAME}. Esperamos verte en todas nuestras reuniones y que aprendamos mucho juntos.`;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('Nuevo correro de registro enviado a:', email);
  });
}