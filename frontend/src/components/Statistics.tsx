import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';

const StyledStatistics = styled(Box)`
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Statistics: React.FC = () => {
  return (
    <StyledStatistics>
      <CardContent>
        <Typography variant="h6">Statistics</Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <div>
            <strong>Average time to finish tasks:</strong>
            <p>22:15 minutes</p>
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
