import { COLORS } from 'app/constants';
import styled from 'styled-components';

export const BoxShrink: any = styled.div`
  position: fixed;
  background-color: ${COLORS.TEXT_DEFAULT};
  top: 50%;
  z-index: 101;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLORS.WHITE};
  box-shadow: 0px 0px 5px 3px rgba(10, 85, 101, 0.7);
  cursor: pointer;
  transition: all 0.5s ease;
  left: ${({ left = false }: { left: boolean }) => (left ? '188px' : '37px')};
`;

export const BoxItems: any = styled.ul`
  margin-block-end: 0px;
  list-style-type: none;
  padding-inline-start: 0;
  &.active {
    color: ${COLORS.WHITE};
    background: rgba(2, 65, 79, 0.6);
  }
  li {
    font-weight: 400;
    font-size: 17px;
    color: ${COLORS.TEXT_SIDEBAR};
    cursor: pointer;
    i {
      color: ${COLORS.WHITE};
    }
    .more {
      position: absolute;
      right: 0;
      color: ${COLORS.TEXT_SIDEBAR};
    }
    span {
      position: absolute;
      left: 40%;
      right: 5%;
      font-size: 16px;
      &.active {
        color: ${COLORS.WHITE};
      }
      ${({ shrink }: any) =>
        shrink
          ? `
      opacity: 1;
      transition: all 0.5s ease;
      `
          : `
      opacity: 0;
        transition: all 0.5s ease;
      `}
    }
  }
`;

export const IconLeftShrink = styled.i.attrs(() => ({
  className: 'fas fa-angle-double-left',
}))`
  color: ${COLORS.WHITE};
  font-size: 14px;
`;

export const IconRightShrink = styled.i.attrs(() => ({
  className: 'fas fa-angle-double-right',
}))`
  color: ${COLORS.WHITE};
  font-size: 14px;
`;
