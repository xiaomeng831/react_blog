//首页
import React from 'react'
import Head from 'next/head'
import {Row,Col,Divider,BackTop,Affix} from 'antd'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap,faLocationDot,faEnvelope,faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';

import './_app.js'
import servicePath from '../config/apiUrl.js'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
const About = () => {

  return(
    <motion.div exit={{opacity:0}} initial={{opacity:0}} animate={{opacity:1}}>
      <Head>
        <title>Brady's Blog</title>
      </Head>
      <Header />
      
      {/*文章列表*/}
      <Row className="comm-main" type="flex" justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <br />
          <ul>
            <h2>Xiaomeng(Brady) Xu</h2>
            <li><FontAwesomeIcon icon={faLocationDot} /> Ottawa, ON, CA</li>
            <li><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:bradyxu831@gmail.com" target="_blank" style={{color:"black"}}>bradyxu831@gmail.com</a></li>
            <a href="https://drive.google.com/file/d/1QXcIN1PwtBkVkI38p2AoI7OSijXvWhKp/view?usp=sharing" target="_blank"><li><FontAwesomeIcon icon={faFileArrowDown} /> download</li></a>
          </ul>
          <Divider orientation='center'>Education</Divider>
          <ul>
            <li><FontAwesomeIcon icon={faGraduationCap} /> Diploma with Honors, Computer Programming, <a href="https://www.algonquincollege.com/" target="_blank">Algonquin College</a>, Ottawa, Canada 2020.9 – 2022.4</li>
            <li><FontAwesomeIcon icon={faGraduationCap} /> Master, Master of Accounting, <a href="http://english.uibe.edu.cn/" target="_blank">University of International Business and Economics</a>, Beijing, China 2015.9 – 2018.6</li>
            <li><FontAwesomeIcon icon={faGraduationCap} /> Bachelor, Geography, <a href="http://io.hebtu.edu.cn/en/" target="_blank">Hebei Normal University</a>, Shijiazhuang, China 2009.9 – 2013.6</li>
          </ul>
          <Row className="comm-main" type="flex" justify='center'>
            <Divider orientation='center'>Technical Skills</Divider>
              <ul>
                <h4>Front-End</h4>
                <li>HTML; CSS; Less; Ant Design</li>
                <li>JavaScript; TypeScript</li>
                <li>React; Redux</li>
                <li>Vanilla Ajax; Axios; Fetch</li>
                <li>Webpack; npm; yarn</li>
                <li>Flutter</li>
              </ul>
              <ul>
                <h4>Back-End</h4>
                <li>Java; Servlet; JSP; Hibernate</li>
                <li>Tomcat server; Glassfish server</li>
                <li>Node.js; Express.js; koa.js; egg.js</li>
                <li>MySQL; PostgreSQL; Oracle; MS SQL Server</li>
                <li>MongoDB</li>
              </ul>
          </Row>
          <Divider orientation='center'>Work Experience</Divider>
            <ul>
              <h3>Jr. Front-End Engineer, Gome Insurance Brokers, Beijing, China Oct 2018 - Nov 2019</h3>
              <li>● Technologies used: JavaScript/React/React-Redux/React-Redux/Ant-Design/Less/Axios</li>
              <li>● Collaborated with 1 product manager, 1 UI designer and 5 engineers to designed and built an insurance management application for sales department, marketing department and financial department.</li>
              <li>● Created and maintained 4 pages about insurance products.</li>
              <li>● Encapsulated a module for sending ajax with Axios to use back-end API to implement many features and communicated with back-end developers for any front-end problematic issues.</li>
            </ul>
            <ul>
              <h3>Financial Accountant, Gome Financial Holdings Investment, Beijing, China Sep 2013 - Aug 2015</h3>
              <li>● Responsible for accounting, taxation, financial analysis</li>
            </ul>
          <Divider orientation='center'>Personal Project</Divider>
          <ul>
            <h3>Developer Community – React Web Application</h3>
            <li>● Technologies used: JavaScript/React/React-Router/React-Redux/Axios/Styled-Components</li>
            <li>● Built a Single-Page Application with React-Router including a login page, home page and article detail page.</li>
            <li>● Using React-Redux to store and manage components’ state.</li>
            <li>● Using Axios to send ajax request to get mock data.</li>
            <li>● Using Styled-Components to write CSS and HTML elements in JavaScript file.</li>
          </ul>
          <ul>
            <h3>Savvy Renos and Design – Android Application </h3>
            <li>● Technologies used: Dart/Flutter/Firebase Database</li>
            <li>● Built an Android Application using Flutter with classmates for a renovation company called Savvy Renos and Design.</li>
            <li>● Responsible for design and develop 3 pages</li>
            <li>● Implemented the bilingual feature using Flutter Intl package</li>
          </ul>
          <ul>
            <h3>Blood Bank – Java Servlet Web Application</h3>
            <li>● Technologies used: Java/Servlet/MySQL/Tomcat Server</li>
            <li>● Built a Java Web Application base on a skeleton from professor.</li>
            <li>● Applied DAO design pattern in the project and finished all Logic-Factory classes and Entity classes</li>
            <li>● Created some Junit test for all logic classes.</li>
          </ul>
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

About.getInitialProps = async ()=>{

  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default About
