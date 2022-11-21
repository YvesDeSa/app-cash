import { shade } from "polished";
import styled from "styled-components";

import signBackgroundImage from "../../assets/ngcard.svg";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
  max-width: 700px;
  img {
    height: 10rem;
  }

  form{
    width: 340px;
    margin: 80px 0;
    text-align: center;

    h1{
      margin-bottom: 24px;
    }
  }

  a {
    color: #9933FF;
    display: block;
    text-decoration: none;
    margin-top: 24px;
    transition: color 0.2s;
    display: flex;
    align-items: center;
      
    &:hover {
      color: ${shade(0.4, '#9933FF')};
    }
    svg{
      margin: 1px 14px 0 0;
    }
  }

`;

export const Background = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 60px 0 0 60px;
`;

export const ImageBackground = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${signBackgroundImage}) no-repeat center;
  background-size: cover;
`;