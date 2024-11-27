module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/otp/sendWithExpiry',
        handler: 'otp.sendOtpWithExpiry',
        config: { auth: false },
      },
      {
        method: 'POST',
        path: '/otp/verifyWithExpiry',
        handler: 'otp.verifyOtpWithExpiry',
        config: { auth: false },
      },
    ],
  };
  