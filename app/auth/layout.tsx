export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
