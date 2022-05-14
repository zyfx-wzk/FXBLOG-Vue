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

export function encrypt(data) {
    let jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(key);
    data = {data: jsEncrypt.encrypt(data)}
    return data;
}