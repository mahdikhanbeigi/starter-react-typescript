import styled from "styled-components";

export const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;
export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.style.getColor("dark", 2, 0.6)};
  z-index: -1;
`;

export const Content = styled.div`
  border-radius: ${(props) => props.theme.style.sizing?.radius}rem;
  background-color: ${(props) => props.theme.style.getColor("grey")};
  border: 1px solid ${(props) => props.theme.style.getColor("grey", 2)};
  max-width: 500px !important;
  width: 100%;
  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: ${(props) => props.theme.style.getColor("text")};
    font-size: 1.2rem;
  }
`;
