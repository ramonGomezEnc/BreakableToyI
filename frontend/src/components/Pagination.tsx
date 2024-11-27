import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import styled from '@emotion/styled';

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => (
  <StyledPagination>
    <MuiPagination
      count={totalPages}
      page={currentPage + 1}
      onChange={(event, page) => onPageChange(event, page - 1)}
      color="primary"
    />
  </StyledPagination>
);

export default Pagination;
