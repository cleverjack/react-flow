import * as actionTypes from './actionTypes';

const options = (data) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    };
};

export const getAllFlows = () => {
    return dispatch => {
        fetch('/api/flows')
        .then(res => res.json())
        .then(res => {
            localStorage.setItem('BasicMERNStackAppAllFlows', JSON.stringify(res.flows));
            dispatch({ type: actionTypes.GOT_ALL_FLOWS, flows: res.flows })
        })
    };
};

export const getMyFlows = () => {
    return dispatch => {
        fetch('/api/flows/myflows', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            localStorage.setItem('BasicMERNStackAppMyFlows', JSON.stringify(res.flows));
            dispatch({ type: actionTypes.GOT_MY_FLOWS, myFlows: res.flows })
        })
    };
};

export const getFlow = (flowId) => {
    return dispatch => {
        fetch('/api/flows/' + flowId)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: actionTypes.GOT_SINGLE_FLOW, flow: res.flow })
        })
    };
};

export const getTempFlow = () => {
  return dispatch => {
      fetch('/api/flows/get')
      .then(res => res.json())
      .then(res => {
          dispatch({ type: actionTypes.GOT_SINGLE_FLOW, flow: res.flow })
      })
  };
};

export const submitTempNewFlow = (flowData) => {
  return dispatch => {
      return fetch('/api/flows/t-add', options(flowData))
      .then(res => res.json())
  }
};

export const submitNewFlow = (flowData) => {
    return dispatch => {
        return fetch('/api/flows/add', options(flowData))
        .then(res => res.json())
    }
};

export const saveFlow = (flowId, flowData) => {
    return dispatch => {
        return fetch('/api/flows/edit/' + flowId, options(flowData))
        .then(res => res.json())
    }
}

export const deleteFlow = (flowId) => {
    return dispatch => {
        return fetch('/api/flows/delete/' + flowId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            },
            method: 'delete'
        })
        .then(res => res.json())
    };
}
