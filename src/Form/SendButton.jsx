import React from "react";
import styled from "styled-components";

const SendButton = () => {
  return (
    <StyledWrapper>
      <button type="submit" className="send-button">
        Send
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.button`
  .send-button {
    --bezier: cubic-bezier(0.22, 0.61, 0.36, 1);
    --edge-light: hsla(0, 0%, 50%, 0.8);
    --text-light: rgba(255, 255, 255, 0.4);
    --back-color: #162d57;

    cursor: pointer;
    padding: 0.7em 1em;
    border-radius: 0.5em;
    min-height: 2.4em;
    min-width: 3em;
    display: flex;
    align-items: center;
    gap: 0.5em;

    font-size: 18px;
    letter-spacing: 0.05em;
    line-height: 1;
    font-weight: normal;

    color: hsla(0, 0%, 90%);
    border: 0;

    transition: all 0.1s var(--bezier);
  }

  .send-button:hover {
    transform: scale(1.1);
  }

  .send-button:active {
    --text-light: rgba(255, 255, 255, 1);

    color: hsla(0, 0%, 100%, 1);
    letter-spacing: 0.1em;
    transform: scale(1);
  }
`;

export default SendButton;
