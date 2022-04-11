import React from 'react'
import Head from 'next/head'
import {Row,Col,Breadcrumb,Affix,BackTop} from 'antd'
import {CalendarOutlined,FolderOpenOutlined} from '@ant-design/icons'
import Tocify from '../components/tocify.tsx'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { motion } from 'framer-motion';

import './_app.js'
import servicePath from '../config/apiUrl.js'
import Header from '../components/Header'
import Author from '../components/Author.js'
import Footer from '../components/Footer.js'


const Detailed = (props) => {
  const context = props
  const renderer = new marked.Renderer()
  //对marked进行配置
  marked.setOptions({
    renderer:renderer,
    gfm:true,//git样式
    pedantic:false,//严格模式
    sanitize:false,//忽略html
    tables:true,//允许用git样式输出表格
    breaks:false,//是否用git换行符
    smartLists:true,//美化列表样式
    highlight:function(code){//使得代码高亮
      return hljs.highlightAuto(code).value //自动检测
    }
  })
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw){
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  
  let html = marked(context.article_content)  
  //使用marked方法对文章内容进行渲染

  return (
    <motion.div exit={{opacity:0}} initial={{opacity:0}} animate={{opacity:1}}>
      <Head>
        <title>Brady's Blog</title>
      </Head>

      <Header />
      <Row className="comm-main" type="flex" justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item><a href='/'>Home</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href={'/list?id='+context.typeId}>{context.typeName}</a></Breadcrumb.Item>
                <Breadcrumb.Item>{context.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className='detailed-title'>
                {context.title}
              </div>
              <div className='list-icon center'>
                <span><CalendarOutlined/>{context.addTime}</span>
                <span><FolderOpenOutlined/>{context.typeName}</span>
              </div>
              <div className='detailed-content' dangerouslySetInnerHTML={{__html:html}}>
              </div>
            </div>
          </div>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Affix offsetTop={5}>
            <div className='detailed-nav comm-box'>
              <div className='nav-title'>文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <BackTop />
      <Footer/>
    </motion.div>
  )
}
  
Detailed.getInitialProps = async(context)=>{
  console.log(context.query.Id)
  let Id = context.query.Id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById + Id).then(
      (res)=>{
        console.log(res.data.data[0])
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed
