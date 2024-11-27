import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password, firstname, lastname } = await req.json(); // Extract firstname and lastname

  try {
    const username = email; // Use email as username

    // Register user in Strapi
    const strapiRes = await fetch('https://saralevent.onrender.com/api/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        firstname, // Include firstname in the request
        lastname,  // Include lastname in the request
      }),
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      const errorMessage = data.error?.message || data.message || 'Unknown error occurred';
      return NextResponse.json({ message: errorMessage }, { status: strapiRes.status });
    }

    // After registration, update the user to set is_verified to false
    const userId = data.user.id;
    const updateRes = await fetch(`http://localhost:1337/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.jwt}`, // Use the JWT from the registration response
      },
      body: JSON.stringify({
        is_verified: false,
      }),
    });

    if (!updateRes.ok) {
      const updateError = await updateRes.json();
      console.error('Failed to update is_verified:', updateError);
      return NextResponse.json({ message: 'Failed to set verification status' }, { status: updateRes.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
