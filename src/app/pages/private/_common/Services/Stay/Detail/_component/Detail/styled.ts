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

const LableStyle = styled.label({
  fontSize: '1.5rem',
  fontWeight: 600,
});

const WrapGotoPage = styled.div({
  ':hover': {
    color: 'deepskyblue',
    cursor: 'pointer',
  },
  position: 'absolute',
  right: 0,
  padding: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  i: {
    fontSize: 'x-large',
    paddingLeft: 10,
    color: 'deepskyblue',
  },
});

export { UsernameStyled, AvatarStyled, UserAvatar, LableStyle, WrapGotoPage };
