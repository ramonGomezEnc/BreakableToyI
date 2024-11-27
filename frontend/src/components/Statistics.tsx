import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';

const StyledStatistics = styled(Box)`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 16px;
`;

interface StatisticsProps {
  average: number | null;
  averagesByPriority: { [key: string]: number };
}

const Statistics: React.FC<StatisticsProps> = ({ average, averagesByPriority }) => {
  return (
    <StyledStatistics>
      <CardContent>
        <Typography variant="h6">
          <strong>Statistics</strong>
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
          <Box flex="1">
            <strong>Average time to finish tasks:</strong>
            <p>{average ? `${average} minutes` : "Not available"}</p>
          </Box>
          <Box flex="1">
            <strong>Average time by priority:</strong>
            <ul>
              <li>Low: {averagesByPriority.Low ? `${averagesByPriority.Low} mins` : "N/A"}</li>
              <li>Medium: {averagesByPriority.Medium ? `${averagesByPriority.Medium} mins` : "N/A"}</li>
              <li>High: {averagesByPriority.High ? `${averagesByPriority.High} mins` : "N/A"}</li>
            </ul>
          </Box>
        </Box>
      </CardContent>
    </StyledStatistics>
  );
};

export default Statistics;