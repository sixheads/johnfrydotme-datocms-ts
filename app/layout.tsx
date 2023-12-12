import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: '300',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'johnfry.me',
  description: 'Online portfolio of John Fry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={merriweather.className}>
        <Nav />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
