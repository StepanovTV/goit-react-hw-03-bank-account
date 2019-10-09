import styled from 'styled-components';

export const TransactionHistoryWrapper = styled.section`
  display: blok;
`;

export const TableTransaction = styled.table`
  margin: 0 0 40px 0;
  text-align: center;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  & thead {
    background-color: #03258c;
    color: white;
  }

  & th,
  & td {
    padding: 10px;
  }

  & tr:nth-child(even) {
    background: #eee;
  }

  & thead tr {
    background-color: #03258c;
  }
`;
