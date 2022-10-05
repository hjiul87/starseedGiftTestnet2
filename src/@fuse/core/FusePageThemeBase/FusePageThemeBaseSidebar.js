import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import FusePageThemeBaseSidebarContent from './FusePageThemeBaseSidebarContent';

const FusePageThemeBaseSidebar = forwardRef((props, ref) => {
  const { open, position, variant, rootRef } = props;

  const [isOpen, setIsOpen] = useState(open);

  useImperativeHandle(ref, () => ({
    toggleSidebar: handleToggleDrawer,
  }));

  const handleToggleDrawer = useCallback((val) => {
    setIsOpen(val);
  }, []);

  useEffect(() => {
    handleToggleDrawer(open);
  }, [handleToggleDrawer, open]);

  return (
    <>
      <Hidden lgUp={variant === 'permanent'}>
        <SwipeableDrawer
          variant="temporary"
          anchor={position}
          open={isOpen}
          onOpen={(ev) => {}}
          onClose={() => props?.onClose()}
          disableSwipeToOpen
          classes={{
            root: clsx('FusePageThemeBase-sidebarWrapper', variant),
            paper: clsx(
              'FusePageThemeBase-sidebar',
              variant,
              position === 'left' ? 'FusePageThemeBase-leftSidebar' : 'FusePageThemeBase-rightSidebar'
            ),
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          // container={rootRef.current}
          BackdropProps={{
            classes: {
              root: 'FusePageThemeBase-backdrop',
            },
          }}
          style={{ position: 'absolute' }}
        >
          <FusePageThemeBaseSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>

      {variant === 'permanent' && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={clsx(
              'FusePageThemeBase-sidebarWrapper',
              variant,
              isOpen ? 'opened' : 'closed',
              position === 'left' ? 'FusePageThemeBase-leftSidebar' : 'FusePageThemeBase-rightSidebar'
            )}
            open={isOpen}
            onClose={props?.onClose}
            classes={{
              paper: clsx('FusePageThemeBase-sidebar border-0', variant),
            }}
          >
            <FusePageThemeBaseSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});

FusePageThemeBaseSidebar.defaultProps = {
  open: true,
};

export default FusePageThemeBaseSidebar;
