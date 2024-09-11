import * as React from "react";
import { FeatureSection, HeroSection } from "../sections";
import { CTABanner } from "../banners";

export const LandingPage = () => {
  return (
    <div className="">
      <HeroSection />
      <FeatureSection />
      <CTABanner />
    </div>
  );
};
