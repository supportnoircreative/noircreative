import { PageHero } from "@/components/shared/PageHero";
import { CompanyProfile } from "@/components/shared/CompanyProfile";
import { Solutions } from "@/components/about/Solutions";
import { Statement } from "@/components/shared/Statement";
import { CtaBanner } from "@/components/shared/CtaBanner";

export const metadata = {
  title: "About",
  description:
    "Noir Creative is a digital engineering and design collective — strategic discovery, creative innovation, and scalable growth, built entirely in-house.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Company profile"
        title={
          <>
            We build intelligent digital <em className="lime-accent not-italic">solutions.</em>
          </>
        }
        description="Not just deliverables. Our mission is simple: help ambitious brands transform ideas into powerful digital experiences that grow, innovate, and stay ahead of the curve."
      />
      <CompanyProfile long />
      <Solutions />
      <Statement caption="We understand cultures, trends, and behaviors to build strategies that connect locally — with global insight to help your brand succeed in every market." />
      <CtaBanner />
    </>
  );
}