import React from 'react';

const SuccessStories = () => {
  const stories = [
    { title: 'Clean Water Initiative', description: 'Funded over 200% for clean water solutions.', image: 'https://i.ibb.co/jbHzwgV/Clean-Water-Initiative.webp' },
    { title: 'Local Artisan Support', description: 'Helped 50+ artisans sell their crafts worldwide.', image: 'https://i.ibb.co/3CXL9pp/local.webp' },
  ];

  return (
    <section className="py-10 bg-primary mb-4 ">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">Success Stories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="flex items-center bg-orange-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <img src={story.image} alt={story.title} className="w-1/3 rounded-md" />
              <div className="ml-4">
                <h3 className="text-xl font-bold">{story.title}</h3>
                <p className="text-gray-600">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
