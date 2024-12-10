import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function ToolTip({children, TitleToolTip}) {
  return (
    <Tooltip title={TitleToolTip}>
      <IconButton>
        {children}
      </IconButton>
    </Tooltip>
  );
}