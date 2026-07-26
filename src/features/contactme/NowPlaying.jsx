import { motion } from "motion/react";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getNowPlaying } from "../../lib/spotify";
import { Paragraph, SectionTitle } from "../../ui/Text";

const pulse = keyframes`
  0%, 100% { transform: scaleY(0.4);}
  50% {transform: scaleY(1)}
`;

const Widget = styled(motion.a)`
  min-height: 43rem;
  min-width: 39rem;
  /* height: 90%;
  width: 75%; */
  border-radius: 4.8rem;
  padding: 3.2rem;
  position: relative;
  color: var(--color-text-light);
  text-decoration: none;

  display: flex;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--color-text-light);
    mix-blend-mode: soft-light;
  }
`;

const Content = styled.span`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const AlbumArt = styled(motion.img)`
  height: 26rem;
  width: 26rem;
  border-radius: 150%;
  object-fit: cover;
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;

  width: 100%;
`;

const Details = styled.div``;

const Title = styled.h3`
  font-family: "PT Serif", serif;
  font-size: 2rem;
`;

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 3rem;
`;

const Bar = styled.span`
  display: block;
  background: var(--color-text-400);
  border-radius: 4px;
  width: 0.5rem;
  height: ${({ $h }) => $h}px;

  transform-origin: bottom;
  animation: ${pulse} ${({ $dur }) => $dur}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

// ─── Spotify Logo ─────────────────────────────────────────────────────────────
function SpotifyLogo({ size = 20, ...styles }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#ffffff"
      {...styles}
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export default function NowPlaying() {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setPct] = useState(0);

  async function fetchSong() {
    const data = await getNowPlaying();
    console.log(data);
    setSong(data);
    if (data.isPlaying && data.duration) {
      setPct((data.progress / data.duration) * 100);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSong();
    const id = setInterval(fetchSong, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {}, []);

  return (
    <Widget href={song?.songUrl}>
      <Content>
        <SpotifyLogo
          size={40}
          style={{
            position: "absolute",
            right: "0",
          }}
        />
        <AlbumArt src={song?.albumImageUrl} />

        <DetailsContainer>
          <Details>
            <SectionTitle
              style={{
                color: "var(--color-text-400)",
              }}
            >
              Currently Listening to
            </SectionTitle>
            <Title>{song?.title}</Title>
            <Paragraph>{song?.artist}</Paragraph>
          </Details>

          <Bars>
            <Bar $h={10} $dur={0.5} $delay={0.0} />
            <Bar $h={24} $dur={0.8} $delay={0.15} />
            <Bar $h={15} $dur={0.5} $delay={0.2} />
            <Bar $h={30} $dur={1} $delay={0.25} />
            <Bar $h={14} $dur={0.6} $delay={0.1} />
          </Bars>
        </DetailsContainer>
      </Content>
    </Widget>
  );
}
