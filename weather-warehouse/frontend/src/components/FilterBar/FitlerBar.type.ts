import { Pages } from '../../types/page.type';

export interface FilterBarProps {
	type: Pages;
	location: string;
	onLocationChange: (newLocation: string) => void;
}
