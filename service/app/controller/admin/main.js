'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller{

    async index(){
        this.ctx.body="hi api"
    }
    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = "SELECT userName FROM admin_user WHERE userName = '"+userName+"' AND password = '"+password+"'"
        const res = await this.app.mysql.query(sql)
        if(res.length > 0){
            console.log(123)
            let openId = new Date().getTime()
            this.ctx.session.openId={'openId':openId}
            this.ctx.body = {'data':'登录成功！','openId':openId}
        }else{
            this.ctx.body={'data':'密码错误！'}
        }
    }

    async getTypeInfo(){
        const resType = await this.app.mysql.select('type')
        this.ctx.body={data:resType}
    }

    async addArticle(){
        let tempArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article',tempArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body={
            isSuccess:insertSuccess,
            insertId:insertId
        }
    }

    async updateArticle(){
        let tempArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article',tempArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body={
            isSuccess:updateSuccess
        }
    }

    async getArticleList(){
        let sql = 'SELECT article.Id as Id,' + 
                'article.title as title ,' + 
                'article.introduce as introduce ,' + 
                "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime ," + 
                'article.view_count as view_count ,' + 
                'type.typeName as typeName ' + 
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC'
        const resList = await this.app.mysql.query(sql)
        this.ctx.body={list:resList}
    }

    async delArticle(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{'Id':id})
        this.ctx.body={data:res}
    }

    async getArticleById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.Id as Id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.Id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.Id='+id
        const result = await this.app.mysql.query(sql)
        console.log(result)
        this.ctx.body={data:result}
    }
}

module.exports = MainController