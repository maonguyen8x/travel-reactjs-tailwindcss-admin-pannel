import styled from 'styled-components';

const UsernameStyled = styled.div`
  text-overflow: ellipsis;
  padding: 7px 5px;
  overflow: hidden;
  transition: 0.3s ease;
  transition-property: width, min-width, padding, opacity;
`;

const AvatarStyled = styled.img`
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserAvatar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ButtonSearchStyled = styled.span`
  &:hover {
    background-color: #d9ecff;
    color: #2b94ff;
  }
  margin: 0;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  border-radius: 6px;
  color: #3699ff;
  background-color: #e1f0ff;
  cursor: pointer;
  padding: 10px 20px;
  height: 39px;
`;

const PopoverStyle = styled.div`
  &:hover {
    color: #0099ff;
  }
`;

export {
  UsernameStyled,
  AvatarStyled,
  UserAvatar,
  ButtonSearchStyled,
  PopoverStyle,
};
