import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://jobliberty-ai-fe.vercel.app"),
  title: {
    default: "JobLiberty | Empowering Every Career Journey with AI",
    template: "%s | JobLiberty",
  },
  description:
    "Premium AI-powered career companion for Nigerian and African job seekers. Resume analysis, job matching, interview prep & opportunity hub. Built by Abdulwahab Abdulyekeen, 3MTT NextGen Fellow.",
  keywords: ["JobLiberty", "AI career", "Nigeria jobs", "resume analysis", "3MTT", "career companion", "job matching"],
  authors: [{ name: "Abdulwahab Abdulyekeen", url: "https://github.com/bynarycoder" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "JobLiberty - Empowering Every Career Journey with AI",
    description:
      "Premium AI career platform for African talent. ATS scoring, skill gaps, opportunity hub, and Liberty AI companion. Showcasing at 3MTT NextGen 2026.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JobLiberty AI Career Platform" }],
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobLiberty — AI Career Companion",
    description: "Empowering Every Career Journey with AI. Built for Africa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        {/* Prevent FOUC on theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldDark = stored ? stored === 'dark' : prefersDark;
                  if (shouldDark) document.documentElement.classList.add('dark');
                } catch {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#2563EB] selection:text-white antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
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
