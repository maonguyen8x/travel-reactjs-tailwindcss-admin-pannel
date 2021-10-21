import { BoxShadownCard, DeContent } from 'app/components/layout/styled';
import styled from 'styled-components';

export const BoxContainer = styled(BoxShadownCard)`
  padding: 30px;
  .col {
    margin-bottom: 30px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .gender {
    display: flex;
    flex-direction: row;
    .radio {
      margin-left: 50px;
    }
    .radio:first-child {
      margin-left: 20px;
    }
  }
  select {
    margin-right: 20px;
  }
  strong {
    text-transform: uppercase;
  }
  span {
    color: #1e9ae9;
    text-decoration: underline;
    cursor: pointer;
  }
  button {
    border-radius: 50px;
    font-weight: 600;
    padding: 5px 20px;
  }
`;

export const FieldInput = styled.input`
  background: #e5e5e5;
  width: 30%;
  border: none;
  border-radius: 3px;
  padding: 5px;
`;

export const BoxAvatarProfile = styled.div`
  position: relative;
`;

export const AvatarProfile = styled.img`
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(196, 196, 196, 0) 0%,
    rgba(119, 125, 129, 0.592) 67.71%,
    rgba(0, 0, 0, 0.592) 100%
  );
`;

export const TextChangeAvatar = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  background: rgba(255, 255, 255, 0.25);
  border: 0.5px solid rgba(255, 255, 255, 0.41);
  box-sizing: border-box;
  border-radius: 5px;
  color: #fff;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;
