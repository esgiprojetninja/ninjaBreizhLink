import * as v from "../actions/viewActions";

function handleChangeView(viewId) {
    switch (viewId) {
        case "url":
            return {
                id: "url"
            };
        default:
            return {
                id: "url"
            };
    }
}

const view  = (state = {}, action) => {
    switch (action.type) {
        case v.CHANGE_VIEW:
            return handleChangeView(action.viewId);
        default:
            return state;
    }
};

export default view;
