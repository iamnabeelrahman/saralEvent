export async function POST(req) {
  const { email, password } = await req.json();

  try {
    // Forward the request to Strapi's local auth endpoint
    const strapiRes = await fetch('https://saralevent.onrender.com/api/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // Fetch full user details using the returned JWT
      const userId = data.user.id;
      const userRes = await fetch(`https://saralevent.onrender.com/api/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.jwt}`,
          'Content-Type': 'application/json',
        },
      });

      const user = await userRes.json();

      // Respond with JWT and user details, including is_verified and firstname
      const responseData = {
        jwt: data.jwt,
        user: {
          id: data.user.id,
          email: data.user.email,
          firstname: user.firstname, // Include firstname
          is_verified: user.is_verified,
        },
      };

      // Store JWT and user info on the client side (client-side storage will need to happen on the frontend)
      return new Response(JSON.stringify(responseData), { status: 200 });
    } else {
      // If there's an error, pass the error message back
      return new Response(JSON.stringify(data), { status: strapiRes.status });
    }
  } catch (error) {
    console.error('Login Error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}
