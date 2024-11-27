// src/app/api/otp/verify/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, otp } = await req.json();

  try {
    // Send OTP verification request to Strapi
    const strapiRes = await fetch('https://saralevent.onrender.com/api/otp/verifyWithExpiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      return NextResponse.json({ message: 'OTP verified successfully', data }, { status: 200 });
    } else {
      const errorMessage = data.error?.message || 'OTP verification failed';
      return NextResponse.json({ message: errorMessage }, { status: strapiRes.status });
    }
  } catch (error) {
    console.error('Error during OTP verification:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
