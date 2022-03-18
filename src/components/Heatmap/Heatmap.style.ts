import { rgba } from 'polished';
import styled from 'styled-components';

export const HeatmapContainer = styled.div`
  margin: 0 auto;
  width: max-content;
`;

export const HeatmapGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const HeatmapRow = styled.div`
  display: flex;

  @media (min-width: 1024px) {
    flex-direction: column;
  }
`;

export const HeatmapCell = styled.div<{ colour?: string; empty?: boolean }>`
  width: 24px;
  height: 24px;
  margin: 6px 6px 0 0;
  position: relative;
  ${(props) => !props.empty && 'background-color: #ddd;'}
  border-radius: 2px;
  cursor: pointer;
  transition: 150ms ease;

  @media (min-width: 1024px) {
    width: 12px;
    height: 12px;
    margin: 4px 4px 0 0;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 5px ${rgba('#000', 0.1)};
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
    background-color: ${(props) => props.colour || 'transparent'};
    border-radius: 2px;
  }
`;

export const HeatmapText = styled.p`
  width: 24px;
  height: 24px;
  margin: 6px 6px 0 0;
  text-align: center;
  font-weight: bold;

  @media (min-width: 1024px) {
    margin: 4px 1ch 0 0;
    font-size: 12px;
    line-height: 12px;
    width: 12px;
    height: 12px;
  }
`;

export const HeatmapControls = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 30px;
  background-color: #fff;
  box-shadow: 0 5px 15px ${rgba('#000', 0.1)};

  @media (min-width: 1024px) {
    position: static;
    padding: 0;
    box-shadow: none;
  }
`;
