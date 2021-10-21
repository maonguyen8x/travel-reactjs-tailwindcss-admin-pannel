import styled from 'styled-components';

export const WrapSuggestionStyle = styled.div`
  background-color: white;
  position: relative;
  .form-control {
    padding-left: calc(1.5em + 1.3rem + 2px);
    border-radius: 2px;
  }
  span {
    position: absolute;
    top: 50%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: calc(1.5em + 1.3rem + 2px);
    i {
      line-height: 0;
      color: #7e8299;
    }
  }
`;
export const SuggestionStyle = styled.div`
  padding-top: 15px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

export const RequiredStyled = styled.span`
  color: red;
  font-size: 80%;
`;

export const BoxMapSearch = styled.div`
  .col {
    padding-right: 0;
    padding-left: 0;
  }
`;
