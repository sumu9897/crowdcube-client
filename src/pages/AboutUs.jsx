import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <motion.div
        className="max-w-4xl text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About Us
        </h1>
        <motion.p
          className="text-lg text-gray-600 leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Welcome to Crowdcube, a platform dedicated to empowering individuals
          and communities to bring their creative ideas, personal needs, and
          innovative projects to life through crowdfunding. We believe in the
          power of collective effort and aim to provide a seamless experience
          for campaigners and donors alike.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              Our mission is to bridge the gap between dreams and reality by
              offering a transparent, user-friendly platform for crowdfunding.
              We aim to connect campaigners with a global audience of supporters
              who share their vision.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600">
              At Crowdcube, we prioritize simplicity, security, and success.
              With a dedicated support team, innovative tools, and a vibrant
              community, we strive to ensure your campaigns achieve maximum
              impact.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Join Us on This Journey
          </h2>
          <p className="text-gray-600">
            Whether you're here to launch a campaign or support a cause, we
            welcome you to Crowdcube. Together, we can turn ideas into
            achievements and make a difference in the world.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
