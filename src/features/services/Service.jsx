import styled, { keyframes } from "styled-components";
import { useEffect, useRef } from "react";

const progressFill = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const StyledService = styled.button`
  padding: 2.4rem 0 0;
  border: none;
  background: transparent;
  width: 100%;

  color: var(--color-text-800);
  font-family: inherit;
  font-size: inherit;
  line-height: 145%;
  text-align: left;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: ${(props) => (props.$isOpen ? "1" : "0")};
  transition: flex 0.3s ease-out;

  cursor: pointer;
`;

const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  @media screen and (max-width: 657px) {
    align-items: center;
  }
`;

const ServiceText = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  gap: 0.8rem;

  & div {
    display: flex;
    gap: 0.6rem;
    align-items: center;

    & svg {
      fill: var(--color-text-600);
    }

    & h4 {
      font-weight: 600;
    }
  }
`;

const BottomTrack = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin-top: 2.4rem;
  flex-shrink: 0;
  background: rgba(var(--color-text-800-rgb), 0.12);
`;

const ProgressFill = styled.div`
  position: absolute;
  inset: 0;
  transform-origin: left center;
  transform: scaleX(0);
  background: var(--color-accent);
  animation: ${progressFill} ${(props) => props.$durationMs}ms linear forwards;
  animation-play-state: ${(props) => (props.$isPaused ? "paused" : "running")};
`;

function Service({
  icon,
  title,
  paragraph,
  serviceImage,
  tools,
  isOpen,
  onClick,
  cycleDurationMs,
  useProgressAnimation,
  onCycleComplete,
  progressKey,
  isPaused,
}) {
  const timeoutIdRef = useRef(null);
  const startedAtRef = useRef(0);
  const remainingMsRef = useRef(cycleDurationMs);

  useEffect(() => {
    if (useProgressAnimation) return undefined;

    if (!isOpen) {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
      remainingMsRef.current = cycleDurationMs;
      startedAtRef.current = 0;
      return undefined;
    }

    if (!isPaused) {
      if (remainingMsRef.current <= 0) {
        onCycleComplete?.();
        return undefined;
      }

      startedAtRef.current = Date.now();
      timeoutIdRef.current = window.setTimeout(() => {
        remainingMsRef.current = cycleDurationMs;
        onCycleComplete?.();
      }, remainingMsRef.current);
    } else if (timeoutIdRef.current) {
      const elapsed = Date.now() - startedAtRef.current;
      remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }

    return () => {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    };
  }, [
    isOpen,
    isPaused,
    useProgressAnimation,
    cycleDurationMs,
    onCycleComplete,
  ]);

  useEffect(() => {
    if (!isOpen) return;
    remainingMsRef.current = cycleDurationMs;
    startedAtRef.current = 0;
  }, [progressKey, isOpen, cycleDurationMs]);

  function handleProgressEnd(event) {
    if (event.target !== event.currentTarget) return;
    onCycleComplete?.();
  }

  return (
    <StyledService type="button" $isOpen={isOpen} onClick={onClick}>
      <ServiceContent>
        <ServiceText>
          <div>
            {icon}
            <h4>{title}</h4>
          </div>

          {isOpen && <p>{paragraph}</p>}
        </ServiceText>

        {isOpen && <>{serviceImage}</>}

        {isOpen && <>{tools}</>}
      </ServiceContent>

      <BottomTrack aria-hidden>
        {isOpen && useProgressAnimation && (
          <ProgressFill
            key={progressKey}
            $durationMs={cycleDurationMs}
            $isPaused={isPaused}
            onAnimationEnd={handleProgressEnd}
          />
        )}
      </BottomTrack>
    </StyledService>
  );
}

export default Service;
