import { Button } from "./ui";

export default function HomestayCard({ homestay, onEdit, onDelete }) {
  return (
    <div className="group bg-white/95 rounded-3xl shadow-xl overflow-hidden border border-slate-200 hover:-translate-y-1 transition-all duration-300">
      <img
        src={homestay.image || "/logo.png"}
        alt={homestay.name}
        className="h-60 w-full object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold text-slate-900">{homestay.name}</h3>
          <span className="text-amber-600 font-bold">₹{homestay.price}</span>
        </div>
        <p className="text-slate-600 mt-3">{homestay.description}</p>
        <p className="text-slate-500 mt-3 text-sm">Location: {homestay.location}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" onClick={() => onEdit(homestay)}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(homestay)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
