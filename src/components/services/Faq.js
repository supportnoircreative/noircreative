"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openId, setOpenId] = useState("01");

  return (
    <section id="faq" className="on-bone px-5 py-[130px] max-sm:py-[88px] md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <SectionHead eyebrow="Good to know" title="Frequently asked questions." />
        <Reveal className="max-w-[860px]">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="border-b border-(--line-on-bone)">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center gap-[22px] bg-transparent px-0 py-[30px] text-left text-lg font-bold text-ink"
                >
                  <span className="badge-num flex-none">{faq.id}</span>
                  <span className="flex-1">{faq.question}</span>
                  <span
                    className={cn(
                      "flex size-[30px] flex-none items-center justify-center rounded-full border border-(--line-on-bone-strong) text-ink transition-all duration-300",
                      isOpen && "rotate-45 border-ink bg-ink text-lime"
                    )}
                  >
                    <Plus size={14} strokeWidth={2} />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-[400ms] ease-(--ease)",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="m-0 max-w-[60ch] pb-[30px] pl-[66px] text-[14.5px] text-[#4A4E48] max-sm:pl-0">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}