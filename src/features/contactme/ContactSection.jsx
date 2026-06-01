import styled from "styled-components";
import { SectionTitle } from "../../ui/Text";
import Button from "../../ui/Button";
import Icons from "../../ui/Icons";
import ButtonShortcuts from "../../ui/ButtonShortcuts";
import { useCopyEmail } from "../../hooks/useCopyEmail";

const StyledSection = styled.section`
  background: var(--color-text-800);
  color: var(--color-text-50);

  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

  @media screen and (max-width: 657px) {
    flex-direction: column;
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
    background: var(--color-text-50);
    mix-blend-mode: soft-light;
    outline: none;
    border-radius: 1.2rem;
    border: none;
    min-height: 5rem;
    padding: 0.8rem;
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
  width: 45%;
  height: auto;
  background-color: var(--color-text-50);

  @media screen and (max-width: 657px) {
    width: 100%;
    height: 45rem;
  }
`;

function ContactSection() {
  const { copied, handleCopyEmail } = useCopyEmail();

  function onCopyEmail(e) {
    e.preventDefault();
    handleCopyEmail();
  }

  return (
    <StyledSection>
      <StyledDiv>
        <SectionTitle>./Let us chat</SectionTitle>
        <StyledForm>
          <p>
            Building something exciting or need help brainstorming solutions to
            an itching problem? Let’s chat
          </p>

          <FormBlock>
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" rows="15"></textarea>
          </FormBlock>

          <FormBlock>
            <label htmlFor="email">
              Email address <span>(if you would like a reply)</span>
            </label>
            <input type="email" name="email" id="email" />
          </FormBlock>

          <ButtonContainer>
            <Button
              type="submit"
              variation="primary"
              icon={<Icons type="send" />}
              shortcuts={<ButtonShortcuts type="send" />}
            >
              Send
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

      <GameDiv></GameDiv>
    </StyledSection>
  );
}

export default ContactSection;
