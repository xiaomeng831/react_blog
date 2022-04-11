import React ,{useState,useEffect} from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import {Row, Col, Input, Select, DatePicker, Button, message} from 'antd'
import axios from 'axios'

import servicePath from '../config/apiUrl'
const {Option} = Select
const {TextArea} = Input


function AddArticle(props) {

    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择类别') //选择的文章类别
    const [valid,setValid] = useState(true)//节流阀
    //节流发送错误信息
    const sendError = function(mes){
        if(valid){
            setValid(false)
            message.error(mes)
            setTimeout(()=>{
                setValid(true)
            },2000)
        }
    }
    //进入页面时执行
    useEffect(()=>{
        getTypeInfo()
         let tmpId = props.match.params.id
        if(tmpId){
            setArticleId(tmpId)
            getArticleById(tmpId)
        }
    },[])

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    }); 
    //同步输入的文章内容在预览页
    const changeContent = (e)=>{
        const content = e.target.value
        setArticleContent(content)
        const html = marked(content)
        setMarkdownContent(html)
    }
    //同步输入的简介内容在预览页
    const changeIntroduce = (e)=>{
        const introduce = e.target.value
        setIntroducemd(introduce)
        const html = marked(introduce)
        setIntroducehtml(html)
    }
    //找中台要文章类型
    const getTypeInfo = ()=>{
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials:true
        }).then((res)=>{
            if(res.data.data === '没有登录'){   //如果没有登录（找不到cookie）就会强行跳转
                localStorage.removeItem('openId')
                props.history.push('/')
            }else{
                setTypeInfo(res.data.data)        
            }
        })
    }
    //发布文章
    const saveArticle = ()=>{
        if(selectedType == '请选择类别'){
            sendError('请选择文章类型')
            return false
        }else if(!articleTitle){
            sendError('请输入文章标题')
            return false
        }else if(!articleContent){
            sendError('请输入文章内容')
            return false
        }else if(!introducemd){
            sendError('请输入文章简介')
            return false
        }else if(!showDate){
            sendError('请设置发布日期')
            return false
        }
        let dataProps = {}
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_Content = articleContent
        dataProps.introduce = introducemd
        dataProps.addTime = (new Date(showDate.replace('-','/')).getTime()) / 1000
        
        if(articleId === 0){
            dataProps.view_count = 0;
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials:true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isSuccess){
                        message.success('文章添加成功！')
                    }
                    else{
                        sendError('文章添加失败！')
                    }
                }
            )
        }else{
            dataProps.id=articleId
            axios({
                method:'post',
                url:servicePath.updateArticle,
                data:dataProps,
                withCredentials:true
            }).then(
                res=>{
                    if(res.data.isSuccess){
                        message.success('文章保存成功')
                    }else{
                        sendError('文章保存失败')
                    }
                }
            )
        }
    }

    const getArticleById=(id)=>{
        axios(servicePath.getArticleById+id,
            {withCredentials:true
        }).then(
            res=>{
                let articleInfo = res.data.data[0]
                console.log(articleInfo)
                setArticleTitle(articleInfo.title)
                setArticleContent(articleInfo.article_content)
                let html = marked(articleInfo.article_content)
                setMarkdownContent(html)
                setIntroducemd(articleInfo.introduce)
                let tmpIntro = marked(articleInfo.introduce)
                setIntroducehtml(tmpIntro)
                setShowDate(articleInfo.addTime)
                setSelectType(articleInfo.typeName)
            }
        )
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input 
                                value={articleTitle}
                                placeholder='博客标题'
                                size="large"
                                onChange={e=>setArticleTitle(e.target.value)}
                            />    
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} value={selectedType} size="large" onChange={v=>setSelectType(v)}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.Id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                                
                            </Select>
                        </Col>
                    </Row>
                    <br></br>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea 
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                value={articleContent}
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{__html:markdownContent}}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span="24">
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type = "primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br></br>
                        </Col>
                        <Col span="24">
                            <br></br>
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                value={introducemd}
                                onChange={changeIntroduce}
                            ></TextArea>
                            <br></br>
                            <div className="introduce-html"
                            dangerouslySetInnerHTML={{__html:introducehtml}}/>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date,dateString)=>{setShowDate(dateString)}}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
                
            </Row>
        </div>
    )
}

export default AddArticle