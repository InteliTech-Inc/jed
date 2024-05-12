export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-pattern bg-center bg-cover">{children}</main>
  );
}
