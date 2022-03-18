import React, { FC, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import {
  getWeeks,
  formatTransactionData,
  padZero,
  numberToCurrency,
} from '../../helpers';
import data from '../../data/transactions.json';
import {
  HeatmapCell,
  HeatmapContainer,
  HeatmapControls,
  HeatmapGrid,
  HeatmapRow,
  HeatmapText,
} from './Heatmap.style';
import Datalist from '../Datalist';
import { TransactionList, WeeksType } from '../../types';

const typedData = data as TransactionList;
const formattedData = formatTransactionData(typedData);

const Heatmap: FC = () => {
  const [date] = useState({
    year: 2019,
  });
  const [weeks, setWeeks] = useState<WeeksType>(null);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setWeeks(getWeeks(date.year));
  }, [date]);

  useEffect(() => {
    setTotal(
      Object.entries(formattedData)
        .sort((a: [string, number], b: [string, number]) =>
          a[0].localeCompare(b[0])
        )
        .reduce(
          (acc: number, curr: [string, number]) =>
            !['min', 'max'].includes(curr[0]) ? acc + curr[1] : acc,
          0
        ) as number
    );
  }, [formattedData]);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <>
      <HeatmapContainer>
        <HeatmapGrid>
          <HeatmapRow>
            {days.map((day, i) => (
              <HeatmapText key={i}>{day}</HeatmapText>
            ))}
          </HeatmapRow>
          {weeks &&
            weeks.map((week, i) => (
              <HeatmapRow key={i}>
                {week.map((day, j) => {
                  let dateString = '';
                  let value = 0;
                  let empty = true;
                  if (day) {
                    dateString = `${day.year}-${padZero(
                      day.month + 1
                    )}-${padZero(day.day)}`;
                    value = formattedData[dateString] || 0;
                    empty = false;
                  }

                  return (
                    <React.Fragment key={j}>
                      {empty ? (
                        <HeatmapCell empty={empty} />
                      ) : (
                        <HeatmapCell
                          colour={`rgba(${value < 0 ? 255 : 0}, ${
                            value > 0 ? 255 : 0
                          }, 0, ${
                            value > 0
                              ? value / formattedData.max
                              : value / formattedData.min
                          })`}
                          onClick={() =>
                            setSelected({ i: day.i, value, dateString })
                          }
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </HeatmapRow>
            ))}
        </HeatmapGrid>
      </HeatmapContainer>
      <HeatmapControls>
        <Datalist
          values={[
            {
              label: 'Date',
              value: selected ? selected.dateString : date.year,
            },
            {
              label: 'Balance',
              value: selected
                ? numberToCurrency(selected.value)
                : numberToCurrency(total),
            },
          ]}
        />
        {selected && <Button onClick={() => setSelected(null)}>Clear</Button>}
      </HeatmapControls>
    </>
  );
};

export default Heatmap;
