export default function Badge({ children }: { children: JSX.Element }) {
  return (
    <span className="flex items-center px-4 lg:px-12 py-1 mx-auto w-fit bg-green-50 rounded-full border border-secondary hover:bg-secondary transition-colors duration-300 hover:text-white cursor-pointer text-secondary">
      {children}
    </span>
  );
}
