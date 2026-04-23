export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-400">CodeX</h1>

        <div className="space-x-6">
          <a href="/" className="hover:text-blue-400">Problems</a>
          <a href="#" className="hover:text-blue-400">About</a>
        </div>
      </div>
    </nav>
  );
}