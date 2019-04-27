import { LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED} from '../actions/types'

const initialState = {
    user: {},
    access_token: {},
    isAuthenticated: false,
    isLoading: false
}

const user = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_PENDING:
            return {
                
            }
    }
}