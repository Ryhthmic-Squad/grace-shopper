import React from 'react';
import FeaturedButton from '../../components/styles/FeaturedButton';
import styled from 'styled-components';

const SummaryCard = styled.div`
  background: #e5e5e5;
  padding: 1rem 2rem 2rem 2rem;
`;

const Summary = () => {
  return (
    <SummaryCard>
      <h3>Cart Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Merchandise</td>
            <td>$1650.00</td>
          </tr>
          <tr>
            <td>Estimated Tax</td>
            <td>$0.00</td>
          </tr>
          <tr>
            <td>Estimated Shipping</td>
            <td>$0.00</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>Estimated Order Total</td>
            <td>$1650.00</td>
          </tr>
        </tbody>
      </table>
      <FeaturedButton>Checkout Now</FeaturedButton>
    </SummaryCard>
  );
};

export default Summary;
