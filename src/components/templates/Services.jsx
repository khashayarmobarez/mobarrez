'use client';

import Link from 'next/link';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import AnimatedBeamDemo from '@/components/modules/landing/AiAutomationAnimate';
import { TerminalSection } from '@/components/elements/TerminalSection';

export default function Services() {
  return (
    <div className="flex flex-col w-full h-auto items-center justify-center snap-section bg-background text-foreground">
      {/* Introduction Section */}
      <section className="flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:px-16 w-full h-[100vh] bg-gradient-to-b from-background to-[#2a2a2a]">
        <TypingAnimation className="text-5xl font-bold text-foreground mb-4 shine">
          Our Services
        </TypingAnimation>
        <p className="text-lg text-muted-foreground max-w-2xl">
          At Mobarrez, we deliver cutting-edge technology solutions with a focus on precision and quality. Our services are designed to empower your business, transforming challenges into opportunities through innovation and expertise.
        </p>
      </section>

      {/* AI Integration & Automation Section */}
      <section className="flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:px-16 w-full h-[100vh] bg-foreground text-background">
        <h2 className="text-4xl font-bold shine">AI Integration & Automation</h2>
        <div className="flex flex-col md:flex-row items-center justify-around w-full h-full md:gap-y-8 md:justify-between md:px-4">
          <AnimatedBeamDemo />
          <p className="text-lg text-muted-foreground max-w-xl md:w-[40%] mt-6">
            We integrate advanced AI agents and automation systems to streamline your workflows with precision. From personalized chatbots that enhance customer support to automated processes that boost operational efficiency, our solutions are tailored to optimize your business, delivering measurable results and scalability.
          </p>
        </div>
      </section>

      {/* Software Development Section */}
      <section className="flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:px-16 w-full h-[100vh]">
        <h2 className="text-4xl font-bold shine">Software Development</h2>
        <div className="flex flex-col md:flex-row items-center justify-around w-full h-full md:gap-y-8 md:justify-between md:px-4">
          <div className="text-start w-full flex items-center md:w-[60%]">
            <TerminalSection />
          </div>
          <p className="text-lg text-muted-foreground max-w-xl md:w-[40%] mt-6">
            Our software development services create custom, responsive websites and scalable applications designed to meet your unique needs. Leveraging modern frameworks and robust architectures, we build solutions that ensure performance, security, and a seamless user experience for your audience.
          </p>
        </div>
      </section>

      {/* Startups and Consulting Section */}
      <section className="flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:px-16 w-full h-[100vh] bg-foreground text-background">
        <h2 className="text-4xl font-bold shine">Startups and Consulting</h2>
        <div className="mt-6 max-w-2xl text-lg text-muted-foreground">
          <p>
            As expert consultants, we guide startups and established businesses through the digital transformation journey. We offer strategic advice, from tech stack selection to growth strategies, ensuring your venture thrives with precision and innovation tailored to your market.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:px-16 w-full h-[100vh]">
        <h2 className="text-4xl font-bold shine">Let’s Build Your Future</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mt-4">
          Ready to transform your business with our expertise? Explore our work or get in touch to start your project today.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/portfolio"
            className="rounded-lg bg-accent px-6 py-3 text-background transition hover:bg-opacity-80"
          >
            View Our Portfolio
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-secondary px-6 py-3 text-secondary transition hover:bg-secondary hover:text-background"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <style jsx>{`
        .shine {
          font-size: 2.5rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.3);
          background: #222 -webkit-gradient(
            linear,
            left top,
            right top,
            from(#222),
            to(#222),
            color-stop(0.5, #fff)
          ) 0 0 no-repeat;
          background-image: -webkit-linear-gradient(
            -40deg,
            transparent 0%,
            transparent 40%,
            #fff 50%,
            transparent 60%,
            transparent 100%
          );
          -webkit-background-clip: text;
          -webkit-background-size: 50px;
          -webkit-animation: zezzz;
          -webkit-animation-duration: 5s;
          -webkit-animation-iteration-count: infinite;
        }
        @-webkit-keyframes zezzz {
          0%,
          10% {
            background-position: -400px;
          }
          20% {
            background-position: top left;
          }
          100% {
            background-position: 400px;
          }
        }
      `}</style>
    </div>
  );
}