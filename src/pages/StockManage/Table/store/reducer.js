const defaultState = {
    dataSource: '',
      // 模态框文本
    ModalText: '确定要提交内容吗',
    // 模态框状态
    visible: false,
    
    //点击修改所在列的数据
    datachange:'',
    //入库模态框的状态
    addstock:false,
    //所有商品名
    allCommodityName:[],
    //所有的库存
    findAllStock:[],
    //销售模态框的状态
    addSell:false,
    //销售选定行的值
    addSellValue:'',
    //所有的客户全称
    getAllCustomerName:[],

    //退货模态框的状态
    stockUpBack:false,
    //退货选定行的值
    stockUpBackValue:'',

    //入库实时计算应付金额
    stockUpNumber:'',
    price:'',

    //表格选中
    selectedRowKeys: [],

}

export default (state = defaultState, action) => {


if(action.type==='visibleChange'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.visible = action.value
  newState.datachange = action.tabledata
  return newState;
}

//入库模态框的状态
if(action.type==='addStock'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.addstock= action.value
  return newState;
}

//所有商品名
if(action.type==='allCommodityName'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.allCommodityName= action.value
  return newState;
}

//所有商品名
if(action.type==='findAllStock'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.findAllStock= action.value
  return newState;
}

//销售模态框的状态
if(action.type==='addSell'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.addSell= action.value
  return newState;
}

//销售选定行的值
if(action.type==='addSellValue'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.addSellValue= action.value
  return newState;
}

//所有的客户全称
if(action.type==='getAllCustomerName'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.getAllCustomerName= action.value
  return newState;
}

//销售数量是否小于总数量
if(action.type==='sellNumber'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.sellNumber= action.value
  return newState;
}

//退货模态框的状态
if(action.type==='stockUpBack'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.stockUpBack= action.value
  return newState;
}

//销售选定行的值
if(action.type==='stockUpBackValue'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.stockUpBackValue= action.value
  return newState;
}

//实时计算入库应付金额
if(action.type==='stockUpNumber'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.stockUpNumber= action.value
  return newState;
}
if(action.type==='price'){
  let newState = JSON.parse(JSON.stringify(state));
  newState.price= action.value
  return newState;
}


    return state
}