import { useSelector } from 'react-redux';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';

function FusePageMintSidebarContent(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    <FuseScrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div className={clsx('FusePageMint-sidebarHeader', props.variant)}>{props.header}</div>
        </ThemeProvider>
      )}

      {props.content && <div className="FusePageMint-sidebarContent">{props.content}</div>}
    </FuseScrollbars>
  );
}

export default FusePageMintSidebarContent;
