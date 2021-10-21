import { BoxShadownCard } from 'app/components/layout/styled';
import { COLORS, FONT_WEIGHT } from 'app/constants';
import styled from 'styled-components';

export const BoxContainer = styled(BoxShadownCard)`
  padding: 10px 0;
  box-shadow: 0px 3px 3px ${COLORS.WHITE};
  .mr {
    padding-left: 0;
  }
  .ml {
    padding-right: 0;
  }
`;

export const BoxMap = styled.div`
  .row {
    margin-right: -15px;
    margin-left: -15px;
  }
`;

export const ButtonViewMap = styled.button`
  width: 100%;
  font-size: 14px;
  padding: 9px;
  background: ${COLORS.ICON_DEFAULT};
  font-weight: ${FONT_WEIGHT.BOLD};
  color: ${COLORS.WHITE};
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:hover {
    opacity: 0.9;
  }
  border: none;
  box-shadow: none;
  border-radius: 3px;
  margin-top: 7px;
  &.block {
    cursor: no-drop;
  }
`;

export const RankingNote = styled.span`
  font-style: italic;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: ${COLORS.GRAY};
  padding: 0 5px;
`;

export const BoxRange: any = styled.div`
  margin: 18px -15px;
  .range {
    position: relative;
    span {
      position: absolute;
      top: 1px;
      left: 50%;
      color: ${(props: any) =>
        props?.value > 50 ? COLORS.WHITE : COLORS.GRAY};
      font-weight: ${FONT_WEIGHT.N_BOLD};
      font-size: 12px;
      transition: all 0.5s ease;
    }
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
      input[type='range']:focus {
        outline: none;
      }
      input[type='range'] {
        width: 100%;
        overflow: hidden;
        -webkit-appearance: none;
        background-color: #f6f6f6;
      }
      input[type='range']::-webkit-slider-runnable-track {
        height: 14px;
        -webkit-appearance: none;
      }
      input[type='range']::-webkit-slider-thumb {
        width: 14px;
        -webkit-appearance: none;
        height: 14px;
        cursor: pointer;
        background: #66cbff;
        border: 1px solid #fff;
        border-radius: 20px;
        box-shadow: -320px 0 0 316px #66cbff;
      }
    }
  }
`;

export const ErrorMessage = styled.div`
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: ${COLORS.RED};
`;
