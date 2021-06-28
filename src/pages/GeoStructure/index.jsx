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
  VIEW: 3,
};

const GeoStructure = () => {
  const [section, setSection] = useState(sections.OVERVIEW);
  const { loadConcelhos } = useConcelhos();
  const [concelhoSelected, setConcelhoSelected] = useState([]);

  useEffect(() => {
    loadConcelhos();
  }, [loadConcelhos]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <TabContext value={section}>
        <TabList
          onChange={(_, value) => setSection(value)}
          classes={{ indicator: 'indicator' }}
        >
          <Tab label="Overview" />
          <Tab
            label="New"
            disabled={section === sections.EDIT || section === sections.VIEW}
          />
          <Tab label="Edit" disabled={section !== sections.EDIT} />
          <Tab label="View" disabled={section !== sections.VIEW} />
        </TabList>
        <TabPanel value={sections.OVERVIEW}>
          <Overview
            setConcelhoSelected={setConcelhoSelected}
            goToEdit={() => setSection(sections.EDIT)}
            goToView={() => setSection(sections.VIEW)}
          />
        </TabPanel>
        <TabPanel value={sections.NEW}>
          <Control goBack={() => setSection(sections.OVERVIEW)} type="new" />
        </TabPanel>
        <TabPanel value={sections.EDIT}>
          <Control
            goBack={() => setSection(sections.OVERVIEW)}
            concelho={concelhoSelected}
            type="edit"
          />
        </TabPanel>
        <TabPanel value={sections.VIEW}>
          <Control
            goBack={() => setSection(sections.OVERVIEW)}
            concelho={concelhoSelected}
            type="view"
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default GeoStructure;
