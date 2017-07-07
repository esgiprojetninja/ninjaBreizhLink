import * as v from "../actions/viewActions";


const view  = (state = {}, action) => {
    switch (action.type) {
        case v.CHANGE_VIEW:
            return action.view;
        default:
            return state;
    }
};

export default view;
