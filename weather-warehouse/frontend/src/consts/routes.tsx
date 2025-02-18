import React from 'react';
import { ForecastPage } from '../pages/ForecastPage/ForecastPage';
import { HistoricalPage } from '../pages/HistoricalPage/HistoricalPage';
import { TodayPage } from '../pages/TodayPage/TodayPage';
import { Pages } from '../types/page.type';

export const ROUTES = [
	{
		text: 'Historical',
		path: '/historical',
		id: Pages.Historical,
		element: <HistoricalPage />
	},
	{
		text: 'Today',
		path: '/today',
		id: Pages.Today,
		element: <TodayPage />
	},
	{
		text: 'Forecast',
		path: '/forecast',
		id: Pages.Forecast,
		element: <ForecastPage />
	}
];
