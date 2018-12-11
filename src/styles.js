import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
`;

const BasicPageElement = styled.div`
  padding: 20px;
  color: white;
`;

export const Header = styled(BasicPageElement)`
  background-color: #222;
`;

export const SubHeader = styled(BasicPageElement)`
  padding: 30px;
  background-color: #333;
`;

export const Body =styled(BasicPageElement)`
  background-color: #555;
`;


export const Title = styled.h1`
  font-size: 1.3em;
`;

export const Greeting = styled.p`
  color: white;
`;

export const BasicButton = styled.button`
  font-family: inherit;
  font-size: 1rem;
  border-radius: 0;
  padding: 0.25rem 1rem;
  margin: 0 1rem;
  background: transparent;
  color: white
  border: 2px solid;
`;

export const BasicInput = styled.input`
  font-family: inherit;
  font-size: 1rem;
  border-radius: 0;
  padding: 0.25rem 1rem;
  margin: 0 1rem;
  margin-bottom: 0.3rem;
  background: #AAA;
  color: white;
  border: 2px solid;
`;
