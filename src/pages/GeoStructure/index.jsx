import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';

import Overview from './Overview';
import Control from './Control';

import { Tab, TabList } from './styles';

const sections = {
  OVERVIEW: 0,
  NEW: 1,
  EDIT: 2,
};

const GeoStructure = () => {
  const [section, setSection] = useState(sections.OVERVIEW);

  return (
    <Box>
      <TabContext value={section}>
        <TabList
          onChange={(_, value) => setSection(value)}
          classes={{ indicator: 'indicator' }}
        >
          <Tab label="Overview" />
          <Tab label="New" disabled={section === sections.EDIT} />
          <Tab label="Edit" disabled={section !== sections.EDIT} />
        </TabList>
        <TabPanel value={sections.OVERVIEW}>
          <Overview />
        </TabPanel>
        <TabPanel value={sections.NEW}>
          <Control />
        </TabPanel>
        <TabPanel value={sections.EDIT}>
          <Control />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default GeoStructure;
