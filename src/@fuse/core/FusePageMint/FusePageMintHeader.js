import clsx from 'clsx';

function FusePageMintHeader(props) {
  return (
    <div className={clsx('FusePageMint-header', props.className)}>
      <div className="container">{props.header && props.header}</div>
    </div>
  );
}

export default FusePageMintHeader;
