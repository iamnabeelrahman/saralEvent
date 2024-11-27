import 'bootstrap/dist/css/bootstrap.min.css';  // Add this line
import './globals.css'; // Your global CSS (if any)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
