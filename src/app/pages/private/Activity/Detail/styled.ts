import { BoxShadownCard, DeContent } from 'app/components/layout/styled';
import styled from 'styled-components';

export const MapStyle = styled.div`
  margin-top: 31px;
`;

export const BoxDetailActivity = styled(BoxShadownCard)`
  padding: 15px 0;
  margin-bottom: 20px;
  .icon {
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 0;
    right: 15px;
    left: 15px;
    display: flex;
    justify-content: flex-end;
    border-radius: 4px;
    i {
      color: white;
      padding: 0 5px;
      font-size: 12px;
      span {
        padding: 3px;
        color: #fff;
        font-size: 12px;
      }
    }
  }
`;

export const ImagesActivity = styled.img`
  max-width: 100%;
`;

export const BoxInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Hr = styled.div`
  border: 1px solid rgba(136, 136, 136, 0.1);
  margin: 5px 0 20px;
`;

export const Title = styled(DeContent)`
  margin-right: 20px;
  i {
    margin-right: 10px;
  }
`;

export const Content: any = styled(DeContent)`
  margin-bottom: 25px;
  text-align: center;
  &.link {
    font-style: italic;
    text-decoration: underline;
    color: #1e9ae9;
    cursor: pointer;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ButtonMap = styled.span`
  background: #1e9ae9;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #4baeed;
  }
  text-align: center;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-position: center;
`;

export const Icon = styled.i`
  font-size: 20px;
  color: #1e9ae9;
`;

export const BoxCheckin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

export const CheckinContent = styled(DeContent)`
  margin-left: 10px;
`;

export const MarkerActivityContent = styled.div`
  font-size: 14px;
  text-align: justify;
  line-height: 16px;
  color: #535353;
  margin-left: 10px;
`;

export const BoxUser = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BoxSubUser = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const BoxRankingActivity = styled.div``;

export const RankingActivityContent = styled(DeContent)`
  font-style: italic;
`;

export const ActivityImage = styled.img`
  width: 100%;
  background-position: center;
  border-radius: 3px;
`;

export const BoxNodata = styled.div`
  text-align: center;
`;

export const ImageNoData = styled.img`
  width: 284.66px;
  height: 187.79px;
  margin: 200px 0;
`;

export const BoxSocial = styled.div`
  display: flex;
  flex-direction: column;
  i {
    margin-right: 5px;
  }
`;

export const BoxContainerActivity = styled(BoxShadownCard)`
  height: 100%;
  .col {
    margin-left: -15px;
    margin-right: -15px;
  }
`;

export const BoxContainerActivityImage = styled(BoxShadownCard)`
  .box-image {
    margin: 11px;
    .image {
      padding-left: 4px;
      padding-right: 4px;
      cursor: pointer;
    }
  }
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

export const BoxActivity = styled.div`
  padding: 10px 0;
  border-style: none none solid none;
  border-color: rgba(136, 136, 136, 0.1);
  border-width: thin;
`;
