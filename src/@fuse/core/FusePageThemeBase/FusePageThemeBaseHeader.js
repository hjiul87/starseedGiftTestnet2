import clsx from 'clsx';

function FusePageThemeBaseHeader(props) {
  return (
    <div className={clsx('FusePageThemeBase-header', props.className)}>
      <div className="container">{props.header && props.header}</div>
    </div>
  );
}

export default FusePageThemeBaseHeader;
