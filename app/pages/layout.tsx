import Footer from "@/components/footer";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div>
            {children}
            <Footer />
        </div>
  );
}
