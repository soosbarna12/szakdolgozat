import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { WindPressureCombinedChart } from './WindPressureCombinedChart';

// eslint-disable-next-line @typescript-eslint/no-require-imports
global.ResizeObserver = require("resize-observer-polyfill");

jest.mock("recharts", () => ({
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="windPressureChartContainer">{children}</div>
    ),
    ComposedChart: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="windPressureChart">{children}</div>
    ),
    CartesianGrid: () => <div data-testid="mockCartesianGrid" />,
    XAxis: () => <div data-testid="mockXAxis" />,
    YAxis: () => <div data-testid="mockYAxis" />,
    Tooltip: () => <div data-testid="mockTooltip" />,
    Legend: () => <div data-testid="mockLegend" />,
    Bar: () => <div data-testid="mockBar">Mock Bar</div>,
    Line: () => <div data-testid="mockLine">Mock Line</div>,
}));

describe('DataGrids/WindPressureCombinedChart', () => {
    const mockData = [
        { date: '2023-01-01', pressure: 1015, windSpeed: 5 },
        { date: '2023-01-02', pressure: 1020, windSpeed: 8 },
    ];

    beforeAll(() => {
        global.ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    });

    const renderComponent = (data = mockData) => {
        return renderWithQueryClient(<WindPressureCombinedChart data={data as any} />);
    };

    it('matches WindPressureCombinedChart component snapshot', () => {
        const component = renderComponent();
        expect(component).toMatchSnapshot();
    });

    it('renders skeleton when data is empty', () => {
        renderComponent([]);
        const skeleton = screen.getByTestId('windPressureSkeleton');
        expect(skeleton).toBeInTheDocument();
    });

    it('renders chart with data', () => {
        renderComponent();
        const chartContainer = screen.getByTestId('windPressureChartContainer');
        const chart = screen.getByTestId('windPressureChart');

        expect(chartContainer).toBeInTheDocument();
        expect(chart).toBeInTheDocument();
    });
});