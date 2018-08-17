const INITIAL_STATE = {
    users: {},
    company: {},
};

const applySetUsers = (state: any, action: any) => ({
    ...state,
    users: action.users,
});

const applySetCompany = (state: any, action: any) => ({
    ...state,
    company: action.companyId,
});

function userReducer(state: any = INITIAL_STATE, action: any) {
    switch (action.type) {
        case 'USERS_SET' : {
            return applySetUsers(state, action);
        }
        case 'COMPANY_SET' : {
            return applySetCompany(state, action);
        }
        default :
            return state;
    }
}

export default userReducer;