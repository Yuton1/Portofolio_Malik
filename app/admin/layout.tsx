export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-[#1c1c1c] text-white">
        {children}
      </div>
    );
  }