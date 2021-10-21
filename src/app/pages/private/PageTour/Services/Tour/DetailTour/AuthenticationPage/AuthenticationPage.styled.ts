import { BoxShadownCard, DeContent } from 'app/components/layout/styled';
import { COLORS, FONT_WEIGHT } from 'app/constants';
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

export const Title = styled(DeContent)`
  color: ${COLORS.TEXT_DEFAULT};
`;

export const BoxField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const FieldTitle = styled(DeContent)`
  font-weight: ${FONT_WEIGHT.BOLD};
  width: 200px;
`;

export const FieldContent = styled(DeContent)`
  font-weight: ${FONT_WEIGHT.NORMAL};
`;

export const PaddingTop = styled.div`
  margin-top: 50px;
`;

export const ImageAuthenPage = styled.img`
  width: 100%;
  cursor: pointer;
`;

export const ButtonConfirm = styled.span`
  padding: 8px 20px;
  background: ${COLORS.GREEN};
  border-radius: 3px;
  color: #fff;
  font-weight: 500;
  margin: 0 10px 0 -2px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const ButtonCancel = styled(ButtonConfirm)`
  background: ${COLORS.TIME_DEFAULT};
  &:hover {
    opacity: 0.8;
  }
`;

export const BoxImage = styled.div`
  .rectangle {
    padding-top: 70%;
  }
`;
