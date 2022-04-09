import {ElMessage} from 'element-plus'

const message = {
    centerMessage: (message, type) => {
        ElMessage({
            message: message,
            type: type,
            center: true,
        })
    }
}

export default message;