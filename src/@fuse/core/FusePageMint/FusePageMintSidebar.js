import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import FusePageMintSidebarContent from './FusePageMintSidebarContent';

const FusePageMintSidebar = forwardRef((props, ref) => {
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
            root: clsx('FusePageMint-sidebarWrapper', variant),
            paper: clsx(
              'FusePageMint-sidebar',
              variant,
              position === 'left' ? 'FusePageMint-leftSidebar' : 'FusePageMint-rightSidebar'
            ),
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          // container={rootRef.current}
          BackdropProps={{
            classes: {
              root: 'FusePageMint-backdrop',
            },
          }}
          style={{ position: 'absolute' }}
        >
          <FusePageMintSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>

      {variant === 'permanent' && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={clsx(
              'FusePageMint-sidebarWrapper',
              variant,
              isOpen ? 'opened' : 'closed',
              position === 'left' ? 'FusePageMint-leftSidebar' : 'FusePageMint-rightSidebar'
            )}
            open={isOpen}
            onClose={props?.onClose}
            classes={{
              paper: clsx('FusePageMint-sidebar border-0', variant),
            }}
          >
            <FusePageMintSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});

FusePageMintSidebar.defaultProps = {
  open: true,
};

export default FusePageMintSidebar;
