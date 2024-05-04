import EventsSidebar from "./components/sidebar";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
      <EventsSidebar />
      {children}
    </div>
  );
}
