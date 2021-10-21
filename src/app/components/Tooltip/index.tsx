import React, { memo, useState } from 'react';
import { Tooltip } from 'reactstrap';
import { IProps } from './type';

const TooltipComponent = ({
  content,
  id,
  hoverTitle,
  handlerFilter,
  style = { backgroundColor: '#19445F' },
}: IProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <div
        className="cursor-pointer truncate"
        id={`tooltip${id}`}
        onClick={handlerFilter}
      >
        {content}
      </div>
      <Tooltip
        style={style}
        placement="bottom"
        isOpen={tooltipOpen}
        target={`tooltip${id}`}
        toggle={toggle}
      >
        <div className="w-full h-full rounded-md">
          <ul className="text-white font-medium text-justify leading-relaxed text-xl p-3">
            <li>{hoverTitle}</li>
          </ul>
        </div>
      </Tooltip>
    </div>
  );
};

export default memo(TooltipComponent, (oldProps, newProps) => {
  if (
    oldProps?.content !== newProps.content ||
    oldProps?.hoverTitle !== newProps?.hoverTitle
  ) {
    return false;
  }
  return true;
});
