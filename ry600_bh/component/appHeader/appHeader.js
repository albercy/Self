let _tmpData = {
  storeCrr: '万邦药业',
  orgCrr: '同和药店',
  searchTip: '输入品名（或拼音首字母）、厂商、品牌'
}

function appHeader() {
  let pages = getCurrentPages()
  let curPage = pages[pages.length - 1]
  //Object.assign(curPage,)
  curPage.setData(_tmpData)
}