export interface ProfileMenuProps {
	anchorElUser: null | HTMLElement;
	isDisabled: boolean;
	setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
	handleSetTheme: (newTheme: boolean) => void;
	handleCloseMenu: (event: React.MouseEvent<HTMLElement>) => void;
}
