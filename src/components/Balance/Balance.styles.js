import styled from 'styled-components';

export const BalanceWrapper = styled.section`
  display: blok;
`;

export const BalanceContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  font-size: 1.2rem;
`;

export const Icon = styled.span`
  color: ${props => (props.color ? props.color : 'red')};
`;

export const CellBalanse = styled.span`
  margin: auto 15px;
`;
