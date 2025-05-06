import * as React from 'react';
import { ForecastPageProps } from '../../../../pages/ForecastPage/ForecastPage.type';
import { StyledItem } from '../../../../stlyes/content.style';


export default function ForecastPage(props: Readonly<ForecastPageProps>) {
  const { dayName } = props;

  return (
    <StyledItem data-testid="forecastTile">
      {dayName}
    </StyledItem>
  )
};