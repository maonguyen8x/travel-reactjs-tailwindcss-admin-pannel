import styled from 'styled-components';
import { COLORS, FONT_WEIGHT } from 'app/constants';

export const WrapStyled = styled.div`
  width: 100%;
  color: #76b0d4;
  overflow: hidden;

  ul {
    padding-inline-start: 2px;
    .active {
      color: white;
    }
    li {
      cursor: pointer;
    }
  }
  &:focus {
    color: #76b0d4;
    text-decoration: none;
    background-color: #19445f;
  }
  &:hover {
    color: white;
    text-decoration: none;
    background-color: #19445f;
  }
`;

export const BoxToggle = styled.div`
  padding: 5px 20px;
`;

export const BoxDropdown = styled.div`
  .custom-dropdown-toggle {
    /* background: ${COLORS.BACKGROUND_VIEW};
    color: white;
    border: none;
    border-radius: 2px;
    display: inline-block;
    font-weight: 400;
    color: white;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    user-select: none;
    font-size: 1rem;
    line-height: 1.5;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 2.5rem;
    width: 100%;
    &:focus {
      color: white;
      background-color: ${COLORS.CARD_ACTIVE};
      border-color: none;
      color: ${COLORS.YELLOW};
      box-shadow: none !important;
    }
    &:active {
      color: white;
      background-color: ${COLORS.CARD_ACTIVE};
      border-color: none;
    }
    &:after {
      margin-left: 1.255em;
      vertical-align: 0.2em;
    }
    &.dropdown-toggle::after {
      display: none;
    } */
  }

  .menu {
    ::-webkit-scrollbar {
      width: 4px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #19445f;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #59778b;
      border-radius: 20px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #59778b;
    }
    overflow: hidden scroll;
    max-height: 75vh;
    background: #19445f;
    &.dropdown-menu {
      right: 0px !important;
      z-index: 90;
    }
  }
  .dropdown-item {
    &:focus {
      color: #76b0d4;
      text-decoration: none;
      background-color: #19445f;
    }
    &:hover {
      color: white;
      text-decoration: none;
      background-color: #19445f;
    }
  }
`;
