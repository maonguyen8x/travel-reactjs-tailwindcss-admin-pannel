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
  justify-content: center;
`;

export { UsernameStyled, AvatarStyled, UserAvatar };
