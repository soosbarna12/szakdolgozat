export interface ProfileMenuProps {
    anchorElUser: null | HTMLElement;
    isLightTheme: boolean;
    handleSetLightTheme: (isLightTheme: boolean) => void;
    handleCloseMenu: (event?: React.MouseEvent<HTMLElement>) => void;
}
