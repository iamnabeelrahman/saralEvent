// src/app/api/otp/send/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email } = await req.json();

  try {
    // Send OTP request to Strapi
    const strapiRes = await fetch('https://saralevent.onrender.com/api/otp/sendWithExpiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      return NextResponse.json({ message: 'OTP sent successfully', data }, { status: 200 });
    } else {
      const errorMessage = data.error?.message || 'Error sending OTP';
      return NextResponse.json({ message: errorMessage }, { status: strapiRes.status });
    }
  } catch (error) {
    console.error('Error during OTP send:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
