// /pages/api/refresh-token.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { verifyRefreshToken, generateToken } from 'utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Get refresh token from cookies
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
      }
      
      // Verify the refresh token
      const decoded = await verifyRefreshToken(refreshToken);
      if (!decoded) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      // Generate a new access token
      const accessToken = await generateToken(decoded.userId);

      // Set the new access token cookie
      res.setHeader(
        'Set-Cookie',
        `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
      );

      return res.status(200).json({ success: true, accessToken });
    } catch (error) {
      return res.status(500).json({ message: 'Error refreshing token' });
    }
  }

  // If method is not POST, return method not allowed
  return res.status(405).json({ message: 'Method Not Allowed' });
}
