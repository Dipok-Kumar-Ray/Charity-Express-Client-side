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
    {
      name: "FreshMart Groceries",
      quote:
        "Partnering with this network allowed us to distribute surplus fresh produce to families in need, reducing landfill waste significantly.",
      image: "https://i.ibb.co/qLF0N9fL/download.jpg",
    },
    {
      name: "Green Hearts Foundation",
      quote:
        "This collaboration has empowered us to reach more underprivileged children with nutritious meals every month.",
      image: "https://i.ibb.co/9HSG0n39/download.jpg",
    },
  ];

  return (
    <section className="py-12 my-12 bg-base-300 rounded-2xl px-6 max-w-xl mx-auto lg:max-w-7xl  shadow-md">
      <h2 className="text-3xl font-bold text-green-800 text-center mb-17">
        Community Stories
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="relative group  rounded-2xl shadow-lg hover:shadow-2xl border overflow-hidden transition duration-300 lex flex-col md:flex-row items-center gap-6 
               hover:scale-[1.02]  ease-in-out"
          >

 <div className="flex gap-6 p-4"> 
             <div>
              <img
              src={story.image}
              alt={story.name}
              className="w-24 h-24 lg:w-full rounded-full object-cover ring-4 ring-green-200"
            />
             </div>
            <div>
              <h4 className="text-xl font-semibold text-green-900">
                {story.name}
              </h4>
              <p className="text-gray-700 mt-2 text-sm italic leading-relaxed">
                “{story.quote}”
              </p>
            </div>
 </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityStories;
