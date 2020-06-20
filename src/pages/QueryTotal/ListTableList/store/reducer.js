const defaultState = {
    searchText: '',
    searchedColumn: '',
    dataSource: '',
      // 模态框文本
    ModalText: '确定要提交内容吗',
    // 模态框状态
    visible: false,
    // 提交异步加载
    confirmLoading: false,
    //点击修改所在列的数据
    datachange:''
}

export default (state = defaultState, action) => {

  if(action.type==='handleSearch'){
    let newState = JSON.parse(JSON.stringify(state));
    newState.searchText = action.value
    newState.searchedColumn = action.dataIndex
    return newState;
}

if(action.type==='handleReset'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.searchText = action.value
  return newState;
}


if(action.type==='visibleChange'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.visible = action.value
  newState.datachange = action.tabledata
  return newState;
}

if(action.type==='confirmLoadingOpen'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.confirmLoading = action.value
  return newState;
}

if(action.type==='confirmLoadingClose'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.visible = action.value
  newState.confirmLoading = action.value
  return newState;
}

if(action.type==='findAllSupplier'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.dataSource = action.value
  return newState;
}

if(action.type==='findAllCustomer'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.dataSource = action.value
  return newState;
}

    return state
}