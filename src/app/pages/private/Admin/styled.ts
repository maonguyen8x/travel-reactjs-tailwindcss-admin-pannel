import { BoxShadownCard } from 'app/components/layout/styled';
import styled from 'styled-components';

export const BoxTable = styled(BoxShadownCard)`
  i {
    padding: 0 10px;
  }
  tr {
    margin: 10px 0;
  }
  th {
    text-align: center;
    color: #19445f;
    &:first-child {
      text-align: left;
    }
  }
  td {
    text-align: center;
  }
  .category {
    color: #e5e5e5;
  }
`;

export const CircelView: any = styled.span`
  height: 20px;
  width: 20px;
  background-color: ${(props: any) => (props?.active ? '#269C40' : '#E5E5E5')};
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
`;

export const BoxTitle = styled.div`
  padding: 10px;
  color: #1e9ae9;
  cursor: pointer;
  span {
    color: #1e9ae9;
  }
`;
