import { motion } from "motion/react";
import styled from "styled-components";

const stickers = [
  {
    id: "family",
    src: "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1782319694/mi_familia_gqc57b.png",
    position: {
      left: "50%",
      top: "50%",
      bottom: "",
      right: "",
    },
    toolTip: "❣️️ Di, 👧🏾 Onwa & 👦🏽 Bubu",
  },
  {
    id: "figma",
    src: "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1782319694/figma_ykhb1m.png",
    position: {
      left: "",
      top: "10%",
      bottom: "",
      right: "30%",
    },
    toolTip: "My fave design tool",
  },
  {
    id: "withLove",
    src: "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1782319694/love_designing_jr7ckx.png",
    position: {
      left: "30%",
      top: "25%",
      bottom: "",
      right: "",
    },
    toolTip: "...with love from Chibuzor",
  },
  {
    id: "music",
    src: "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1782319694/afrobeats_frmjbe.png",
    position: {
      left: "",
      top: "",
      bottom: "20%",
      right: "10%",
    },
    toolTip: "🎧 Afrobeats",
  },
  {
    id: "manUtd",
    src: "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1782319694/man_utd_t5dqon.png",
    position: {
      left: "5%",
      top: "",
      bottom: "28%",
      right: "",
    },
    toolTip: "⚽️ Manchester United",
  },
  {
    id: "ps5",
    src: "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1782319695/ps5_orufsb.png",
    position: {
      left: "29%",
      top: "",
      bottom: "33%",
      right: "",
    },
    toolTip: "🎧 Afrobeats",
  },
];

const StickerContainer = styled(motion.div)`
  /* position: relative; */
`;

const Sticker = styled(motion.img)`
  width: 8rem;
  height: auto;
  position: absolute;
  left: ${(props) => props.$left || "auto"};
  right: ${(props) => props.$right || "auto"};
  top: ${(props) => props.$top || "auto"};
  bottom: ${(props) => props.$bottom || "auto"};
  z-index: 160;
  cursor: grab;

  filter: drop-shadow(
    1px 3px 1px color-mix(in srgb, var(--color-text-800) 20%, transparent)
  );

  @media screen and (max-width: 820px) {
    width: 6rem;
  }
`;

const Tooltip = styled(motion.span)`
  position: absolute;
  left: 50%;
  /* bottom: 100%; */
  background-color: var(--color-text-800);
  color: #fff;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0.8rem 0.8rem;
  border-radius: 0.8rem;
  white-space: nowrap;
  pointer-events: none;
  visibility: visible;
`;

function AboutStickers() {
  // const timeoutRef = useRef(null);
  // const [showTooltip, setShowTooltip] = useState(false);

  // function handleShowTooltip() {
  //   setShowTooltip(true);

  //   if (timeoutRef.current) clearTimeout(timeoutRef);

  //   timeoutRef.current = () =>
  //     setTimeout(() => {
  //       setShowTooltip(false);
  //     }, 2500);
  // }

  // function handleHideTooltip() {
  //   if (timeoutRef.current) clearTimeout(timeoutRef.current);

  //   setShowTooltip(false);
  // }

  return (
    <>
      {stickers.map((sticker, i) => (
        <StickerContainer key={sticker.id}>
          <Sticker
            // onMouseEnter={handleShowTooltip}
            // onMouseLeave={handleHideTooltip}
            // onFocus={handleShowTooltip}
            // onBlur={handleHideTooltip}
            // onTouchStart={handleShowTooltip}
            src={sticker.src}
            title={sticker.toolTip}
            $left={sticker.position.left}
            $right={sticker.position.right}
            $top={sticker.position.top}
            $bottom={sticker.position.bottom}
            draggable={false}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            whileDrag={{ cursor: "grabbing" }}
            style={{ x: "-50%", y: "-50%" }}
            initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
            animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
            exit={{ scaleX: 0, scaleY: 0, opacity: 0 }}
            transition={{
              visualDuration: 0.3,
              type: "spring",
              stiffness: 300,
              delay: 1.7 + i * 0.2,
            }}
          />
          {/* <AnimatePresence>
            {showTooltip && (
              <Tooltip
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {sticker.toolTip}
              </Tooltip>
            )}
          </AnimatePresence> */}
        </StickerContainer>
      ))}
    </>
  );
}

export default AboutStickers;
