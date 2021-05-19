import * as actionTypes from '../actions/actionTypes';

const initialState = {
    flows: [],
    flow: {},
    myFlows: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GOT_ALL_FLOWS:
            return {
                ...state,
                flows: action.flows
            };
        case actionTypes.GOT_MY_FLOWS: {
            return {
                ...state,
                myFlows: action.myFlows
            }
        }
        case actionTypes.GOT_SINGLE_FLOW:
            return {
                ...state,
                flow: action.flow
            };
        default:
            return state;
    }
};

export default reducer;
