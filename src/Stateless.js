import React from 'react';

export const Stateless = props =>  (
  <div>
    {props.numbers.map(v => <p key={v}>{v}</p>)}
  </div>
);

export const StatelessWithMemo = React.memo(Stateless);
export const StatelessWithEqual = React.memo(Stateless, () => false);