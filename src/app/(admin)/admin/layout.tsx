import AdminSidebar from "./components/admin_sidebar";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
      <AdminSidebar />
      <div className="">{children}</div>
    </div>
  );
}
