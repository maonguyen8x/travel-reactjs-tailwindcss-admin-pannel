import styled from 'styled-components';

const LableStyle = styled.label({
  fontSize: '1.5rem',
  fontWeight: 600,
});

const WrapStyled: any = styled.div`
  .step {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background-color: white;
    .title {
      position: relative;
      top: -25px;
      left: 45px;
    }
    .sub-title {
      position: relative;
      top: -25px;
      left: 45px;
      color: #28aef2;
      font-size: 15px;
      font-weight: 400;
    }
    &:last-child {
      .line {
        border-left: 3px solid white;
        z-index: -1;
      }
    }
  }

  .v-stepper {
    position: relative;
    height: 70px;
  }
`;

const CircleStyle: any = styled.div`
  ${(props: any) => {
    if (props.blue) {
      return `
        background-color: #66CBFF;
        box-shadow: 0 0 0 1px #66CBFF;
    `;
    }
    if (props.green) {
      return `
      background-color: #00905C;
      box-shadow: 0 0 0 1px #00905C;
    `;
    }
    if (props.yellow) {
      return `
      background-color: #FAA500;
      box-shadow: 0 0 0 1px #FAA500;
    `;
    }
    return 'background-color: #FC6565; box-shadow: 0 0 0 1px #FC6565;';
  }}
  border: 2px solid #fff;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  display: inline-block;
`;

const LineVerticalStyled = styled.div`
  top: 21px;
  left: 9px;
  height: 100%;
  position: absolute;
  border-left: 2px solid #c3ddea;
`;

const LineHorizontal: any = styled.div`
  top: 9px;
  left: 24px;
  height: 2px;
  position: absolute;
  ${(props: any) => {
    if (props.blue) {
      return `
      border-left: 11px solid #66CBFF;
    `;
    }
    if (props.green) {
      return `
      border-left: 11px solid #00905C;
    `;
    }
    if (props.yellow) {
      return `
      border-left: 11px solid #FAA500;
    `;
    }
    return 'border-left: 11px solid #FC6565;';
  }}
`;

const IconCheckStyled = styled.div`
  position: absolute;
  right: 0px;
  font-size: 16px;
  color: #28aef2;
  cursor: pointer;
`;

const ContentStyled = styled.div`
  padding: 10px;
  background: #fcfcfc;
  border-radius: 10px;
  cursor: pointer;
`;

const WrapList = styled.div`
  span {
    cursor: pointer;
  }
`;

export {
  LableStyle,
  WrapStyled,
  CircleStyle,
  LineVerticalStyled,
  LineHorizontal,
  IconCheckStyled,
  ContentStyled,
  WrapList,
};
