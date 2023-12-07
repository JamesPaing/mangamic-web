import Navbar from '@/components/layouts/Navbar';
import './globals.css';
import 'animate.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/layouts/Footer';
import Provider from '@/app/context/client-provider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ApolloWrapper } from '@/apollo/ApolloWrapper';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Mangamic',
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
            <Provider session={session}>
                <body
                    style={{ height: '100vh' }}
                    className="bg-secondary flex flex-col justify-between"
                >
                    <NextTopLoader />
                    <Navbar />
                    <div className="mx-4 md:mx-36">
                        <ApolloWrapper>{children}</ApolloWrapper>
                    </div>
                    <Footer />
                </body>
            </Provider>
        </html>
    );
}
