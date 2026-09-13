import { Hero } from "@/components/home/Hero";
import { CompanyProfile } from "@/components/shared/CompanyProfile";
import { Stats } from "@/components/home/Stats";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { AmazonTeaser } from "@/components/amazon/AmazonTeaser";
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
      <AmazonTeaser />
      <Statement caption="Strategy, identity, engineering, and growth, all under one accountable roof, built to scale with you past the next milestone." />
      <Testimonials />
      <CtaBanner />
    </>
  );
}