import React from 'react';

import { useConcelhos } from '../../../hooks/concelho';

const Overview = () => {
  const { concelhos } = useConcelhos();

  console.log(concelhos);

  return <div>Overview</div>;
};

export default Overview;
