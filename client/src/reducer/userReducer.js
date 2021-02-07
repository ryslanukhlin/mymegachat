const defaultState = {
    isAuth: false,
    token: null,
    user: null
}

export const SET_USER = 'SET_USER';

const userReducer = (state = defaultState, action) => {
    switch (action.type){
        case SET_USER:
            return { isAuth: true, token: action.payload.token, user: action.payload.user };
        default:
            return state;
    }
}

export const setUser = (payload) => ({type: SET_USER, payload});

export default userReducer;