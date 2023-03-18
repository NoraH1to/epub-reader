import { Typography } from '@material-ui/core';
import { FC, memo, useEffect, useRef, useState } from 'react';

export type StatusBarFC = FC<{
  title: string;
}>;

const StatusBar: StatusBarFC = ({ title }) => {
  const getTime = () =>
    `${new Date().getHours().toString().padStart(2, '0')}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  const [timeStr, setTimeStr] = useState(getTime());
  const setTime = (time: string) => {
    setTimeStr(time);
  };
  const timeTimerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timeTimerRef.current !== null) clearInterval(timeTimerRef.current);
    timeTimerRef.current = setInterval(() => setTime(getTime()), 1000);
    return () => {
      timeTimerRef.current !== null && clearInterval(timeTimerRef.current);
    };
  }, []);
  return (
    <>
      <Typography
        style={{
          flexGrow: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginRight: '8px',
        }}
      >
        {title}
      </Typography>
      <Typography>{timeStr}</Typography>
    </>
  );
};

export default StatusBar;
