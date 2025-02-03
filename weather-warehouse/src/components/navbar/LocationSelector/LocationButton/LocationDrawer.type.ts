export interface LocationDrawerProps {
	toggleLocationDrawer: (newOpen: boolean) => () => void;
	open: boolean;
}
