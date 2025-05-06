import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithQueryClient } from '../../../utils/test/renderWithQueryClient';
import { DataTable } from './DataTable';

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dataMapContainer">{children}</div>
  ),
  TileLayer: () => <div data-testid="mockTileLayer">Mock TileLayer</div>,
}));

jest.mock('@mui/x-data-grid', () => ({
  ...jest.requireActual('@mui/x-data-grid'),
  DataGrid: ({ rows }: { rows: any[]; columns: any[] }) => (
    <div data-testid="dataTable">
      {rows.length > 0 ? (
        rows.map((row, index) => <div key={index}>{JSON.stringify(row)}</div>)
      ) : (
        <div>No rows</div>
      )}
    </div>
  ),
}));

describe('DataGrids/DataTable', () => {
  const mockData = [
    { date: '2023-01-01', cityName: 'City1', countryCode: 'US' },
    { date: '2023-01-02', cityName: 'City2', countryCode: 'CA' },
  ];

  const mockColumns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'cityName', headerName: 'City', width: 150 },
    { field: 'countryCode', headerName: 'Country', width: 150 },
  ];

  const renderComponent = (data = mockData, columns = mockColumns) => {
    return renderWithQueryClient(<DataTable data={data as any} columns={columns} />);
  };

  it('matches DataTable component snapshot', () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });

  it('renders skeleton when data is empty', () => {
    renderComponent([]);
    const skeleton = screen.getByTestId('dataTableSkeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders data table with data', () => {
    renderComponent();
    const container = screen.getByTestId('dataTableContainer');
    const dataTable = screen.getByTestId('dataTable');

    expect(container).toBeInTheDocument();
    expect(dataTable).toBeInTheDocument();
  });

  it('renders data table with custom columns', () => {
    const customColumns = [
      { field: 'date', headerName: 'Date', width: 150 },
      { field: 'cityName', headerName: 'City', width: 150 },
    ];
    renderComponent(mockData, customColumns);

    const dataTable = screen.getByTestId('dataTable');
    expect(dataTable).toBeInTheDocument();
  });
});