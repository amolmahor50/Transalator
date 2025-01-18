import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx'; // Import clsx for conditional class management

export default function ToolTip({ children, TitleToolTip, size, className = '', ...props }) {
  return (
    <Tooltip title={TitleToolTip}>
      <IconButton size={size} className={clsx('default-classes', className)} {...props}>
        {children}
      </IconButton>
    </Tooltip>
  );
}
