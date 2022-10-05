import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import FusePageThemeBaseHeader from './FusePageThemeBaseHeader';
import FusePageThemeBaseSidebar from './FusePageThemeBaseSidebar';

const Root = styled('div')(({ theme, ...props }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  minHeight: '100%',
  position: 'relative',
  flex: '1 1 auto',
  width: '100%',
  height: 'auto',
  backgroundColor: theme.palette.background.default,
  // backgroundColor: 'green',
  // backgroundImage: `url("starseedGiftTestnet2/assets/images/starseed/homeBg.jpg")`,  
  // backgroundSize: "100%",
  // backgroundSize: "cover",

  '&.FusePageThemeBase-scroll-content': {
    height: '100%',
  },

  '& .FusePageThemeBase-wrapper': {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
    zIndex: 2,
    minWidth: 0,
    height: '100%',
    backgroundColor: theme.palette.background.default,
    // backgroundImage: `url("starseedGiftTestnet2/assets/images/starseed/homeBg.jpg")`,  
    // backgroundSize: "cover",

    ...(props.scroll === 'content' && {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      overflow: 'hidden',
    }),
  },

  '& .FusePageThemeBase-header': {
    display: 'flex',
    flex: '0 0 auto',
    backgroundSize: 'cover',
  },

  '& .FusePageThemeBase-topBg': {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: headerHeight,
    pointerEvents: 'none',
  },

  '& .FusePageThemeBase-contentWrapper': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: '1 1 auto',
    overflow: 'hidden',
    //    WebkitOverflowScrolling: 'touch',
    zIndex: 9999,
  },

  '& .FusePageThemeBase-toolbar': {
    height: toolbarHeight,
    minHeight: toolbarHeight,
    display: 'flex',
    alignItems: 'center',
  },

  '& .FusePageThemeBase-content': {
    display: 'flex',
    flex: '1 1 auto',
    alignItems: 'start',
    minHeight: 0,
    overflowY: 'auto',
  },

  '& .FusePageThemeBase-sidebarWrapper': {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'absolute',
    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        position: 'relative',
        marginLeft: 0,
        marginRight: 0,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        '&.closed': {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),

          '&.FusePageThemeBase-leftSidebar': {
            marginLeft: -props.leftsidebarwidth,
          },
          '&.FusePageThemeBase-rightSidebar': {
            marginRight: -props.rightsidebarwidth,
          },
        },
      },
    },
  },

  '& .FusePageThemeBase-sidebar': {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,

    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        position: 'relative',
      },
    },
    maxWidth: '100%',
    height: '100%',
  },

  '& .FusePageThemeBase-leftSidebar': {
    width: props.leftsidebarwidth,

    [theme.breakpoints.up('lg')]: {
      borderRight: `1px solid ${theme.palette.divider}`,
      borderLeft: 0,
    },
  },

  '& .FusePageThemeBase-rightSidebar': {
    width: props.rightsidebarwidth,

    [theme.breakpoints.up('lg')]: {
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: 0,
    },
  },

  '& .FusePageThemeBase-sidebarHeader': {
    height: headerHeight,
    minHeight: headerHeight,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },

  '& .FusePageThemeBase-sidebarHeaderInnerSidebar': {
    backgroundColor: 'transparent',
    color: 'inherit',
    height: 'auto',
    minHeight: 'auto',
  },

  '& .FusePageThemeBase-sidebarContent': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },

  '& .FusePageThemeBase-backdrop': {
    position: 'absolute',
  },
}));

const headerHeight = 120;
const toolbarHeight = 64;

const FusePageThemeBase = forwardRef((props, ref) => {
  // console.info("render::FusePageThemeBase");
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const rootRef = useRef(null);

  useImperativeHandle(ref, () => ({
    rootRef,
    toggleLeftSidebar: (val) => {
      leftSidebarRef.current.toggleSidebar(val);
    },
    toggleRightSidebar: (val) => {
      rightSidebarRef.current.toggleSidebar(val);
    },
  }));

  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          ...(props.scroll !== 'page' && {
            '#fuse-toolbar': {
              position: 'static',
            },
            '#fuse-footer': {
              position: 'static',
            },
          }),
          ...(props.scroll === 'page' && {
            '#fuse-toolbar': {
              position: 'sticky',
              top: 0,
            },
            '#fuse-footer': {
              position: 'sticky',
              bottom: 0,
            },
          }),
        })}
      />
      <Root
        className={clsx(
          'FusePageThemeBase-root',
          `FusePageThemeBase-scroll-${props.scroll}`,
          props.className
        )}
        ref={rootRef}
        scroll={props.scroll}
        leftsidebarwidth={props.leftSidebarWidth}
        rightsidebarwidth={props.rightSidebarWidth}
      >
        <div className="flex flex-auto flex-col z-10 h-full">
          <div className="FusePageThemeBase-wrapper">
            {props.leftSidebarContent && (
              <FusePageThemeBaseSidebar
                position="left"
                content={props.leftSidebarContent}
                variant={props.leftSidebarVariant || 'permanent'}
                ref={leftSidebarRef}
                rootRef={rootRef}
                open={props.leftSidebarOpen}
                onClose={props.leftSidebarOnClose}
              />
            )}

            <div
              className="FusePageThemeBase-contentWrapper"
              // enable={props.scroll === 'page'}
            >
              {props.header && <FusePageThemeBaseHeader header={props.header} />}
              {props.content && (
                <FuseScrollbars
                  enable={props.scroll === 'content'}
                  className={clsx('FusePageThemeBase-content container')}
                >
                  {props.content}
                </FuseScrollbars>
              )}
            </div>

            {props.rightSidebarContent && (
              <FusePageThemeBaseSidebar
                position="right"
                content={props.rightSidebarContent}
                variant={props.rightSidebarVariant || 'permanent'}
                ref={rightSidebarRef}
                rootRef={rootRef}
                open={props.rightSidebarOpen}
                onClose={props.rightSidebarOnClose}
              />
            )}
          </div>
        </div>
      </Root>
    </>
  );
});

FusePageThemeBase.propTypes = {
  leftSidebarContent: PropTypes.node,
  leftSidebarVariant: PropTypes.node,
  rightSidebarContent: PropTypes.node,
  rightSidebarVariant: PropTypes.node,
  header: PropTypes.node,
  content: PropTypes.node,
  scroll: PropTypes.oneOf(['normal', 'page', 'content']),
  leftSidebarOpen: PropTypes.bool,
  rightSidebarOpen: PropTypes.bool,
  leftSidebarWidth: PropTypes.number,
  rightSidebarWidth: PropTypes.number,
  rightSidebarOnClose: PropTypes.func,
  leftSidebarOnClose: PropTypes.func,
};

FusePageThemeBase.defaultProps = {
  classes: {},
  scroll: 'page',
  leftSidebarOpen: false,
  rightSidebarOpen: false,
  rightSidebarWidth: 240,
  leftSidebarWidth: 240,
};

export default memo(styled(FusePageThemeBase)``);
