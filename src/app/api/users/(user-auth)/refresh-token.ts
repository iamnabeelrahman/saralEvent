import { NextApiRequest, NextApiResponse } from 'next';
import { verifyRefreshToken, generateToken } from 'utils/auth';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Refresh token not found' },
        { status: 401 }
      );
    }

    // Verify the refresh token
    const decoded: { userId: string; email: string; username: string } | null = await verifyRefreshToken(refreshToken).catch(
      () => null
    );

    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid refresh token' },
        { status: 401 }
      );
    }


    const accessToken = await generateToken(decoded.userId, decoded.email, decoded.username);

    res.setHeader(
      'Set-Cookie',
      `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
    );
    return NextResponse.json(
      { success: true, message: 'Invalid refresh token', accessToken },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(500).json({ message: 'Error refreshing token' });
  }
}
