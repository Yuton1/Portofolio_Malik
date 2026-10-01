import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-[#1c1c1c] transition-colors duration-300 dark:bg-[#1c1c1c] dark:text-white">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}