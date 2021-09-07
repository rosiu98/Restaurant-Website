import styled from "styled-components";

export const Message = styled.div`
  padding: 1rem 2rem;
  max-width: 360px;
  text-align: center;
  color: white;
  font-size: 1.3rem;
  font-weight: 500;
  background-color: ${(props) => props.color};
`;
