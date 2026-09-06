export const metadata = {
  title: "ستريم إكس",
  description: "شاهد الأفلام والمسلسلات أونلاين",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}