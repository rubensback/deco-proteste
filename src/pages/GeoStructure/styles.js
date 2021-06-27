import styled from 'styled-components';

import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/lab/TabList';

export const Tab = styled(MuiTab)`
  &.Mui-disabled {
    display: none;
  }
`;

export const TabList = styled(MuiTabs)`
  && .indicator {
    background-color: #1f6ff7;
  }
`;
