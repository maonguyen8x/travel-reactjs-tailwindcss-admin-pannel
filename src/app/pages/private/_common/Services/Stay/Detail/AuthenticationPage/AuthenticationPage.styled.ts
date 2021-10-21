import {
  BoxShadownCard,
  DeContent,
  DeSubTitle,
  DeTitle,
} from 'app/components/layout/styled';
import styled from 'styled-components';

export const BoxAuthPageTour = styled(BoxShadownCard)`
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

export const BoxTitle = styled.div`
  padding: 15px;
  border-style: none none solid none;
  border-color: rgba(136, 136, 136, 0.1);
  border-width: thin;
`;

export const Title = styled(DeSubTitle)``;

export const BoxField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

export const FieldTitle = styled(DeContent)`
  font-weight: 600;
  width: 200px;
`;

export const FieldContent = styled(DeContent)`
  font-weight: 300;
`;

export const PaddingTop = styled.div`
  margin-top: 50px;
`;

export const ImageAuthenPage = styled.img`
  width: 100%;
  cursor: pointer;
`;

export const ButtonConfirm = styled.span`
  padding: 10px 20px;
  background: #269c40;
  border-radius: 20px;
  color: #fff;
  font-weight: 500;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background: #4fd66d;
  }
`;

export const ButtonCancel = styled(ButtonConfirm)`
  background: #ff5348;
  &:hover {
    background: #fa685f;
  }
`;
