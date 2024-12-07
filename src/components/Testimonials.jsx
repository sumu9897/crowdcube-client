import React from 'react';

const Testimonials = () => {
  const testimonials = [
    { name: 'Jane Doe', feedback: 'Amazing platform! Helped me raise funds for my startup.', image: '/images/user1.jpg' },
    { name: 'John Smith', feedback: 'Easy to use and effective for reaching donors worldwide.', image: '/images/user2.jpg' },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
