import React,{useState,useEffect} from 'react'
import '../pages/_app'
import {Row,Col, Menu} from 'antd'
import {HomeOutlined,MessageOutlined,HeartOutlined,AuditOutlined} from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faBlog,faHeart,faFileLines,faB } from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {
    const [navArray, setNavArray] = useState([])
    // 使用useEffect钩子模拟componentDifMount，第二参数是空，表示无依赖项，在页面初始化之后执行
    useEffect(()=>{
        fetchData()
    },[])
    //异步调用axios得到导航列表数据
    const fetchData = async ()=>{
        const result = await axios(servicePath.getTypeInfo).then(
            (res)=>{
                return res.data.data
            }
        )
        setNavArray(result)
    }
    //点击个类型之后，根据类型筛选文章
    const handleClick = (e)=>{
        if(e.key == 1){
            Router.push('/list?id=1')
        }else if(e.key == 2){
            Router.push('/list?id=2')
        }else if(e.key == 3){
            Router.push('/about')
        }else{
            Router.push('/') 
        }
        // if(e.key!=0){
        //     Router.push('/list?id='+e.key)
        // }else{
        //     Router.push('/')
        // }
    }

    return (
        <div className="header" >
            {/* Row和Col相当于antd里面的tr和td标签，用于布局 */}
            <Row type="flex" justify="left">
                {/* 给页面做栅格化，分成均等的24列进行布局，是基于flex布局 */}
                <Col  xs={24} sm={24} md={10} lg={10} xl={10} >  
                {/* 可以点击跳转回到首页 */}
                    <Link href='/'>
                        <span className="header-logo">BradyXu</span>
                    </Link>
                    <span className="header-txt">A new developer who loves to learn and share.</span>
                </Col>
        
                <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={8}>
                    {/* 导航菜单Menu */}
                    <Menu mode="horizontal" onClick={handleClick} className="menu-style">           
                        <Menu.Item key='0'>
                            <FontAwesomeIcon icon={faHouse} /> Home
                        </Menu.Item>
                        <Menu.Item key='1'>
                            <FontAwesomeIcon icon={faBlog} /> Blog
                        </Menu.Item>
                        <Menu.Item key={3}>
                            <FontAwesomeIcon icon={faFileLines} /> About
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
      )
}

export default Header