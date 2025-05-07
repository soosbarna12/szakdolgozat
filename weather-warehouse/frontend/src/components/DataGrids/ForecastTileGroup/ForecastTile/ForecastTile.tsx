import * as React from 'react';
import { StyledItem } from '../../../../stlyes/content.style';

export default function ForecastTile({ dayName, temperature }: { dayName: string; temperature: number }) {
  return (
    <StyledItem data-testid="forecastTile">
      <p>{dayName}</p>
      <p>{temperature}°C</p>
    </StyledItem>
  );
};