import React, { useState } from 'react';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import { IProps } from './type';
import './popover.css';
import ChangeRoles from 'app/pages/private/User/ChangeRoles/ChangeRole.page';

const PopoverItem = (props: IProps) => {
  const { name, popoverKey, placement = 'left', changeRoles, body } = props;

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <>
      <span className="cursor-pointer" id={`PopoverFocus${popoverKey}`}>
        {name}
      </span>
      <UncontrolledPopover
        className="my-custom-popover"
        placement={placement}
        isOpen={popoverOpen}
        target={`PopoverFocus${popoverKey}`}
        toggle={toggle}
        trigger="legacy"
      >
        <PopoverBody>
          {changeRoles ? (
            <ChangeRoles id={popoverKey.toString()} toggle={toggle} />
          ) : (
            body
          )}
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
};

export default PopoverItem;
