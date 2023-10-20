import Navbar from '@/components/layouts/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/layouts/Footer';
import Provider from '@/app/context/client-provider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Hey Comic',
    description: 'A Manhwa Website',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className="bg-secondary">
                <Provider session={session}>
                    <Navbar />
                    <div className="mx-36">{children}</div>
                    <Footer />
                </Provider>
            </body>
        </html>
    );
}
