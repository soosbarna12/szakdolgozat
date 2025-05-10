import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { HistoricalContext } from '../../../contexts/HistoricalContext/HistoricalContext';
import { TemperatureScale } from '../../../types/temperatureScale.type';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { DataChart } from './DataChart';

// eslint-disable-next-line @typescript-eslint/no-require-imports
global.ResizeObserver = require("resize-observer-polyfill");

jest.mock('../../../utils/axiosConfig');

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="dataChartContainer">
        {children}
      </div>
    ),
  };
});

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mockMapContainer">{children}</div>
  ),
  TileLayer: () => <div data-testid="mockTileLayer" />,
  Marker: () => <div data-testid="mockMarker" />,
  Popup: () => <div data-testid="mockPopup" />,
}));

describe('DataGrids/DataChart', () => {
  const mockData = [
    { date: '2023-01-01', maxTemp: 10, minTemp: 5 },
    { date: '2023-01-02', maxTemp: 15, minTemp: 8 },
  ];

  beforeAll(() => {
    global.ResizeObserver = class {
      observe() { }
      unobserve() { }
      disconnect() { }
    };
  });

  const renderComponent = (data = mockData, temperatureScale = TemperatureScale.Celsius) => {
    return renderWithQueryClient(
      <HistoricalContext.Provider value={{ temperatureScale } as any}>
        <DataChart data={data as any} />
      </HistoricalContext.Provider>
    );
  };

  it('matches DataChart component snapshot', () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders skeleton when data is empty', () => {
    renderComponent([]);
    const skeleton = screen.getByTestId('dataChartSkeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders chart with data', () => {
    renderComponent();
    const chartContainer = screen.getByTestId('dataChartContainer');

    expect(chartContainer).toBeInTheDocument();
  });
});