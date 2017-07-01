export const CHANGE_VIEW = "CHANGE_VIEW";
export const changeView = (viewId) => {
    return {
        type: CHANGE_VIEW,
        viewId
    };
};
