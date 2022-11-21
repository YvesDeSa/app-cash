import { FiArrowLeft, FiDollarSign, FiArrowRight, FiCheck, FiClock, FiInfo, FiPlusCircle, FiPower, FiRefreshCw, FiUser, FiUserCheck, FiUserMinus, FiUserPlus } from "react-icons/fi";
import useAuth from "../../hooks/auth";
import {
  Container,
  Content,
  Header,
  HeaderContainer,
  Welcome,
  WelcomeBalance,
  WelcomeMessage,
  Transactions,
  HeaderTransactions,
  CardTransaction,
  SectionFilterTransaction,
  SectionTransaction,
  ActionField,
  ButtonCashIn,
  ButtonCashOut,
  ButtonCashAll,
  ButtonCheck,
  ButtonFilterTransaction,
  MessageAlreadyExists
} from "./style";

import logoImage from "../../assets/logo-ngcash-branco.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/esm/locale";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from 'yup';
import getValidationErros from "../../utils/getValidationErrors";
import { useToast } from "../../hooks/toast";
import { InputTransaction } from "../../components/InputTransaction";
import { useNavigate } from "react-router-dom";

interface IAccount {
  id: string;
  balance: number;
  balanceFormat?: string;
}

interface ITransactions {
  id: string
  value: number;
  valueFormat?: string;
  date: string;
  dateFormat?: string;
  usernameCashIn: string;
  usernameCashOut: string
}

interface ITransactionFormData {
  username: string;
  value: number;
}

export const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [dateFilter, setDataFilter] = useState(false);
  const [moveFilter, setMoveFilter] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [transactionsAlreadyExist, setTransactionsAlreadyExist] = useState(true);

  const [input, setInput] = useState<string>();

  const [account, setAccount] = useState<IAccount>();
  const [transactions, setTransactions] = useState<ITransactions[]>();
  const { signOut, user } = useAuth();

  const handleSubmit = useCallback(async (data: ITransactionFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().required('Username é obrigatório'),
        value: Yup.number().required('Valor é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/transactions/make', data);

      navigate('/');

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Transação realizada com sucesso'
      });

    } catch (error) {
      if (error instanceof Yup.ValidationError) {

        formRef.current?.setErrors(getValidationErros(error as Yup.ValidationError));

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na transferência',
        description: 'Occoreu um erro realizar a transferência'
      });
    }
  }, [addToast, navigate]);

  const handleTransfActionButton = useCallback(() => {
    setTransfer(!transfer)
  }, [transfer]);
  const handleMoveActionButton = useCallback(() => {
    setMoveFilter(!moveFilter)
    setDataFilter(false)
  }, [moveFilter]);

  const handleDateActionButton = useCallback(() => {
    setDataFilter(!dateFilter)
    setMoveFilter(false)
  }, [dateFilter]);

  const handleMoveCashInAction = useCallback(() => {
    setTransactionsAlreadyExist(true)
    setTransactions([]);
    api.get<ITransactions[]>("/transactions/cash-in").then((response) => {
      const transactionsFormatted = response.data.map(transaction => {
        return {
          ...transaction,
          valueFormat: transaction.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          dateFormat: format(parseISO(transaction.date), "dd-MM-yyyy", { locale: ptBR })
        }
      });
      setTransactionsAlreadyExist(false)
      setTransactions(transactionsFormatted);
    });
  }, []);

  const handleMoveCashOutAction = useCallback(() => {
    setTransactionsAlreadyExist(true)
    setTransactions([]);
    api.get<ITransactions[]>("/transactions/cash-out").then((response) => {
      const transactionsFormatted = response.data.map(transaction => {
        return {
          ...transaction,
          valueFormat: transaction.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          dateFormat: format(parseISO(transaction.date), "dd-MM-yyyy", { locale: ptBR })
        }
      });
      setTransactionsAlreadyExist(false)
      setTransactions(transactionsFormatted);
    });
  }, []);

  const handleMoveUserAction = useCallback(() => {
    setTransactionsAlreadyExist(true)
    setTransactions([]);
    api.get<ITransactions[]>("/transactions/user").then((response) => {
      const transactionsFormatted = response.data.map(transaction => {
        return {
          ...transaction,
          valueFormat: transaction.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          dateFormat: format(parseISO(transaction.date), "dd-MM-yyyy")
        }
      });
      setTransactionsAlreadyExist(false)
      setTransactions(transactionsFormatted);
    });
  }, [])

  const handleMoveDateAction = useCallback(() => {
    setTransactionsAlreadyExist(true)
    setTransactions([]);
    api.get<ITransactions[]>("/transactions/date", {
      params: {
        date: input
      }
    }).then((response) => {

      const transactionsFormatted = response.data.map(transaction => {
        return {
          ...transaction,
          valueFormat: transaction.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          dateFormat: format(parseISO(transaction.date), "dd-MM-yyyy", { locale: ptBR })
        }
      });
      setTransactionsAlreadyExist(false)
      setTransactions(transactionsFormatted);
    });

    !transactionsAlreadyExist && addToast({
      type: 'error',
      title: 'Erro na busca',
      description: 'Não existe nenhuma transferência nessa data'
    });
  }, [input]);


  useEffect(() => {
    api.get<IAccount>("/users/account").then((response) => {
      response.data.balanceFormat = account?.balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

      setAccount(response.data);
    });

    handleMoveUserAction();

  }, [account?.balance, user.accountId]);

  return <>
    <Container>
      <Header>
        <HeaderContainer>
          <img src={logoImage} alt="ng cash" />

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContainer>
      </Header>

      <Content>

        <Welcome>
          <WelcomeMessage>
            <span>Bem vindo</span>
            <strong>{user.username}</strong>
          </WelcomeMessage>

          <WelcomeBalance>
            <span>Seu saldo</span>
            <strong>R$ {account?.balanceFormat}</strong>
          </WelcomeBalance>
        </Welcome>

        <Transactions>
          <HeaderTransactions>
            <h2>Transações</h2>
            <button onClick={handleTransfActionButton}><FiPlusCircle /> </button>
          </HeaderTransactions>

          {transfer ? <SectionTransaction>

            <Form ref={formRef} onSubmit={handleSubmit} >
              <InputTransaction name="username" id="username" icon={FiUser} placeholder="Usuário" />

              <InputTransaction name="value" id="value" icon={FiDollarSign} type="currency" placeholder="Valor" />

              <button type="submit"> <FiCheck /> </button>
            </Form>

          </SectionTransaction> : null}

          <SectionFilterTransaction>
            <p><FiInfo /> filtrar transações </p>
            <div>
              <ButtonFilterTransaction isSelected={moveFilter} onClick={handleMoveActionButton}> <FiRefreshCw /> </ButtonFilterTransaction>
              <ButtonFilterTransaction isSelected={dateFilter} onClick={handleDateActionButton}> <FiClock /> </ButtonFilterTransaction>
            </div>
          </SectionFilterTransaction>

          {moveFilter ? <ActionField>
            <ButtonCashIn onClick={handleMoveCashInAction}><FiUserPlus /></ButtonCashIn>
            <ButtonCashOut onClick={handleMoveCashOutAction}><FiUserMinus /></ButtonCashOut>
            <ButtonCashAll onClick={handleMoveUserAction}><FiUserCheck /></ButtonCashAll>
          </ActionField> : null}

          {dateFilter ? <ActionField>
            <input type="date" onChange={event => {
              setInput(event.target.value);
            }} />
            <ButtonCheck onClick={handleMoveDateAction} > <FiCheck /> </ButtonCheck>
          </ActionField> : null}

          {transactions?.map((transaction) => (
            <CardTransaction key={transaction.id}>
              <div>
                <p> <FiArrowRight color="#2e656a" /> {transaction.usernameCashIn}</p>
                <p> <FiArrowLeft color="#c53030" /> {transaction.usernameCashOut}</p>
              </div>

              <div>
                <strong>R$ {transaction.valueFormat}</strong>
                <span>{transaction.dateFormat}</span>
              </div>
            </CardTransaction>
          ))}

          {transactionsAlreadyExist ? <ActionField>
            <MessageAlreadyExists><p>Sem transações</p></MessageAlreadyExists>
          </ActionField> : null}

        </Transactions>

      </Content>

    </Container>
  </>;
}
