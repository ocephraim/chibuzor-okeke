import { motion } from "motion/react";
import styled, { css } from "styled-components";

const variations = {
  round: css`
    border-radius: 50%;
  `,

  square: css`
    border-radius: 1px;
  `,
};

const Img = styled(motion.img)`
  height: 8rem;
  width: 8rem;
  object-fit: cover;
  filter: saturate(25%) sepia(0.12) hue-rotate(-150deg);

  transition: filter 0.2s ease;

  ${(props) => variations[props.variation]}

  @media screen and (max-width: 657px) {
    height: 6.4rem;
    width: 6.4rem;
  }
`;

function ProfileImage({ variation = "round", src = "", alt = "", ...props }) {
  return <Img src={src} alt={alt} variation={variation} {...props} />;
}

export default ProfileImage;
