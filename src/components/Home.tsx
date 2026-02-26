"use client";
import React from "react";
import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen flex items-center justify-center gap-6 flex-col text-center px-4"
      >
        {/* Trust Badge */}
        <motion.div
          animate={{
            borderColor: [
              "rgba(226, 232, 240, 1)",
              "rgba(96, 165, 250, 1)",
              "rgba(226, 232, 240, 1)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="border border-slate-200 px-3 py-1 text-slate-700 flex items-center gap-2 rounded-full shadow-sm text-xs sm:text-sm"
        >
          <BadgeCheck size={16} strokeWidth={2.5} className="text-blue-600" />
          <p className="font-medium">Trusted by 1,000,000+ professionals</p>
        </motion.div>

        {/* Main Heading */}
        <motion.p
          variants={itemVariants}
          className="font-bold text-3xl sm:text-5xl md:text-7xl max-w-5xl text-[rgb(7,31,54)] leading-snug sm:leading-tight"
        >
          Level Up Your Property Game – Real Estate Freedom Starts with Just One
          Plot
        </motion.p>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-gray-500 max-w-md sm:max-w-xl text-base sm:text-lg"
        >
          Practical tips to help you unlock actionable insights in making
          smarter financial decisions.
        </motion.p>

        {/* Stars */}
        <motion.div variants={itemVariants} className="flex items-center gap-1">
          <span className="text-gray-300 text-lg sm:text-xl">★★★★★</span>
        </motion.div>
      </motion.section>

      {/* Blog Card Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen w-full flex items-center justify-center bg-white py-8 sm:py-12 px-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-xl sm:shadow-2xl rounded-2xl overflow-hidden"
        >
          {/* Left Content */}
          <div className="flex flex-1 flex-col gap-4 px-4 sm:px-8 py-6 justify-center">
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="flex flex-wrap gap-3 text-gray-500 text-xs sm:text-sm"
            >
              <p className="bg-gray-200 rounded-full px-2 py-1">Featured</p>
              <p className="bg-gray-200 rounded-full px-2 py-1">Investing</p>
              <p>7 min read</p>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              className="font-extrabold text-2xl sm:text-3xl text-[rgb(7,31,54)] leading-snug"
            >
              Unlock the Secret to Wealth: The Investing Strategy You Need to
              Know to Become...
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="font-medium text-gray-500 text-sm sm:text-base leading-relaxed"
            >
              When most people think about investing, they envision buying
              stocks, properties, and mutual funds. While these traditional
              investment options have their place, they may not always be the
              best path to financial freedom, especially in today’s rapidly
              changing market.
            </motion.p>

            {/* Author + Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
              className="flex flex-col sm:flex-row sm:justify-between mt-3 gap-3 sm:gap-0 items-start sm:items-center"
            >
              {/* Author */}
              <div className="flex gap-2 items-center ">
                <div className="w-8 h-8 sm:w-10 sm:h-10 relative rounded-full overflow-hidden">
                  <Image
                    src="/man.avif"
                    alt="author"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs sm:text-sm">
                  <p className="text-gray-500">Written by</p>
                  <p className="text-blue-800 font-medium">Shivansh Singh</p>
                </div>
              </div>

              {/* Date */}
              <div className="text-xs sm:text-sm text-left sm:text-right">
                <p className="text-gray-500">Posted on</p>
                <p className="text-blue-800 font-medium">April 21, 2025</p>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex flex-1 items-center justify-center"
          >
            <div className="w-full sm:w-[95%] aspect-[4/3] relative">
              <Image
                src="/chess.avif"
                fill
                alt="chess"
                className="rounded-t-2xl md:rounded-2xl object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default HomePage;
