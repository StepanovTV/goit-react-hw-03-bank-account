import styled from 'styled-components';

export const ControlsWrapper = styled.header`
  display: block;
  background-color: #03258c;
  color: #d9d8d7;
`;

export const WraperFlex = styled.div`
  display: flex;
  justify-content: center;
  height: 110px;
  align-items: center;
`;

export const ControlsInput = styled.input`
  height: 40px;
  width: 250px;
  border: ${props => (!props.err ? '2px solid #233d8c;' : '2px solid #f00;')};
  border-radius: 8px;
  margin-right: 30px;
  padding: 5px 15px;

  :focus {
    border: 2px solid #bfa836;
    outline: none;
  }
`;

export const ControlBtn = styled.button`
  height: 40px;
  width: 150px;
  border: 2px solid #233d8c;
  border-radius: 8px;
  margin-right: 30px;
  background-color: #233d8c;
  text-transform: uppercase;
  color: #fff;
  font-weight: 400;

  :hover,
  :focus {
    border: 2px solid #bfa836;
    background-color: #bfa836;
    color: #233d8c;
    outline: none;
  }
`;
