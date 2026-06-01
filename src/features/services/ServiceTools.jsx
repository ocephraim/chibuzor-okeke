import styled from "styled-components";

const designTools = {
  figma: {
    img: "src/assets/tools/design/figma.png",
    alt: "Figma",
  },
  rive: {
    img: "src/assets/tools/design/rive.png",
    alt: "Rive",
  },
  jitter: {
    img: "src/assets/tools/design/jitter.png",
    alt: "Jitter",
  },
  cosmos: {
    img: "src/assets/tools/design/cosmos.png",
    alt: "Cosmos",
  },
  claude: {
    img: "src/assets/tools/design/claude.png",
    alt: "Claude.ai",
  },
};

const devTools = {
  reactjs: {
    img: "src/assets/tools/development/reactjs.png",
    alt: "reactjs",
  },
  webflow: {
    img: "src/assets/tools/development/webflow.png",
    alt: "webflow",
  },
  tailwindcss: {
    img: "src/assets/tools/development/tailwindcss.png",
    alt: "tailwindcss",
  },
  framer: {
    img: "src/assets/tools/development/framer.png",
    alt: "framer",
  },
  cursor: {
    img: "src/assets/tools/development/cursor.png",
    alt: "cursor",
  },
};

const strategyTools = {
  miro: {
    img: "src/assets/tools/strategy/miro.png",
    alt: "miro",
  },
  notion: {
    img: "src/assets/tools/strategy/notion.png",
    alt: "notion",
  },
  analytics: {
    img: "src/assets/tools/strategy/analytics.png",
    alt: "analytics",
  },
  linear: {
    img: "src/assets/tools/strategy/linear.png",
    alt: "linear",
  },
  hotjar: {
    img: "src/assets/tools/strategy/hotjar.png",
    alt: "hotjar",
  },
};

const TOOLS = {
  design: designTools,
  engineering: devTools,
  strategy: strategyTools,
};

const Tools = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const ToolItem = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;

  &:hover span,
  &:focus-visible span {
    opacity: 1;
    transform: translate(-50%, -0.4rem);
    visibility: visible;
  }
`;

const Tool = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  border: 1px solid var(--color-text-50);
  border-radius: 0.8rem;
  object-fit: contain;
`;

const Tooltip = styled.span`
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.6rem);
  transform: translate(-50%, 0);
  background-color: var(--color-text-800);
  color: #fff;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0.6rem 0.8rem;
  border-radius: 0.8rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease-out,
    transform 0.2s ease-out;
`;

function ServiceTools({ type }) {
  const tools = Object.entries(TOOLS[type] ?? {}).map(([key, value]) => (
    <ToolItem key={key} tabIndex={0}>
      <Tool src={value.img} alt={value.alt} loading="lazy" />
      <Tooltip>{value.alt}</Tooltip>
    </ToolItem>
  ));

  return <Tools>{tools}</Tools>;
}

export default ServiceTools;
