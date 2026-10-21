
"use client";

import { motion } from "framer-motion";
import { Flower2, Heart } from "lucide-react";

const couplePhotos = [
  "/images/wedding1/couple2.jpg",
  "/images/wedding1/couple3.jpg",
  "/images/wedding1/couple4.jpg",
  "/images/wedding1/couple5.jpg",
  "/images/wedding1/couple6.jpg",
  "/images/wedding1/couple7.jpg",
];

export default function CoupleStory() {
  return (
    <section className="relative overflow-hidden bg-[#f7f1e8] px-6 py-24">

      {/* Background circles */}
      <div className="absolute -left-40 top-32 h-80 w-80 rounded-full border border-[#d8c3a5] opacity-25" />

      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full border border-[#d8c3a5] opacity-25" />

      {/* Top-left flower */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute left-4 top-8 md:left-14"
      >
        <Flower2
          size={46}
          strokeWidth={1}
          className="rotate-[-15deg] text-[#c89da5]"
        />

        <Flower2
          size={26}
          strokeWidth={1}
          className="absolute left-10 top-8 text-[#b99572]"
        />
      </motion.div>

      {/* Bottom-right flower */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute bottom-8 right-4 md:right-14"
      >
        <Flower2
          size={46}
          strokeWidth={1}
          className="rotate-[15deg] text-[#c89da5]"
        />

        <Flower2
          size={26}
          strokeWidth={1}
          className="absolute right-10 top-8 text-[#b99572]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Heading */}
        <div className="text-center">

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] text-[#92795c]"
          >
            Our journey
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-4 font-serif text-4xl text-[#49382d] md:text-5xl"
          >
            Two Hearts, One Story
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 h-px bg-[#b89b72]"
          />

        </div>

        {/* Bride & Groom */}
        <div className="mx-auto mt-16 grid max-w-4xl items-center gap-12 md:grid-cols-2">

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="mx-auto w-fit">

              <div className="rounded-t-[160px] border border-[#c8aa82] p-2">

                <img
                  src="/images/wedding1/bride.png"
                  alt="Bride"
                  className="h-[400px] w-[270px] rounded-t-[150px] object-cover"
                />

              </div>

            </div>

            <h3 className="mt-7 font-serif text-3xl text-[#49382d]">
              Amaya
            </h3>

            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#92795c]">
              The Bride
            </p>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="mx-auto w-fit">

              <div className="rounded-t-[160px] border border-[#c8aa82] p-2">

                <img
                  src="/images/wedding1/groom.jpg"
                  alt="Groom"
                  className="h-[400px] w-[270px] rounded-t-[150px] object-cover"
                />

              </div>

            </div>

            <h3 className="mt-7 font-serif text-3xl text-[#49382d]">
              Kasun
            </h3>

            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#92795c]">
              The Groom
            </p>
          </motion.div>

        </div>

        {/* Love divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="my-20 flex items-center justify-center gap-4"
        >
          <div className="h-px w-16 bg-[#c8aa82]" />

          <Heart
            size={22}
            strokeWidth={1}
            className="text-[#c89da5]"
          />

          <div className="h-px w-16 bg-[#c8aa82]" />
        </motion.div>

        {/* Couple Memories heading */}
        <div className="text-center">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.35em] text-[#92795c]"
          >
            Our memories
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-3 font-serif text-3xl text-[#49382d] md:text-4xl"
          >
            Moments We Treasure
          </motion.h3>

        </div>

        {/* Six couple photos */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">

          {/* Photo 1 - Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="group col-span-2 row-span-2 h-[430px] overflow-hidden rounded-[100px] border border-[#c8aa82] p-1"
          >
            <img
              src={couplePhotos[0]}
              alt="Couple memory 1"
              className="h-full w-full rounded-[95px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Photo 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="group h-[205px] overflow-hidden rounded-[60px] border border-[#c8aa82] p-1"
          >
            <img
              src={couplePhotos[1]}
              alt="Couple memory 2"
              className="h-full w-full rounded-[55px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Photo 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="group h-[205px] overflow-hidden rounded-[60px] border border-[#c8aa82] p-1"
          >
            <img
              src={couplePhotos[2]}
              alt="Couple memory 3"
              className="h-full w-full rounded-[55px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Photo 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className="group h-[205px] overflow-hidden rounded-[60px] border border-[#c8aa82] p-1"
          >
            <img
              src={couplePhotos[3]}
              alt="Couple memory 4"
              className="h-full w-full rounded-[55px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Photo 5 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="group h-[205px] overflow-hidden rounded-[60px] border border-[#c8aa82] p-1"
          >
            <img
              src={couplePhotos[4]}
              alt="Couple memory 5"
              className="h-full w-full rounded-[55px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Photo 6 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="group col-span-2 h-[250px] overflow-hidden rounded-[80px] border border-[#c8aa82] p-1 md:col-span-4"
          >
            <img
              src={couplePhotos[5]}
              alt="Couple memory 6"
              className="h-full w-full rounded-[75px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

        </div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto mt-20 max-w-2xl text-center"
        >

          <Heart
            size={24}
            strokeWidth={1}
            className="mx-auto text-[#c89da5]"
          />

          <p className="mt-6 font-serif text-xl leading-9 text-[#715d4b] md:text-2xl">
            "Some stories begin with a moment,
            some with a smile.
            Ours began with two hearts finding
            their way to each other."
          </p>

          <p className="mt-6 text-sm leading-7 text-[#92795c]">
            From the first hello to countless memories,
            every moment has brought us closer.
            Now, we are ready to begin our next chapter
            together.
          </p>

        </motion.div>

      </div>
    </section>
  );
}