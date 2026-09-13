/* Real client reviews, transcribed from the Facebook recommendations in
   public/reviews/ (page shows "100% recommend · 8 reviews"), newest first.

   Notes on the transcription:
   • Facebook recommendations have no star rating — every entry here is a
     positive "recommends", so all are recorded as 5. (Patti Yost's review
     literally says "10 out of 10 stars!")
   • `category` is inferred from what each review describes (logo, website,
     flyer) — it isn't stated by the reviewer.
   • `quote` holds the COMPLETE review. Cards are a fixed size, so anything
     that doesn't fit is clipped and gets a "Read more" button that opens the
     full text — no need to pre-trim anything here. Paragraph breaks are "\n\n"
     and render as real paragraphs.
   • Trailing decorative emoji from the originals are dropped.
*/
export const testimonials = [
  {
    rating: 5,
    category: "Graphic Design",
    quote:
      "Thank you so much for my beautiful logo, I wanted something eye catching and unique and you nailed it perfectly.",
    name: "Angelita P. Guevarra",
    role: "Client",
  },
  {
    rating: 5,
    category: "Web Development",
    quote:
      "Hired Noir Creative to build our website for Nexus Guard and they honestly exceeded our expectations. Clean design, professional layout, and they truly understood our brand. Our clients have already complimented the site. They're now managing our social media as well, and we've had the same great experience. Fast delivery, easy to work with, and highly recommended!",
    name: "Nexus Guard",
    role: "Client",
  },
  {
    rating: 5,
    category: "Web Development",
    quote:
      "I hired them to build my business website, and the experience was fantastic. They kept me informed throughout the entire process and made sure every detail was exactly how I wanted it.",
    name: "Donte Ellison",
    role: "Client",
  },
  {
    rating: 5,
    category: "Graphic Design",
    quote:
      "NOIR Creative did EXACTLY what I contracted them to do: Turn my logo into a scalable vectorized image for print purposes. They gave me three different versions (full logo, icon only, and full logo without my tag line) in MULTIPLE options - full color, solid black, solid white, and more. They were affordable and FAST. I was able to order my marketing materials the SAME day that I hired them due to their super fast turn around time. 10 out of 10 stars!",
    name: "Patti Yost",
    role: "Client",
  },
  {
    rating: 5,
    category: "Graphic Design",
    quote:
      "They designed an amazing logo for my business. They nailed the concept on the first try and I absolutely love it!",
    name: "Inayah Jayee",
    role: "Client",
  },
  {
    rating: 5,
    category: "Web Development",
    quote:
      "I had a great experience working with Noir Creative LLC. They were responsive, professional, and really listened to what I wanted for my website. The entire process was straightforward, and they kept me updated every step of the way.\n\nThe final website looks amazing, is easy to navigate, and perfectly represents my business. I've already received compliments on the design and user experience. If you're looking for someone who delivers quality work and genuinely cares about their clients, I highly recommend Noir Creative LLC.",
    name: "Mary David",
    role: "Client",
  },
  {
    rating: 5,
    category: "Graphic Design",
    quote:
      "I genuinely cannot recommend her enough. From beginning to end, she was incredibly sweet, attentive, and communicative throughout the entire process. One thing I appreciated so much is that she consistently kept me updated every step of the way. I never felt left wondering what was going on or when I would hear back, because she communicated clearly and made sure I was involved in the process in a way that felt collaborative and thoughtful.\n\nAnd let me be very honest: I am PICKY. I know exactly what I want, I pay attention to details, and I can be very particular about how I envision things. Not once did she ever make me feel difficult to work with or like I was “too much” for wanting certain adjustments or revisions. Instead, she was patient, understanding, and genuinely receptive to feedback in a way that made the entire experience feel comfortable and enjoyable. That alone sets her apart.\n\nWhat really made this experience unique, though, is that it never felt like she was just throwing together “another flyer” and moving on to the next client. You can tell she genuinely cares. It felt like she wanted to be an integral part of helping bring the event to life and showing it to other people in the best, most meaningful way possible. There was intention behind everything. She cared about how it represented the moment, the vision, and the feeling behind it, and that meant a lot to me.\n\nI can say that soooo many people just complete a service and move on, she truly stands out. The level of care, patience, communication, and attention she puts into her work makes the experience feel personal rather than transactional. I did not only end up loving my flyer but genuinely feeling supported creatively throughout the process and never like I was “too much.”\n\nIf you are considering booking with her, do it. Seriously. She sets herself apart in the best way and creates an experience that feels so much more thoughtful and personalized than what you would typically expect. I would highly, highly recommend her to anyone looking for someone talented, kind, communicative, and truly invested in bringing your vision to life.",
    name: "Jhah Jhah",
    role: "Client",
  },
  {
    rating: 5,
    category: "Graphic Design",
    quote:
      "I recommend this graphic company to anyone who really want their flyers to come out looking flawless and clean.",
    name: "Kenny Moneyman",
    role: "Client",
  },
];
