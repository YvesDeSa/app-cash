import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`
  background: #9933FF;
  border-radius: 10px;
  height: 56px;
  border: 0;
  padding: 16px;
  width: 100%;
  font-weight: 500;
  color: #fff;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover{
    background: ${shade(0.2, '#9933FF')};
  }
`;