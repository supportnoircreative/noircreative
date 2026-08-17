import { Hero } from "@/components/home/Hero";
import { CompanyProfile } from "@/components/shared/CompanyProfile";
import { Stats } from "@/components/home/Stats";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Statement } from "@/components/shared/Statement";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBanner } from "@/components/shared/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyProfile />
      <Stats />
      <ServicesTeaser />
      <FeaturedWork />
      <Statement caption="Strategy, identity, engineering, and growth — under one accountable roof, built to scale with you past the next milestone." />
      <Testimonials />
      <CtaBanner />
    </>
  );
}