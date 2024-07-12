import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex flex-col items-center justify-center py-3 px-4 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex items-center gap-1 mb-2 sm:mb-0">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Made with ❤️ using</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </div>
      <div className="text-default-600">&copy; {currentYear} Sorting Visualizer</div>
    </footer>
    </div>
  );
}
