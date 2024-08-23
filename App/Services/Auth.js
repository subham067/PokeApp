
import Storage from "../Utils/Storage";


const getAccount = async () => {
    return Storage.get('account');
}

async function setAccount(data) {
    return await Storage.set('account', data);
}


const AuthService = {
    getAccount,
    setAccount,

}

export default AuthService;