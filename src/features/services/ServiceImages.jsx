import styled from "styled-components";

const SERVICE_IMAGE = {
  design: { src: "src/assets/design.png", alt: "design" },
  development: { src: "src/assets/dev.png", alt: "development" },
  strategy: { src: "src/assets/strategy.png", alt: "strategy" },
};

const ServiceImage = styled.img`
  display: block;
  width: 100%;
  height: auto;

  @media screen and (min-width: 658px) {
    display: none;
  }
`;

function ServiceImages({ type }) {
  const Image = SERVICE_IMAGE[type];

  return <ServiceImage type={type} src={Image.src} alt={Image.alt} />;
}

export default ServiceImages;
