import {
  BoxShadownCard,
  DeContent,
  DeSubTitle,
  DeTitle,
} from 'app/components/layout/styled';
import styled from 'styled-components';

export const BackgroundStyled = styled.img`
  width: 100%;
  height: 320px;
  background-size: cover;
  object-fit: cover;
`;

export const AvatarStyled = styled.img`
  position: absolute;
  top: 50%;
  border: 1px;
  border-color: #00cff9;
  border-style: solid;
  width: 170px;
  height: 170px;
  border-radius: 50%;
`;

export const WrapAvatarStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const BoxPageTour = styled(BoxShadownCard)`
  margin-bottom: 20px;
  padding-bottom: 10px;
  height: 100%;
  i {
    cursor: pointer;
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

export const TitleName = styled(DeTitle)`
  display: flex;
  justify-content: center;
`;

export const BoxInformationPageTour = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
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

export const AuthenPage = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  background: #ff9900;
  color: #fff;
  margin-left: 5px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: #f5ac40;
  }
`;

export const BoxOwner = styled.div`
  padding: 10px 0;
  border-style: none none solid none;
  border-color: rgba(136, 136, 136, 0.1);
  border-width: thin;
`;

export const TitleOwner = styled(DeSubTitle)``;

export const AvatarOwner = styled.img`
  width: 100px;
  height: 100px;
  border: solid 5px rgba(146, 218, 255, 0.19);
  border-radius: 50%;
`;

export const BoxSocialPageTour = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PaddingTop = styled.div`
  margin-top: 50px;
`;

export const BoxTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  i {
    color: #888888;
  }
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
  width: 230px;
  span {
    cursor: pointer;
    color: #76b0d5;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      color: #fff48e;
      i {
        color: #fff48e;
      }
    }
    i {
      width: 30px;
      color: #76b0d5;
    }
  }
`;

export const BoxShowMore = styled.div`
  position: relative;
`;

export const FiedTitle = styled(DeContent)`
  font-weight: 600;
`;
