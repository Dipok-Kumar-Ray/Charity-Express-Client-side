const ImpactStats = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-10 text-center">
      <h2 className="text-3xl font-bold text-green-800 mb-6">
        Our Collective Impact
      </h2>
      <p className="mb-10 text-gray-600">
        Every donation makes a difference. Here's how we've been changing lives
        together:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { value: "12,000+", label: "Kgs of Food Donated" },
          { value: "35,000+", label: "Meals Served" },
          { value: "9.2 Tons", label: "CO₂ Emissions Reduced" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-green-100 via-white to-green-50 p-8 rounded-xl shadow-md hover:shadow-2xl 
            hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <h3 className="text-4xl font-extrabold text-green-900 mb-2">
              {item.value}
            </h3>
            <p className="text-gray-700 font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
