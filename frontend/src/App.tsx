import React from 'react';
import { GlobalStyles } from './styles/globalStyles';
import TaskContainer from './containers/taskContainer';

const App: React.FC = () => (
  <>
    <GlobalStyles />
    <TaskContainer />
  </>
);

export default App;
