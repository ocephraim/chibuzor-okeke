import { useEffect, useRef, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

import { useCopyEmail } from "../../hooks/useCopyEmail";
import { SectionTitle } from "../../ui/Text";
import Button from "../../ui/Button";
import Icons from "../../ui/Icons";
import ButtonShortcuts from "../../ui/ButtonShortcuts";
import toast from "react-hot-toast";
import LiquidGlassBlob from "./LiquidGlassBlob";
import NowPlaying from "./NowPlaying";

const StyledSection = styled.section`
  background: var(--color-bg-dark);
  color: var(--color-text-light);

  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

  @media screen and (max-width: 657px) {
    flex-direction: column-reverse;
    gap: 4.8rem;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  width: 40%;

  @media screen and (max-width: 820px) {
    width: 50%;
  }

  @media screen and (max-width: 657px) {
    width: 100%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  line-height: 145%;

  input,
  textarea {
    background: var(--color-text-light);
    mix-blend-mode: soft-light;
    outline: none;
    border-radius: 1.2rem;
    border: none;
    min-height: 5rem;
    padding: 1.6rem;
    /* color: #ffffff; */
  }
`;

const FormBlock = styled.div`
  display: inherit;
  flex-direction: inherit;
  gap: 0.8rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.4rem;
`;

const GameDiv = styled.div`
  width: 50%;
  height: auto;
  min-height: 40rem;
  background-color: transparent;
  border-radius: 2rem;
  overflow: visible;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 657px) {
    width: 100%;
    height: 45rem;
    display: none;
  }
`;

function ContactSection() {
  const { copied, handleCopyEmail } = useCopyEmail();
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = useCallback(
    function (e) {
      if (e) e.preventDefault();

      if (isSending) return;
      if (!form.current.reportValidity()) return;

      setIsSending(true);

      emailjs
        .sendForm("service_tj1qjmh", "template_evbl1mm", form.current, {
          publicKey: "wJa26mck0SUUmDRO8",
        })
        .then(
          () => {
            toast.success("Email sent successfully! I'll reply shortly");
            form.current.reset();
          },
          (error) => {
            toast.error("Email failed to send. Please try again");
            console.error("FAILED...", error);
          },
        )
        .catch((err) => {
          toast.error("A network error occured. Please try again");
          console.error("CRITICAL ERROR:", err);
        })
        .finally(() => {
          setIsSending(false);
        });
    },
    [isSending],
  );

  useEffect(
    function () {
      function handleKeyDown(e) {
        const key = e.key;
        const isSendShortcut = (e.metaKey || e.ctrlKey) && key === "Enter";

        if (isSendShortcut) {
          e.preventDefault();
          handleSendEmail();
        }
      }

      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
    },
    [handleSendEmail],
  );

  function onCopyEmail(e) {
    e.preventDefault();
    handleCopyEmail();
  }

  return (
    <StyledSection>
      <StyledDiv>
        <SectionTitle>./Let us chat</SectionTitle>
        <StyledForm ref={form} onSubmit={handleSendEmail}>
          <p>
            Building something exciting or need help brainstorming solutions to
            an bugging problem? Let’s chat
          </p>

          <FormBlock>
            <label htmlFor="message">Message</label>
            <textarea name="message" rows="10" required></textarea>
          </FormBlock>

          <FormBlock>
            <label htmlFor="user_email">
              Email address <span>(So I can reply)</span>
            </label>
            <input type="email" name="user_email" id="email" required />
          </FormBlock>

          <FormBlock>
            <label htmlFor="user_name">Your name</label>
            <input type="text" name="user_name" required />
          </FormBlock>

          <ButtonContainer>
            <Button
              type="submit"
              variation="primary"
              icon={<Icons type="send" />}
              shortcuts={<ButtonShortcuts type="send" />}
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send"}
            </Button>

            <Button
              variation="secondary"
              icon={<Icons type="copymail" />}
              shortcuts={<ButtonShortcuts type="copymail" />}
              onClick={onCopyEmail}
            >
              {copied ? "Copied" : "Copy email"}
            </Button>
          </ButtonContainer>
        </StyledForm>
      </StyledDiv>

      <GameDiv>
        {/* <LiquidGlassBlob /> */}
        <NowPlaying />
      </GameDiv>
    </StyledSection>
  );
}

export default ContactSection;
