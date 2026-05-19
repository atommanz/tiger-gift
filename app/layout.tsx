import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    subsets: ["thai", "latin"],
    variable: "--font-ibm-plex-sans-thai",
});

export const metadata: Metadata = {
    title: "Tiger Gift - FTC Gift Finder",
    description: "ค้นหาของขวัญที่ใช่จาก Flying Tiger Copenhagen",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="th"
            className={`${ibmPlexSansThai.variable} h-full antialiased`}
        >
            <body className={ibmPlexSansThai.className}>{children}</body>
        </html>
    );
}
