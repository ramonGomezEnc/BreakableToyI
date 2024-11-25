import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';

const StyledStatistics = styled(Card)`
  background-color: #f9f9f9;
  margin-top: 20px;
`;

const Statistics: React.FC = () => {
  return (
    <StyledStatistics>
      <CardContent>
        <Typography variant="h6">Statistics</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <div>
            <strong>Average time to finish tasks:</strong> 22:15 minutes
          </div>
          <div>
            <strong>Average time by priority:</strong>
            <ul>
              <li>Low: 10:25 mins</li>
              <li>Medium: 10:25 mins</li>
              <li>High: 10:25 mins</li>
            </ul>
          </div>
        </Box>
      </CardContent>
    </StyledStatistics>
  );
};

export default Statistics;