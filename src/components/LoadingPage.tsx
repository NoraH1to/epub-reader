import { FC, useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const LoadingPage: FC = () => {
  useEffect(() => {
    const progress = NProgress.start();
    return () => {
      progress.done();
    };
  }, []);
  return <></>;
};

export default LoadingPage;
