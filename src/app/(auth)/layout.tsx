export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className=" bg-patternTwo bg-center bg-cover">{children}</main>;
}