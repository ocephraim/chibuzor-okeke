import styled, { keyframes } from "styled-components";

const SERVICE_ITEMS = {
  design: [
    {
      title: "User Research",
      body: "Interviews and usability tests to understand user needs and synthesize into products.",
    },
    {
      title: "Product Design",
      body: "End-to-end digital products designed with a user-first approach and great attention to detail.",
    },
    {
      title: "Motion & Interaction Design",
      body: "Thoughtful animations that elevate the experience and make interfaces feel alive.",
    },
    {
      title: "Web Design",
      body: "Conversion-focused websites that balance  identity, aesthetics and usability.",
    },
    {
      title: "Design Systems",
      body: "Scalable component libraries and guidelines to ensure consistency across products and teams.",
    },
    {
      title: "Information Architecture",
      body: "Clear and intuitive structures for complex and large systems.",
    },
  ],

  engineering: [
    {
      title: "Web Development",
      body: "Beautiful, fast, accessible websites and web applications built to power you business.",
    },
    {
      title: "Frontend Engineering",
      body: "Pixel-perfect, performant interfaces built with modern technologies and frameworks.",
    },
    {
      title: "No-code Developement",
      body: "Webflow & Framer websites built to design precision and world-class standards.",
    },
    {
      title: "CMS & API Integrations",
      body: "Setup of modern content management systems and integrations to boost efficiency.",
    },
    {
      title: "Motion Engineering",
      body: "Smooth micro-interactions and animations that elevate the experience and make interfaces feel alive.",
    },
  ],

  strategy: [
    {
      title: "Design Leadership",
      body: "Clarify and align product vision with business needs and synthesize into day-to-day design activities.",
    },
    {
      title: "Product Strategy",
      body: "Define product roadmap and prioritise features that support long-term growth.",
    },
    {
      title: "Design Audits",
      body: "Evaluate an existing product through a critical lens to surface the good, the bad and the ugly.",
    },
    {
      title: "Innovation Cosulting",
      body: "Explore emerging opportunities, validate ideas, and help teams build future-ready products.",
    },
    {
      title: "Brand Strategy",
      body: "Shape how your brand is positioned, perceived and communicated to the world.",
    },
  ],
};

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(48px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ServiceItem = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  animation: ${fadeUp} 0.4s ease-out forwards;
  animation-delay: ${(props) => props.$delay}ms;
  opacity: 0;

  & h3 {
    font-size: 1.4rem;
    font-weight: 600;

    @media screen and (max-width: 657px) {
      font-size: 1.3rem;
    }
  }

  & p {
    font-size: 1.2rem;
    color: var(--color-text-400);
    line-height: 145%;
  }
`;

function ServiceItems({ type }) {
  const Item = SERVICE_ITEMS[type];

  return (
    <>
      {Item?.map((item, index) => (
        <ServiceItem key={item.title} $delay={index * 60}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </ServiceItem>
      ))}
    </>
  );
}

export default ServiceItems;
