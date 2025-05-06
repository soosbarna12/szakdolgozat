import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { PrecipitationDataChart } from './PrecipitationDataChart';

// eslint-disable-next-line @typescript-eslint/no-require-imports
global.ResizeObserver = require("resize-observer-polyfill");

jest.mock("recharts", () => ({
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="precipitationChartContainer">{children}</div>
    ),
    AreaChart: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="precipitationChart">{children}</div>
    ),
    CartesianGrid: () => <div data-testid="mockCartesianGrid" />,
    XAxis: () => <div data-testid="mockXAxis" />,
    YAxis: () => <div data-testid="mockYAxis" />,
    Tooltip: () => <div data-testid="mockTooltip" />,
    Legend: () => <div data-testid="mockLegend" />,
    Area: () => <div data-testid="mockArea">Mock Area</div>,
}));

describe('DataGrids/PrecipitationDataChart', () => {
    const mockData = [
        { date: '2023-01-01', precipitation: 10 },
        { date: '2023-01-02', precipitation: 15 },
    ];

    beforeAll(() => {
        global.ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    });

    const renderComponent = (data = mockData) => {
        return renderWithQueryClient(<PrecipitationDataChart data={data as any} />);
    };

    it('matches PrecipitationDataChart component snapshot', () => {
        const component = renderComponent();
        expect(component).toMatchSnapshot();
    });

    it('renders skeleton when data is empty', () => {
        renderComponent([]);
        const skeleton = screen.getByTestId('precipitationChartSkeleton');
        expect(skeleton).toBeInTheDocument();
    });
});