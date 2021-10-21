import { COLORS, FONT_WEIGHT } from 'app/constants';
import styled from 'styled-components';

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

export const BoxLayout = styled.div`
  .row {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const DeDropdown = styled.div`
  position: relative;
  background: #19445f;
  border-radius: 3px;
  color: white;
  /* padding: 20px; */
  font-size: 12px;
  &:after,
  &:before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-bottom-color: #19445f;
    border-width: 10px;
    margin-left: -10px;
  }
`;

export const BoxShadownCard = styled.div`
  background-color: white;
  box-shadow: 0px 3px 3px #d3d8ed;
  .form-control {
    background: rgba(230, 230, 230, 0.35);
    border: 1px solid ${COLORS.BORDER};
  }
  .form-control:disabled,
  .form-control[readonly] {
    background-color: ${COLORS.DISABLED};
    cursor: no-drop;
  }
`;

export const DeTitle = styled.span`
  font-style: normal;
  font-weight: ${FONT_WEIGHT.BOLD};
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  color: ${COLORS.GRAY};
`;

export const DeSubTitle: any = styled.span`
  font-style: normal;
  font-weight: ${({ bold = 'bold' }: any) => bold};
  font-size: 18px;
  line-height: 25px;
  color: ${COLORS.GRAY};
`;

export const DeContent: any = styled.span`
  font-style: normal;
  font-weight: ${({ bold = 'normarl' }: any) => bold};
  font-size: 14px;
  text-align: justify;
  line-height: 20px;
  color: ${COLORS.GRAY};
`;

export const Hr = styled.div`
  border: 1px solid rgba(136, 136, 136, 0.1);
  margin: 5px 0 20px;
  border-width: thin;
`;

export const BoxContainer: any = styled.div`
  .card {
    border-radius: unset;
    border: ${(props: any) => props?.isCard && 'none'};
    box-shadow: ${(props: any) =>
      props?.isCard ? 'none' : '0px 0px 5px 1px rgba(199, 199, 199, 1)'};
  }
`;

export const BoxSubHeader = styled.div`
  padding: 10px 0;
  border-style: none none solid none;
  border-color: rgba(136, 136, 136, 0.1);
  border-width: thin;
`;

export const BoxSubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  i {
    color: #888888;
  }
`;

export const BoxSubShowMore = styled.div`
  position: relative;
`;

export const BoxDropDown = styled.div`
  padding: 20px;
  background: #19445f;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  width: 100%;
  span {
    cursor: pointer;
    color: #76b0d5;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      color: #fff;
      i {
        color: #fff;
      }
    }
    i {
      width: 30px;
      color: #76b0d5;
    }
  }
`;
export const BoxBackground = styled.div`
  position: relative;
  margin-bottom: 60px;
`;

export const BoxAvatar = styled.div`
  position: absolute;
  position: absolute;
  left: 43%;
  bottom: -20%;
`;

export const Background = styled.img`
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
  object-fit: cover;
  height: 200px;
  border-radius: 2px 2px 0px 0px;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-background-size: cover;
  background-size: cover;
  border-radius: 50%;
  border: solid 4px rgba(146, 218, 255, 0.19);
`;

export const BoxButton: any = styled.button`
  padding: 8px 25px;
  border-radius: 20px;
  background: ${({ background = '#000' }: any) => background};
  color: #fff;
  font-weight: 600;
  border: none;
  &:hover {
    opacity: 0.9;
  }
`;

export const UsernameStyled = styled.div`
  text-overflow: ellipsis;
  padding: 7px 5px;
  overflow: hidden;
  transition: 0.3s ease;
  transition-property: width, min-width, padding, opacity;
`;

export const AvatarStyled = styled.img`
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  object-fit: cover;
`;

export const UserAvatar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ScrollView = styled(CustomScroll)`
  overflow: hidden scroll;
  max-height: 500px;
`;

export const PostImagesStyled = styled(AvatarStyled)`
  border-radius: 2px;
  margin-right: 10px;
  width: 50px;
  height: 40px;
  background-size: cover;
  object-fit: cover;
`;

export const BoxNameStyled = styled.div`
  color: ${COLORS.BLUE};
`;

export const IConCheck = styled.i.attrs(() => ({
  className: 'fas fa-check',
}))`
  color: ${COLORS.GREEN};
  font-size: 14px;
`;
