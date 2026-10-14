import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-20 border-t border-edge">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-zinc-500 md:flex-row md:px-6">
      <span className="font-display text-2xl font-extrabold italic text-white">
        STRIDE<span className="text-volt">.</span>
      </span>
      <div className="flex gap-6">
        <Link to="/shoe/category/running" className="hover:text-volt">Running</Link>
        <Link to="/shoe/category/basketball" className="hover:text-volt">Basketball</Link>
        <Link to="/shoe/category/training" className="hover:text-volt">Training</Link>
        <Link to="/shoe/category/lifestyle" className="hover:text-volt">Lifestyle</Link>
      </div>
      <p>© {new Date().getFullYear()} STRIDE. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;
