// we import the utility from the next-dev submodule
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'via.placeholder.com',
      't4.ftcdn.net',
      'res.cloudinary.com',
      'saralevent-backend.onrender.com',
    ],
  },
};

export default nextConfig;

// we only need to use the utility during development so we can check NODE_ENV
// (note: this check is recommended but completely optional)
if (process.env.NODE_ENV === 'development') {
  // Use a wrapper function for async logic
  const setupDev = () => {
    setupDevPlatform({ persist: true }).catch((e) => {
      console.error('Error setting up dev platform:', e);
    });
  };

  // Call the setupDev function in a safe context (like within useEffect)
  setupDev();
}