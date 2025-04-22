export interface ActionsMenuProps {
    anchorElUser: null | HTMLElement;
    handleCloseMenu: (event: React.MouseEvent<HTMLElement>) => void;
    onSaveLocation?: () => void;
    onExportLocation?: () => void;
    onResetLocation?: () => void;
}
