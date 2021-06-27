import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { TabContext } from '@material-ui/lab';

import Overview from './Overview';
import Control from './Control';

import { useConcelhos } from '../../hooks/concelho';

import { Tab, TabList, TabPanel } from './styles';

const sections = {
  OVERVIEW: 0,
  NEW: 1,
  EDIT: 2,
};

const GeoStructure = () => {
  const [section, setSection] = useState(sections.NEW);
  const { loadConcelhos } = useConcelhos();

  useEffect(() => {
    loadConcelhos();
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
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
          <Control goBack={() => setSection(sections.OVERVIEW)} />
        </TabPanel>
        <TabPanel value={sections.EDIT}>
          <Control goBack={() => setSection(sections.OVERVIEW)} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default GeoStructure;
