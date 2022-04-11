import React,{useState} from 'react'
import {Route,Switch} from 'react-router-dom'
import { Layout, Menu, Breadcrumb} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import ArticleList from './ArticleList'
import AddArticle from './AddArticle';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminIndex(props) {

    const [collapsed,setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    const handleClickArticle = e=>{
        if(e.key === 'addArticle'){
            props.history.push('/index/add')
        }
        else{
            props.history.push('/index/list')
        }
    }

    return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
            <PieChartOutlined/>
            <span>工作台</span>
            </Menu.Item>
            <Menu.Item key="2">
            <DesktopOutlined/>
            <span>添加文章</span>
            </Menu.Item>
            <SubMenu
            key="sub1"
            title={
                <span>
                <UserOutlined/>
                <span>文章管理</span>
                </span>
            }
            onClick={handleClickArticle}
            >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
            <Menu.Item key="5">删除文章</Menu.Item>
            </SubMenu>
            
            <Menu.Item key="9">
            <FileOutlined/>
            <span>留言管理</span>
            </Menu.Item>
        </Menu>
        </Sider>
        <Layout>

        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Switch>
                    <Route path="/index/" exact component={ArticleList}/>
                    <Route path="/index/add/" exact component={AddArticle}/>
                    <Route path="/index/list/"  component={ArticleList}/>
                    <Route path="/index/add/:id" exact component={AddArticle}/>
                </Switch>
                LCB的博客管理系统
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>liuchb.xyz</Footer>
        </Layout>
    </Layout>
    );
}
