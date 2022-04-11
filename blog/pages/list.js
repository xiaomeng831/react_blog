import React, {useState,useEffect} from 'react'
import Head from 'next/head'
import {Row,Col,List,Breadcrumb,BackTop} from 'antd'
import {CalendarOutlined,FolderOpenOutlined} from '@ant-design/icons'
import axios from 'axios'
import servicePath from '../config/apiUrl.js'
import Link from 'next/link'
import { motion } from 'framer-motion';

import './_app.js'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
const MyList = (list) => {

  const [mylist,setMyList] = useState(list.data)
  useEffect(()=>{
    setMyList(list.data)
  })
  return(
    <motion.div exit={{opacity:0}}  initial={{opacity:0}} animate={{opacity:1}}>
      <Head>
        <title>Brady's Blog</title>
      </Head>

      <Header />      
      {/*文章列表*/}
      <Row className="comm-main" type="flex" justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>

            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item><a href='/'>Home</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href='/'>Blog</a></Breadcrumb.Item>
              </Breadcrumb>
            </div> 
          <List 
            header={<div>Blog</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                <div className='list-title'>
                  <Link href={{pathname:'/detailed',query:{Id:item.Id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className='list-icon'>
                  <span><CalendarOutlined/>{item.addTime}</span>
                  <span><FolderOpenOutlined/>{item.typeName}</span>
                </div>
                <div className='list-context'>{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        {/*个人信息*/}
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
        </Col>
      </Row>
      <BackTop />
      <Footer/>
      </motion.div>
  )
}

MyList.getInitialProps = async (context)=>{
  let Id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById + Id).then(
      (res)=>resolve(res.data)
    )
  })
  return await promise
}

export default MyList
