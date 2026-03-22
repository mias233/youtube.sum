export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto py-6 text-center text-sm text-muted-foreground glass-panel">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Summz.AI. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with <span className="text-primary">♥</span> by Antigravity
        </p>
      </div>
    </footer>
  );
}
