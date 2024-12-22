import { forwardRef } from 'react';

export const SystemIcon = forwardRef((props, ref) => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 24 24' ref={ref} {...props}>
      <path
        fill='currentColor'
        d='M1 1h22v17H1zm2 2v13h18V3zm7.406 3.844L8.28 9.5l2.125 2.656l-1.562 1.25L5.719 9.5l3.125-3.906zm4.75-1.25L18.281 9.5l-3.125 3.906l-1.562-1.25L15.72 9.5l-2.125-2.656zM3.222 21h17.556v2H3.222z'
      ></path>
    </svg>
  );
});

SystemIcon.displayName = 'SystemIcon';
