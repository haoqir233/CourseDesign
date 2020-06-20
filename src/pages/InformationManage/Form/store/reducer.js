const defaultState = {
    // 重置按钮的状态
    formstatus:true,
    // 模态框文本
    ModalText: '确定要提交内容吗',
    // 模态框状态
    visible: false,
    // 提交异步加载
    confirmLoading: false,
    //供应商表单值
    sformValue:'',
}

export default (state = defaultState, action) => {

    if(action.type==='formStatusChange'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.formstatus = action.value
        return newState;
    }

    if(action.type==='visibleChange'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.visible = action.value
        return newState;
    }

    if(action.type==='confirmLoadingOpen'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.confirmLoading = action.value
        newState.ModalText = action.message
        return newState;
    }

    if(action.type==='confirmLoadingClose'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.visible = action.value
        newState.confirmLoading = action.value
        return newState;
    }

    if(action.type==='sformValue'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.sformValue = action.value
        return newState;
    }

    return state
}