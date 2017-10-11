/*  用于存取若干网络请求都需要用到数据 */
var mData = new Object()
function saveData(options){
  mData = options
}

function getData(){
  return mData
}

module.export = {
  saveData: saveData,
  getData: getData
}