export const reviews = [
  {
    id: "krishna",
    name: "Krishna Vamsee",
    role: "Co-founder, Unque.me",
    image: "/Krishna.png",
    reviewText:
      "Chibuzor brought clarity to our product from day one, combining strategic thinking with strong UX and UI design to help shape our vision during the company's earliest stages. He was consistently professional, patient, and thoughtful in his approach. His time discipline kept us on schedule, and his clear communication made collaboration smooth throughout.",
    reviewSummary: "Gets the big picture",
  },
  {
    id: "wale",
    name: "Olawale Ariyo",
    role: "Software Engineer, Busha",
    image: "/Wale.png",
    reviewText:
      "Working with Chibuzor is a seamless experience. His attention to detail, product thinking, and ability to design intuitive, world-class user experiences consistently elevate every project we collaborate on.",

    reviewSummary: "Easy To Work With",
  },
  {
    id: "sam",
    name: "Samuel Ekpe",
    role: "CEO, Grupa",
    image: "/Sam.png",
    reviewText:
      "For over five years, Chibuzor played a pivotal role in shaping our products. He grew into an indispensable design and product leader whose decisions shaped the direction of the company at every critical stage, providing real business value.",
    reviewSummary: "Gets Things Done",
  },
  {
    id: "boma",
    name: "Boma Josiah",
    role: "Senior Product Designer",
    image: "/Boma.png",
    reviewText:
      "I have worked closely with Chibuzor over the years. I admire how honest and self-aware he is, he enjoys tackling design problems, his Product Design expertise is deep and well-rounded.",
    reviewSummary: "Sharp Product Mind",
  },
];

export function getReveiwsByIds(ids) {
  if (!ids?.length) return [];

  return ids.map((id) => reviews.find((r) => r.id === id)).filter(Boolean);
}
