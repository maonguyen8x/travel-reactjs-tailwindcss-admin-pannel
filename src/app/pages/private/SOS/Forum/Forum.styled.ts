import styled from 'styled-components';
import { UserAvatar, AvatarStyled } from 'app/components/layout/styled';
import { COLORS } from 'app/constants';

export const BoxImage = styled(UserAvatar)`
  margin-top: -8px;
  margin-bottom: -20px;
`;

export const ImagesSelfieStyled = styled(AvatarStyled)`
  border-radius: 2px;
  margin-right: 10px;
  width: 60px;
  height: 40px;
`;

export const BoxICon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BoxIconSos: any = styled.img`
  background: ${({ color = COLORS.RED }) => color};
  padding: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
