import { NextApiRequest, NextApiResponse } from 'next';
import { verifyRefreshToken, generateToken } from 'utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }
    
    // Verify the refresh token (ensure it has a proper return type)
    const decoded: { userId: string } | null = await verifyRefreshToken(refreshToken).catch(() => null);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token
    const accessToken = await generateToken(decoded.userId);

    res.setHeader(
      'Set-Cookie',
      `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
    );

    return res.status(200).json({ success: true, accessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(500).json({ message: 'Error refreshing token' });
  }
}
