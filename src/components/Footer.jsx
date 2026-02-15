export default function Footer({ name = "Ahdan Firdaus", year = new Date().getFullYear() }) {
  return (
    <div className="text-center text-[10px] font-mono text-gray-400 pt-4 border-t border-blue-500/10">
      <span className="text-blue-400/50">❯</span>{" "}
      Crafted with ❤️ by {name} © {year}{" "}
      <span className="text-blue-400/50">❮</span>
    </div>
  );
}