import styled from 'styled-components';
import {
  UserAvatar,
  AvatarStyled,
  DeContent,
  ScrollView,
} from 'app/components/layout/styled';
import { COLORS, FONT_WEIGHT } from 'app/constants';

export const BoxImage = styled(UserAvatar)`
  margin-top: -8px;
  margin-bottom: -20px;
`;

export const ImagesStyled = styled(AvatarStyled)`
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

export const BoxCheckPoint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const SosTitle: any = styled(DeContent)`
  font-weight: ${FONT_WEIGHT.N_BOLD};
  color: ${({ color }: any) => color};
  ${(props: any) => props?.point && 'cursor: pointer;'}
`;

export const SosContent: any = styled(DeContent)`
  font-weight: ${(props: any) => props?.bold && FONT_WEIGHT.N_BOLD};
  color: ${({ color }: any) => color};
  ${(props: any) =>
    props?.time &&
    `
    font-size: 12px;
    color: ${COLORS.ORANGE};
  `};
`;

export const IConMarker = styled.i.attrs(() => ({
  className: 'fas fa-map-marker-alt',
}))`
  color: ${COLORS.BLUE};
  margin-right: 5px;
`;

export const IConTime = styled.i.attrs(() => ({
  className: 'far fa-clock',
}))`
  color: ${COLORS.RESET};
  margin-right: 2px;
`;

export const IConNote = styled.i.attrs(() => ({
  className: 'fas fa-edit',
}))`
  color: ${COLORS.CARD_ACTIVE};
  margin-left: 5px;
`;

export const BoxMessage = styled.div`
  margin-top: 10px;
  background: rgba(229, 229, 229, 0.2);
  border: 1px solid ${COLORS.BORDER};
  border-width: thin;
  width: 100%;
  height: 350px;
`;

export const HeaderMessage = styled.div`
  padding: 8px;
  color: ${COLORS.WHITE};
  background: ${COLORS.BACKGROUND_VIEW};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const IConMore = styled.i.attrs(() => ({
  className: 'fas fa-ellipsis-h',
}))`
  position: relative;
  color: ${COLORS.WHITE};
  padding: 0 10px;
`;

export const BoxChatting: any = styled(ScrollView)`
  height: ${({ height = '230px' }: any) => height};
  padding: 5px 0;
  margin-left: -6px;
  background: transparent;
  overflow-x: hidden;
`;

export const BoxInput: any = styled.div`
  position: relative;
  background: ${COLORS.WHITE};
  ${(props: any) =>
    !props?.margin &&
    `
  border: 1px solid ${COLORS.BORDER};
  `};
  margin: ${({ margin = '5px' }: any) => margin};
  padding: 5px;
  height: 75px;
  .col {
    padding-left: 0;
    padding-right: 0;
  }
  input {
    background: ${COLORS.TEXTAREA};
    height: 100%;
    outline: 0;
    box-shadow: none;
    border: none;
    &:focus {
      color: #495057;
      background-color: ${COLORS.TEXTAREA};
      border-color: ${COLORS.TEXTAREA};
      outline: 0;
      box-shadow: none;
    }
  }
`;

export const BoxAvatar = styled(AvatarStyled)`
  border: 2px solid rgba(146, 218, 255, 0.23);
  width: 40px !important;
  height: 40px !important;
`;

export const BoxSend: any = styled.div`
  position: absolute;
  right: ${({ margin = '0' }: any) => margin};
  left: ${({ margin = '0' }: any) => margin};
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const IConEmoji = styled.i.attrs(() => ({
  className: 'far fa-smile',
}))`
  color: ${COLORS.RESET};
`;

export const IConPaperclip = styled.i.attrs(() => ({
  className: 'fas fa-paperclip',
}))`
  color: ${COLORS.RESET};
  margin-left: 8px;
  rotate: 10px;
  transform: rotate(45deg);
`;

export const IConSend = styled.i.attrs(() => ({
  className: 'fas fa-location-arrow',
}))`
  color: ${COLORS.BLUE};
  transform: rotate(45deg);
  font-size: 14px;
  margin: 0 5px;
`;

export const BoxUsers = styled.div`
  display: flex;
  align-items: center;
  .name {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }
`;

export const BoxDropDown = styled.div`
  position: absolute;
  top: 90%;
  right: 0;
  left: 70%;
  background: ${COLORS.WHITE};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    width: 100%;
    padding: 10px;
    &:first-child {
      border-bottom: 1px solid ${COLORS.BORDER_DEFAULT};
    }
  }
`;

export const BoxInformationPageUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
`;

export const TitleInfor = styled(DeContent)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-weight: 600;
`;

export const ContentInfor = styled(DeContent)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const AvatarCircleStyled = styled.img`
  margin-top: 20px;
  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
  border-radius: 50%;
`;

export const BoxName = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 5px;
  color: #0a5565;
  font-size: 14px;
  .key {
    word-break: break-word;
    font-weight: ${FONT_WEIGHT.BOLD};
    margin-left: 10px;
  }
  .value {
    word-break: break-word;
    margin-left: 50px;
  }
`;
