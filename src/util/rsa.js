import {JSEncrypt} from "jsencrypt";

const encrypt = (publicKey, data) => {
    let jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
    data = {data: jsEncrypt.encrypt(data)}
    return data;
}

export default encrypt;
