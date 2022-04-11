let ipUrl = 'http://localhost:7001/default/'
let servicePath = {
    getArticleList: ipUrl + 'getArticleList',   //首页接口
    getArticleById: ipUrl + 'getArticleById/',//详细页接口
    getTypeInfo: ipUrl + 'getTypeInfo',//文章类别接口
    getListById: ipUrl + 'getListById/',//根据文章类别获得文章接口
}
export default servicePath