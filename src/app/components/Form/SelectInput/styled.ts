import styled from 'styled-components';

export const BoxDropdown = styled.div`
  .custom-dropdown-toggle {
    background: #3cb2ef;
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
      background-color: #3cb2ef;
      border-color: none;
    }
    &:active {
      color: white;
      background-color: #3cb2ef;
      border-color: none;
    }
    &:after {
      margin-left: 1.255em;
      vertical-align: 0.2em;
    }
  }

  .menu {
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
