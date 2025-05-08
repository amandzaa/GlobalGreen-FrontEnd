import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-eco-light to-eco-green">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDItMS43IDMuNi0zLjYgMy42LTIgMC0zLjYtMS42LTMuNi0zLjYgMC0yIDEuNi0zLjYgMy42LTMuNiAyIDAgMy42IDEuNiAzLjYgMy42eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Shop Sustainable,
            <br />
            <span className="text-eco-light">Live Green</span>
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Discover eco-friendly products that make a difference. Join us in our mission to create a sustainable future.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-eco-green px-8 py-3 rounded-full font-semibold hover:bg-eco-light transition duration-300">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-eco-green transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-eco-dark to-transparent"></div>
    </div>
  );
};

export default Hero; 