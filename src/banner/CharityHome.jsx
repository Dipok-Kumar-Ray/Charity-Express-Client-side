import React from "react";
import bannerImage from "../assets/charity-banner.png";

export default function CharityHome() {
  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans">
      {/* Banner Section */}
      <div className="relative">
        <img
          src={bannerImage}
          alt="Charity Banner"
          className="w-full h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 p-6 md:p-10 rounded-xl shadow-lg border-4 border-green-700">
            <h1 className="text-3xl md:text-5xl font-bold text-green-800 text-center">
              Foundation for Charitable <br /> Activities in Bangladesh
            </h1>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-12 px-6 md:px-20 bg-green-50">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-green-800 mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
          We are dedicated to empowering communities across Bangladesh through education,
          training, and humanitarian support. Our goal is to build a better future by
          supporting underprivileged youth and their families with the resources they
          need to thrive.
        </p>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-4">
          Get Involved
        </h2>
        <p className="text-gray-600 mb-6">
          Whether you want to volunteer, donate, or partner with us — your support makes
          a difference.
        </p>
        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl shadow-md transition duration-300">
          Join Us Today
        </button>
      </section>
    </div>
  );
}
