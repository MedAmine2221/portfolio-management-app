import { ChildrenProps } from "@/types/interfaces";

export default function AuthLayout({
  children,
}: ChildrenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
