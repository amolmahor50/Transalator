import React from 'react';
import clsx from 'clsx'; // or import from 'shadcn' if you prefer it.

const Container = ({ children, className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl', // Base classes for the container
        className // Additional user-defined classes
      )}
      {...props} // Pass other props (like style, id, etc.)
    >
      {children}
    </div>
  );
};

export default Container;
