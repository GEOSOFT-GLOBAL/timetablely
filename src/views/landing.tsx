import * as React from "react";
import Hero from "@/components/hero";
import BubbleMenu from "@/components/BubbleMenu";

const Landing: React.FC = () => {
  const menuItems = [
    {
      label: "pricing",
      href: "#pricing",
      ariaLabel: "Pricing",
      rotation: -8,
      hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
    },
    {
      label: "features",
      href: "#features",
      ariaLabel: "Features",
      rotation: 8,
      hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
    },
    {
      label: "quick start",
      href: "/quick-start",
      ariaLabel: "Quick Start",
      rotation: -8,
      hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
    },
    {
      label: "about",
      href: "#about",
      ariaLabel: "About",
      rotation: 8,
      hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
    },
    {
      label: "faqs",
      href: "#faqs",
      ariaLabel: "FAQs",
      rotation: -8,
      hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
    },
  ];

  return (
    <div className="min-h-screen relative">
      <BubbleMenu
        logo={
          <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Timetablely
          </span>
        }
        items={menuItems}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
      <Hero />
    </div>
  );
};

export default Landing;
