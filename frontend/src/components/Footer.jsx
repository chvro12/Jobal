import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-8 py-4 flex flex-col md:flex-row items-center justify-between px-4 text-sm text-gray-500">
      <div className="flex gap-4 mb-2 md:mb-0">
        <Link to="/confidentialite" className="hover:text-blue-600">Confidentialité</Link>
        <Link to="/mentions-legales" className="hover:text-blue-600">Mentions légales</Link>
        <Link to="/cgu" className="hover:text-blue-600">CGU</Link>
      </div>
      <div>© {new Date().getFullYear()} Jobal</div>
    </footer>
  );
} 