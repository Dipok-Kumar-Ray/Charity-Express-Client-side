const CommunityStories = () => {
  const stories = [
    {
      name: "Sunrise Restaurant",
      quote:
        "Thanks to this platform, we've been able to donate our unsold meals daily, helping hundreds of people while reducing our waste.",
      image: "https://i.ibb.co/v4Yr07vX/photo-1556761175-4b46a572b786.jpg",
    },
    {
      name: "Hope Charity",
      quote:
        "We received quality food donations just when we needed them most. This initiative brings dignity and warmth to our community.",
      image: "https://i.ibb.co/yFMLczp6/photo-1694286068611-d0c24cbc2cd5.jpg",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-green-800 text-center mb-10">
        Community Stories
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-white via-green-50 to-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6 
              hover:shadow-2xl hover:scale-[1.02] transition duration-300 ease-in-out"
          >
            <img
              src={story.image}
              alt={story.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-green-200"
            />
            <div>
              <h4 className="text-xl font-semibold text-green-900">
                {story.name}
              </h4>
              <p className="text-gray-700 mt-2 text-sm italic leading-relaxed">
                “{story.quote}”
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityStories;
