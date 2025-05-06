import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { HistoricalContext } from '../contexts/HistoricalContext/HistoricalContext';
import { useHistoricalTableData } from './useHistoricalTableData';

describe('useHistoricalTableData', () => {
  const mockSetHistoricalPageData = jest.fn();
  const mockHistoricalPageData = [
    { date: '2023-01-01', cityName: 'New York', countryCode: 'US' },
    { date: '2023-01-02', cityName: 'Los Angeles', countryCode: 'US' },
  ];

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <HistoricalContext.Provider value={{
      historicalPageData: mockHistoricalPageData,
      setHistoricalPageData: mockSetHistoricalPageData,
    } as any}
    >
      {children}
    </HistoricalContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches useHistoricalTableData hook snapshot', () => {
    const { result } = renderHook(() =>
      useHistoricalTableData({ data: null } as any),
      { wrapper }
    );

    expect(result.current).toMatchSnapshot();
  });

  it('adds a new record to historicalPageData if it is not a duplicate', () => {
    const newRecord = {
      date: '2023-01-03',
      cityName: 'Chicago',
      countryCode: 'US',
    };

    renderHook(() => useHistoricalTableData({ data: newRecord } as any), { wrapper });

    expect(mockSetHistoricalPageData.mock.calls[0][0](mockHistoricalPageData)).toEqual([
      ...mockHistoricalPageData,
      newRecord,
    ]);
  });

  it('does not add a duplicate record to historicalPageData', () => {
    const duplicateRecord = {
      date: '2023-01-01',
      cityName: 'New York',
      countryCode: 'US',
    };

    renderHook(() => useHistoricalTableData({ data: duplicateRecord } as any), {
      wrapper,
    });

    act(() => {
      mockSetHistoricalPageData.mock.calls[0][0](mockHistoricalPageData);
    });

    expect(mockSetHistoricalPageData).not.toHaveBeenCalledWith([
      ...mockHistoricalPageData,
      duplicateRecord,
    ]);
  });

  it('does nothing if newRecord is null', () => {
    renderHook(() => useHistoricalTableData({ data: null } as any), { wrapper });

    expect(mockSetHistoricalPageData).not.toHaveBeenCalled();
  });
});