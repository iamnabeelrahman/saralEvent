const generateOTP = require('../../../utils/otp');

module.exports = {
  async sendOtpWithExpiry(ctx) {
    const { email } = ctx.request.body;
    if (!email) return ctx.badRequest('Email is required');

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 mins

    try {
      await strapi.plugin('email').service('email').send({
        to: email,
        from: 'your-email@gmail.com',
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
      });

      await strapi.db.query('plugin::users-permissions.user').update({
        where: { email },
        data: { otp_code: otp, otp_expiry: otpExpiry, s_verified: false },
      });

      ctx.send({ message: 'OTP sent successfully' });
    } catch (error) {
      ctx.send({ error: 'Failed to send OTP', details: error.message });
    }
  },

  async verifyOtpWithExpiry(ctx) {
    const { email, otp } = ctx.request.body;
    if (!email || !otp) return ctx.badRequest('Email and OTP are required');

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({ where: { email } });
    if (user && user.otp_code === otp) {
      const now = new Date();
      if (now > new Date(user.otp_expiry)) return ctx.badRequest('OTP expired');

      await strapi.db.query('plugin::users-permissions.user').update({
        where: { email },
        data: { 
          is_verified: true,
          otp_code: null,
          otp_expiry: null,
          confirmed: true
      },
      });
      ctx.send({ message: 'OTP verified successfully' });
    } else {
      ctx.badRequest('Invalid OTP');
    }
  },
};
