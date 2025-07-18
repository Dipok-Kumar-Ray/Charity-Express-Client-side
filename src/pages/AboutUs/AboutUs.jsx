const AboutUs = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-green-700 dark:text-green-300">
          About Us
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          We are a tech-driven platform dedicated to solving real-world food challenges through digital innovation. Our mission is simple — <strong>rescue surplus donations</strong> and route them to the hands of those who need them most.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Whether you're a generous donor or a verified charity organization, our system ensures smooth, secure, and efficient donation management. We enable real-time tracking, charity request handling, pickup confirmations, and transparent communication across all parties involved.
        </p>

        <div className="mt-12 text-left">
          <h3 className="text-2xl font-semibold text-green-600 dark:text-green-300 mb-4">
            💡 What We Do:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Connect food donors with trusted charities and nonprofits</li>
            <li>Ensure transparent, secure, and traceable donation flows</li>
            <li>Reduce food waste through tech-powered logistics</li>
            <li>Enable real-time request & review system for better accountability</li>
          </ul>
        </div>

        <div className="mt-10 text-left">
          <h3 className="text-2xl font-semibold text-green-600 dark:text-green-300 mb-4">
            🛠️ Technologies We Use:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li><strong>Frontend:</strong> React, Tailwind CSS, DaisyUI</li>
            <li><strong>Backend:</strong> Node.js, Express.js, MongoDB</li>
            <li><strong>Authentication:</strong> Firebase (Email & Google Login)</li>
            <li><strong>API & Security:</strong> Axios Interceptors, JWT</li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <blockquote className="italic text-gray-600 dark:text-gray-400 text-xl">
            “We believe no food should go to waste while people go hungry. Let’s make charity smarter, faster, and fairer — together.”
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
