import styled from 'styled-components';
import { space } from 'styled-system';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20rem;
  padding: 0.25rem 0rem 0.25rem;
`;

export const Spacer = styled.div(space);
