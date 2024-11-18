
const Agenda = require('agenda');
const { sendEmail } = require('./nodemailer');

const mongoConnectionString = process.env.MONGO_URL;

const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: 'agendaJobs' },
});

agenda.define('send email', async (job) => {
  const { to, subject, text } = job.attrs.data;
  await sendEmail(to, subject, text);
});

(async function () {
  await agenda.start();
})();

module.exports = agenda;
