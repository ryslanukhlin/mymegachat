const defaultState = {
    email: '',
    password: ''
}

export const SET_FORM = 'SET_FORM';

const registerForm = (state = defaultState, action) => {
    switch (action.type){
        case SET_FORM:
            return {...state, [action.payload.name]: action.payload.value};
        default:
            return state;
    }
}

export const setForm = (payload) => ({type: SET_FORM, payload})

export default registerForm;