import React from 'react';

const HowItWorks = () => {
  const steps = [
    { title: 'Create Campaign', description: 'Set up your campaign with details and goals.', icon: '📋' },
    { title: 'Share With Others', description: 'Share your campaign on social platforms.', icon: '🔗' },
    { title: 'Receive Funding', description: 'Start receiving contributions from donors.', icon: '💰' },
  ];

  return (
    <section className="bg-teal-50 py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center bg-white shadow-lg rounded-lg p-6" // Removed hover:shadow-xl and transition-shadow
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
