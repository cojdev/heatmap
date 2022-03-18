import React, { FC } from 'react';
import { DatalistLabel, DatalistValue } from './Datalist.style';

type DatalistType = {
  values: { label: string; value: string | number }[];
};

const Datalist: FC<DatalistType> = ({ values }) => (
  <dl>
    {values.map((item, i) => (
      <React.Fragment key={i}>
        <DatalistLabel>{item.label}</DatalistLabel>
        <DatalistValue>{item.value}</DatalistValue>
      </React.Fragment>
    ))}
  </dl>
);

export default Datalist;
