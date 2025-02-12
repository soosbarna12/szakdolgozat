export interface ProfileMenuProps {
	anchorElUser: null | HTMLElement;
	disabled: boolean;
	setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
	handleSetTheme: (newTheme: boolean) => void;
	handleCloseMenu: (event: React.MouseEvent<HTMLElement>) => void;
}
