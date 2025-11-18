"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

// Image imports
import pic1 from "../../public/images/New Pictures P1.jpg";
import pic2 from "../../public/images/New Pictures P2.jpg";
import pic3 from "../../public/images/New Pictures P3.jpg";
import pic4 from "../../public/images/New Pictures P4.jpg";

// Partner logos
import logos from "../../public/donors&partners/pse-logo.png";
import logos2 from "../../public/donors&partners/ocic-logo.png";
import logos3 from "../../public/donors&partners/edu-logo.png";
import logos4 from "../../public/donors&partners/smart-logo.png";
import logos5 from "../../public/donors&partners/ccf-logo.png";
import logos6 from "../../public/donors&partners/epil-logo.jpg";
import logos7 from "../../public/donors&partners/manulife-logo.png";
import { toKhmer } from "./utils/khmerNumbers";
import { useImpactData } from "@/hooks/useImpactData";

interface HeroSectionProps {
  imageSrc: import("next/image").StaticImageData;
  imageAlt: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  overlayOpacity?: number;
}

interface SectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: import("next/image").StaticImageData;
  imageAlt: string;
  backgroundColor?: string;
  imageOnLeft?: boolean;
}

// Constants
// const ICONS = [GraduationCap, MapPin, Backpack, Rainbow] as const;
const LOGO_IMAGES = [
  logos,
  logos2,
  logos3,
  logos4,
  logos5,
  logos6,
  logos7,
] as const;
const ANIMATION_DURATION = 20; // seconds for logo carousel

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Reusable Components
const HeroSection = ({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonText,
  buttonHref,
  overlayOpacity = 0.6,
}: HeroSectionProps) => (
  <section
    className="relative w-full h-[500px] sm:h-[600px] md:h-[700px]"
    role="banner"
  >
    <div>
      <Image
        src={imageSrc}
        alt={imageAlt}
        layout="fill"
        // className="object-cover "
        objectFit="cover"
        priority={imageSrc === pic1} // Only prioritize the first hero image
        // sizes="100vw"
        quality={100}
      />
    </div>

    <div
      className="absolute inset-0 bg-[#623d3c4c]"
      style={{ opacity: overlayOpacity }}
      aria-hidden="true"
    />

    <motion.div
      className="absolute inset-0 flex flex-col justify-end px-4 sm:px-12 md:px-20 pb-16 sm:pb-24 md:pb-32 max-w-3xl text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {description}
      </motion.p>

      {buttonText && buttonHref && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            href={buttonHref}
            className="inline-flex items-center gap-2 bg-[#FFD45F] hover:bg-[#FFD45F]/90 text-[#623D3C] font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFD45F] focus:ring-offset-2"
            aria-label={`${buttonText} - Learn more about our story`}
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  </section>
);

const ContentSection = ({
  title,
  description,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
  // backgroundColor = "bg-[#8BAEA7]",
  imageOnLeft = false,
}: SectionProps) => (
  <section className={` py-16`}>
    <div className="max-w-7xl mx-auto px-6">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          imageOnLeft ? "lg:grid-flow-col-dense" : ""
        }`}
      >
        {/* Text Content */}
        <motion.div
          className={`space-y-6 ${imageOnLeft ? "lg:col-start-2" : ""}`}
          initial={{ opacity: 0, x: imageOnLeft ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#623D3C] leading-tight"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-2 bg-[#623D3C] hover:bg-[#623D3C]/90 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#623D3C] focus:ring-offset-2 shadow-md hover:shadow-lg"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className={`flex justify-center ${
            imageOnLeft ? "lg:col-start-1 lg:row-start-1" : ""
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="relative overflow-hidden rounded-2xl"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={600}
              height={400}
              className="object-cover w-full h-64 sm:h-72 md:h-80 lg:h-96"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              quality={85}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const impactData = useImpactData();

  const doubledLogos = useMemo(() => [...LOGO_IMAGES, ...LOGO_IMAGES], []);

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        imageSrc={pic1}
        imageAlt="Students learning at Rabbit School"
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* Our Story Section */}
      <HeroSection
        imageSrc={pic2}
        imageAlt="Our story at Rabbit School"
        title={t("story.title")}
        description={t("story.description")}
        buttonText={t("story.button")}
        buttonHref="/about"
      />

      {/* How We Work Section */}
      <ContentSection
        title={t("howWeWork.title")}
        description={t("howWeWork.description")}
        buttonText={t("howWeWork.button")}
        buttonHref="/we-work"
        imageSrc={pic3}
        imageAlt="Children learning together at Rabbit School"
        backgroundColor="bg-[#F7F5F4]"
      />

      {/* Impact Section */}
      <section className="bg-[#FFD45F] py-16" aria-labelledby="impact-title">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              id="impact-title"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#623D3C] mb-4"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {t("impact.title")}
            </motion.h2>

            <motion.p
              className="text-[#623D3C]/80 text-lg md:text-xl max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t("impact.description")}
            </motion.p>
          </div>

          <motion.div
            key={locale}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {impactData.map((item, index) => {
              // const Icon = ICONS[index % ICONS.length];
              return (
                <motion.div
                  // key={`${item.description}-${index}`}
                  key={`${locale}-${item.description}-${index}`}
                  variants={cardVariants}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-[#623D3C]/10"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-center mb-4">
                    <div
                    // className="p-3 bg-[#8BAEA7]/20 rounded-full"
                    >
                      <Image
                        className="w-12 h-12 text-[#623D3C]"
                        src={item.icon}
                        width={100}
                        height={100}
                        alt="icon"
                      />
                      {/* <Icon
                        className="w-8 h-8 text-[#623D3C]"
                        aria-hidden="true"
                      /> */}
                    </div>
                  </div>

                  <div className="text-3xl md:text-4xl font-extrabold text-[#623D3C] mb-2">
                    {locale === "km" ? (
                      <div>
                        <CountUp
                          end={item.value}
                          duration={2.5}
                          formattingFn={(value: number) => {
                            return toKhmer(value);
                          }}
                        />
                        +
                      </div>
                    ) : (
                      <>
                        <CountUp
                          end={item.value}
                          duration={2.5}
                          separator=","
                          preserveValue
                        />
                        +
                      </>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-[#F7F5F4] py-16" aria-labelledby="partners-title">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              id="partners-title"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#623D3C] mb-4"
              variants={fadeInVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {t("partners.title")}
            </motion.h2>

            <motion.p
              className="text-[#623D3C]/80 text-lg md:text-xl max-w-4xl mx-auto"
              variants={fadeInVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t("partners.description")}
            </motion.p>
          </div>

          {/* Logo Carousel */}
          <div
            className="overflow-hidden relative"
            role="region"
            aria-label="Partner logos"
          >
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: ANIMATION_DURATION,
                ease: "linear",
              }}
              style={{ width: `${doubledLogos.length * 180}px` }}
            >
              {doubledLogos.map((logo, index) => (
                <div
                  key={`logo-${index}`}
                  className="flex-shrink-0 w-40 h-20 relative grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <Image
                    src={logo}
                    alt={`Partner ${(index % LOGO_IMAGES.length) + 1} logo`}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      {/* <section className="bg-[#FFD45F] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center lg:text-left space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#623D3C] leading-tight">
                {t("donation.title")}
              </h2>

              <p className="text-[#623D3C]/80 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl lg:max-w-none">
                {t("donation.description")}
              </p>

              <div className="display: inline-block">
                <DonationLink variant="primary" text={t("donation.button")} />
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Image
                src={donate}
                alt="Donation support illustration"
                width={500}
                height={400}
                className="w-full max-w-md lg:max-w-lg h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Get Involved Section */}
      <ContentSection
        title={t("getInvolved.title")}
        description={t("getInvolved.description")}
        buttonText={t("getInvolved.button")}
        buttonHref="/get-involved"
        imageSrc={pic4}
        imageAlt="Students and volunteers at Rabbit School"
        backgroundColor="bg-[#8BAEA7]"
        imageOnLeft={true}
      />
    </main>
  );
}
