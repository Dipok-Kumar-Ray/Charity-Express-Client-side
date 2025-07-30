import CountUp from "react-countup";

const ImpactStats = () => {
  return (
    <section className="community-impact bg-amber-50 text-white py-12">
      <h2 className="text-3xl font-bold text-green-500 flex items-center justify-center gap-2 mb-4">
        <img src="/path-to-icon.png" alt="impact icon" className="h-8 w-8" />
        Our Community Impact
      </h2>
      <p className="text-center mb-10 text-2xl text-blue-300">
        Track how our collective actions are reducing waste, serving meals, and saving the planet.
      </p>

      <div className="flex justify-center gap-16">
        {/* Food Donated */}
        <div className="bg-amber-100 text-center p-6bg-amber-50 rounded-lg w-48">
          <div className="text-4xl font-extrabold text-orange-500">
            <CountUp end={12500} duration={3} separator="," />+ kg
          </div>
          <div className="text-gray-400 mt-2">Food Donated</div>
        </div>

        {/* Meals Served */}
        <div className=" text-center p-6 bg-blue-200 rounded-lg w-48">
          <div className="text-4xl font-extrabold text-blue-500">
            <CountUp end={30000} duration={3} separator="," />+ Meals
          </div>
          <div className="text-gray-400 mt-2">Meals Served</div>
        </div>

        {/* CO2 Reduced */}
        <div className="text-center p-6 bg-green-200 rounded-lg w-48">
          <div className="text-4xl font-extrabold text-green-500">
            <CountUp end={18} duration={3} /> Tons
          </div>
          <div className="text-gray-400 mt-2">CO₂ Reduced</div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
