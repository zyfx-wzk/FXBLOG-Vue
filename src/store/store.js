import {createStore} from "vuex";

const store = createStore({
    state() {
        return{
            setting: {
                isChanged: false,
                musicUuid: 0
            }
        }
    },
    mutations: {
        //更新数据(同步) .commit调用
        updateSeting(state, setting) {
            state.setting = setting;
        }
    },
    actions: {
        //更新数据(异步) .dispatch调用
        updateSeting(context, setting) {
            setTimeout(() => {
                context.commit('updateSeting', setting);
            }, 100)
        }
    },
    getters: {
    },
    modules: {}
})

export default store;