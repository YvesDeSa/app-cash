import { shade } from "polished";
import styled, { css } from "styled-components";

interface ButtonFilterTransactionProps {
  isSelected: boolean;
}

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin-bottom: -10px;
  background-color: #ddd;
`;

export const Header = styled.header`
  padding: 32px 0;
  background: #000;
`;

export const HeaderContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 25px;
  display: flex;
  align-items: center;

  > img {
    height: 5rem; 
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg{
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Welcome = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 96%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 25px;
`;

export const WelcomeMessage = styled.div`
  span {
    color: #000;
    display: block;
    font-size: 2rem;
    font-weight: 600;
  }

  strong {
    color: #000;
    font-size: 1rem;
  }
`;

export const WelcomeBalance = styled.div`
  text-align: end;

  span {
    color: #000;
    display: block;
    font-size: 1rem;
  }

  strong {
    color: #000;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;


export const Content = styled.main`
  max-width: 1120px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
`;

export const Transactions = styled.div`
  margin: 1.4rem auto;
  width: 90%;
  background-color: #e8e8e8;
  border: 2px solid #eee;
  border-radius: 10px;
  padding: 2rem 1.4rem;
`;

export const HeaderTransactions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: #000;
    font-size: 1.5rem;
  }

  button {
    color: #9933FF;
    background-color: #e8e8e8;
    border: 0;
    font-size: 40px;

    display: flex;
    align-items: center;
  }
`;

export const CardTransaction = styled.div`
  background-color: #efefef;
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid #fff;
  margin-top: .5rem;

  display: flex;
  justify-content: space-between;

  p {
    color: #000;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 1.3rem;

    svg {
      margin-right: .3rem;
      padding-top: 3px;
    }
  }

  > div {
    text-align: end;

    span {
      display: block;
      color: #333;
    }
    strong {
      color: #000;
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

`;

export const SectionFilterTransaction = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 8px 0;

  p {
    color: #444;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 4px;

    svg {
      margin-right: .3rem;
      padding-top: 3px;
    }
  }
`;


export const SectionTransaction = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 8px 0;

  button{
    padding: 5px 35px;
    background-color: #9933FF;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #9933FF;
    margin: 10px 0;

    @media (max-width: 500px){
      width: 100%;
    }

    svg {
      margin-top: 3px;
    }
  }
`;


export const ButtonFilterTransaction = styled.button<ButtonFilterTransactionProps>`
  background-color: #e8e8e8;
  border: 2px solid #9933FF;
  padding: 8px 12px;
  border-radius: 10px;
  margin-right: 10px;

  :hover {
    background-color: #9933FF;
    color: #fff;
  }

  ${props => props.isSelected && css`
    background-color: #9933FF;
    color: #fff;
  `}
`;

export const FilterTransactionField = styled.select`
  background: #eee;
  border-radius: 10px;

  border: 2px solid #9933FF;
  color: #666360;
  transition: border 0.4s;
`;

export const ActionField = styled.div`
  input {
    padding: 5.5px;
    border-radius: 10px;
    color: #444;
    border: 2px solid #9933FF;
    background-color: #e8e8e8;
  }
`;

export const ButtonCashIn = styled.button`
  padding: 8px 12px;
  background-color: #e6fffa;
  border: 2px solid #2e656a;
  border-radius: 10px;
  margin-right: 10px;
  color: #2e656a;

  svg {
    margin-left: 3px;
  }

  :hover {
    background-color: #2e656a;
    color: #fff;
  }
`;

export const MessageAlreadyExists = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 20%;
    width: 100%;

    margin: 40px 0;

    p {
      font-size: 1.2rem;
      font-weight: 500;
      color: #aaa;
    }
`;

export const ButtonCheck = styled.button`
  padding: 5px 8px;
  background-color: #9933FF;
  color: #fff;
  border-radius: 10px;
  border: 2px solid #9933FF;
  margin-left: 10px;

  svg {
    margin-top: 3px;
  }
`;

export const ButtonCashOut = styled.button`
  padding: 8px 12px;
  background-color: #fddede;
  border: 2px solid #c53030;
  border-radius: 10px;
  margin-right: 10px;
  color: #c53030;

  svg {
    margin-left: 3px;
  }

  :hover {
    background-color: #c53030;
    color: #fff;
  }
`;


export const ButtonCashAll = styled.button`
  padding: 8px 12px;
  background-color: #ebf8ff;
  border: 2px solid #3162b7;
  border-radius: 10px;
  margin-right: 10px;
  color: #3162b7;

  svg {
    margin-left: 3px;
  }

  :hover {
    background-color: #3162b7;
    color: #fff;
  }
`;