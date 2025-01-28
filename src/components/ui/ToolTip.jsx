import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function ToolTip({ children, TitleToolTip, onClick }) {
  return (
    <Tooltip title={TitleToolTip}>
      <IconButton component="div" onClick={onClick}>
        {children}
      </IconButton>
    </Tooltip>
  );
}