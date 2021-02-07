const defaultState = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    errorsForm: {
        username: { status: false, msg: null },
        email: { status: false, msg: null },
        password: { status: false, msg: null },
        repeatPassword: { status: false, msg: null }
    }
}

export const SET_FORM = 'SET_FORM';
export const SET_ERRORS_FORM = 'SET_ERRORS_FORM';

const registerForm = (state = defaultState, action) => {
    switch (action.type){
        case SET_FORM:
            return {...state, [action.payload.name]: action.payload.value};
        case SET_ERRORS_FORM:
            return {...state, errorsForm: action.payload};
        default:
            return state;
    }
}

export const setForm = (payload) => ({type: SET_FORM, payload})
export const setErrorsForm = (payload) => ({type: SET_ERRORS_FORM, payload})

export default registerForm;