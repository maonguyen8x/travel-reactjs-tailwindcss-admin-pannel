import { DeContent, DeTitle } from 'app/components/layout/styled';
import { COLORS, FONT_WEIGHT } from 'app/constants';
import styled from 'styled-components';

export const TitleName = styled(DeTitle)`
  display: flex;
  justify-content: center;
`;

export const BoxTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  i {
    color: #888888;
  }
`;

export const CustomScroll = styled.div`
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #efefef;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888888;
    border-radius: 20px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888888;
  }
`;

export const AvatarStyled = styled.img`
  margin-top: 10px;
  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
  object-fit: cover;
  border-radius: 50%;
`;

export const BoxInformationPage = styled.div`
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
  i {
    position: absolute;
    left: 140px;
    background: ${COLORS.GREEN};
    margin: 0 10px;
    padding: 7px;
    color: ${COLORS.WHITE};
    border-radius: 50%;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ContentInfor: any = styled(DeContent)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${({ active }: any) => active && COLORS.BLUE};
  font-weight: ${({ active }: any) => active && FONT_WEIGHT.BOLD};
  cursor: ${({ active }: any) => active && 'pointer'};
`;

export const BoxName = styled.div`
  padding-top: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 14px;
  .key {
    color: ${COLORS.GRAY};
    word-break: break-word;
    margin-left: 15px;
  }
  .value {
    word-break: break-word;
    margin-left: 50px;
    color: ${COLORS.TEXT_DEFAULT};
  }
`;

export const BoxImage = styled(CustomScroll)`
  background: rgba(239, 239, 239, 0.95);
  height: 100%;
  max-height: 350px;
  padding: 6px;
  overflow: hidden scroll;
  .box-image {
    padding-left: 2px;
    padding-right: 2px;
    cursor: pointer;
  }
`;

export const ScrollView: any = styled(CustomScroll)`
  ::-webkit-scrollbar-track {
    background: ${({ color = 'white' }) => color};
  }
  overflow: hidden scroll;
  max-height: 300px;
`;

export const ServiceImageStyled = styled(AvatarStyled)`
  width: 65px;
  height: 65px;
  border-radius: 4px;
`;

export const BoxServicesImageStyled = styled.div`
  .rows {
    margin-top: -10px;
  }
  .col {
    padding-left: 0;
    padding-right: 0;
    padding: 3px;
  }
  .rectangle {
    padding-top: 60%;
  }
  label {
    color: ${COLORS.TEXT_DEFAULT};
    font-weight: ${FONT_WEIGHT.BOLD};
  }
  .total {
    float: right;
    font-size: 14px;
    color: ${COLORS.TEXT_DEFAULT};
    font-weight: ${FONT_WEIGHT.BOLD};
  }
`;

export const BoxService = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  i {
    margin-right: 4px;
  }
  .icon {
    margin-right: 20px;
    color: ${COLORS.GRAY};
  }
`;

export const BoxICon = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ServiceTitleStyled = styled(DeContent)`
  font-weight: ${({ bold = FONT_WEIGHT.BOLD }) => bold} !important;
  color: ${({ color = COLORS.GRAY }) => color} !important;
  padding-left: ${(props: any) => props?.bold && '10px'} !important;
`;
