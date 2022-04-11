//首页
import React from 'react'
import Head from 'next/head'
import {Row,Col,Menu} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faBlog,faFileLines } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';
import Router from 'next/router'
import axios from 'axios'

import './_app.js'
import servicePath from '../config/apiUrl.js'
import Author from '../components/Author'
import Footer from '../components/Footer'
const Home = () => {


  const handleClick = (e)=>{
    if(e.key == 1){
        Router.push('/list?id=1')
    }else if(e.key == 3){
        Router.push('/about')
    }else{
        Router.push('/') 
    }
}

  return(
    <motion.div exit={{opacity:0}} initial={{opacity:0}} animate={{opacity:1}}>
      <Head>
        <title>Brady's Blog</title>
      </Head>
      <br />
      <Row type="flex" justify="center">
        <Col className="menu-div" xs={20} sm={16} md={12} lg={8} xl={6} >
          {/* 导航菜单Menu */}
          <Menu mode="horizontal" onClick={handleClick} className="index-menu">           
              <Menu.Item key='0' className="index-menu-item">
                <FontAwesomeIcon icon={faHouse} /> Home
              </Menu.Item>
              <Menu.Item key='1' className="index-menu-item">
                <FontAwesomeIcon icon={faBlog} /> Blog
              </Menu.Item>
              <Menu.Item key='3' className="index-menu-item">
                <FontAwesomeIcon icon={faFileLines} />  About
              </Menu.Item>
          </Menu>
        </Col>
      </Row>
      <br/>
      <Row justify="center">
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
        <Author />
        </Col>
      </Row>            
      <Footer/>
    </motion.div>
  )
}

Home.getInitialProps = async ()=>{

  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Home
