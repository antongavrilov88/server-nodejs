export const signUpDataRules = {
    body: {
        data: {
            type: 'required',
            attributes: {
                email: 'required',
                password: 'required'
            }
        }
    }
}

export const signInDataRules = {
    body: {
        data: {
            type: 'required',
            attributes: {
                email: 'required',
                password: 'required'
            }
        }
    }
}
