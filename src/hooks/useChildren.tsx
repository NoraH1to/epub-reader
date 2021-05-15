import { FC } from 'react';
import { UseChildren } from 'types/typings';

const useChildren: UseChildren = ({ Children, Compnent }): FC<any> => ({
  children,
  ...restProps
}) => (
  <Compnent {...restProps}>
    {typeof Children === 'function' ? <Children /> : Children}
  </Compnent>
);

export default useChildren;
