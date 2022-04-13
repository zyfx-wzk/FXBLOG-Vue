import {ElMessage} from 'element-plus'

const message = {
    centerMessage: (message, type) => {
        ElMessage({
            message: message,
            type: type,
            center: true,
            duration: 3000,
            //合并消息提醒
            grouping:true
        })
    }
}

export default message;