export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-linear-to-br from-sky-700 to-purple-600 min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
