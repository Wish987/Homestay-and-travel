export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-400 bg-white/80 p-10 text-center shadow-lg">
      <div className="text-6xl mb-6">✨</div>
      <h2 className="text-2xl font-bold text-slate-900 mb-3">{title}</h2>
      <p className="text-slate-600 max-w-xl mx-auto">{description}</p>
    </div>
  );
}
