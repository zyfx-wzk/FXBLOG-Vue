import {JSEncrypt} from "jsencrypt";
import {rsaPublicKeyApi} from "@/api/api";

let key;

//获取RSA加密公钥
export function getRsaKey() {
    if (key == null) {
        rsaPublicKeyApi()
            .then(result => {
                key = result.data
            })
    }
}

const encrypt = async (data) => {
    if (key == null) {
        await getRsaKey();
        let jsEncrypt = new JSEncrypt();
        jsEncrypt.setPublicKey(key);
        data = {data: jsEncrypt.encrypt(data)}
    }
    return data;
}

export default {encrypt};
