import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import styled from '@emotion/styled';

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Pagination: React.FC = () => {
  return (
    <StyledPagination>
      <MuiPagination count={10} color="primary" />
    </StyledPagination>
  );
};

export default Pagination;
