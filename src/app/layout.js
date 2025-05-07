import './globals.css';

export const metadata = {
  title: 'AAS Blueprint',
  description: 'AAS Blueprint Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}