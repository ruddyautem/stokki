export default function Footer() {
  return (
    <footer className="border-t border-slate-100 py-6 px-6 shrink-0 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 justify-center">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Stokki.autem.dev. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
