export interface ActionsMenuProps {
    anchorElUser: null | HTMLElement;
    handleCloseMenu: (event: React.MouseEvent<HTMLElement>) => void;
    onSaveLocation?: () => void;
    onResetLocation?: () => void;
}
