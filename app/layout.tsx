import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://jobliberty-ai-fe.vercel.app"),
  title: "JobLiberty | AI-Powered Career Companion",
  description: "Find the right job with AI-powered confidence. AI career companion for Nigerian and African job seekers. Resume analysis, job matching, interview prep & more.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "JobLiberty - Your AI Career Companion",
    description: "Empowering Nigerian and African job seekers with AI-driven resume analysis, job matching, and career guidance.",
    images: [{ url: "/og-image.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
