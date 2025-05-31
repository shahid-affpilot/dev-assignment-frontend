import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-700 mb-6 drop-shadow-md">
          Affpilot AI
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          Write 1000 Blogs in One Click 🚀
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed px-4 sm:px-0">
          Transform your content creation process with <span className="font-semibold text-blue-600">Affpilot AI</span>.
          Our advanced AI technology helps you generate high-quality, engaging blog posts instantly.
          Save time, boost your productivity, and maintain a consistent content schedule — perfect for
          content creators, marketers, and businesses ready to scale.
        </p>
      </div>
    </div>
  );
}

export default Home