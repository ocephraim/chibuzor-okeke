import styled, { css } from "styled-components";

const variations = {
  round: css`
    border-radius: 50%;
  `,

  square: css`
    border-radius: 1px;
  `,
};

const Img = styled.img`
  height: 8rem;
  width: 8rem;
  object-fit: cover;
  filter: saturate(25%) sepia(0.12) hue-rotate(-150deg);

  transition: filter 0.2s ease;

  ${(props) => variations[props.variation]}

  @media screen and (max-width: 670px) {
    height: 6.4rem;
    width: 6.4rem;
  }
`;

function ProfileImage({ variation = "round", src = "", alt = "" }) {
  return <Img as="img" src={src} alt={alt} variation={variation} />;
}

export default ProfileImage;
