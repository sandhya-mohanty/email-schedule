
const agenda = require('../config/agenda');

const scheduleEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await agenda.schedule('in 1 hour', 'send email', { to, subject, text });
    res.status(200).json({ message: 'Email scheduled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to schedule email', error: error.message });
  }
};

module.exports = { scheduleEmail };
