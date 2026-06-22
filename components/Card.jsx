export default function Card({ title, description }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">

      <div className="text-5xl mb-4">
        🏡
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      <p className="mt-4 text-gray-600">
        {description}
      </p>

      <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all duration-300">
        View Details
      </button>

    </div>
  );
}