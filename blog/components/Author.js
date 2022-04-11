import { GithubOutlined, LinkedinOutlined, WechatOutlined } from '@ant-design/icons'
import {Avatar, Divider, Tooltip} from 'antd'
import '../pages/_app'

const Author = ()=>{
    const text = <img src="http://localhost:3000/wechat.jpg" style={{width:"200px", height:"262px"}}/>;
    return (
        <div className='author-div comm-box'>
            <div> <Avatar size={100} src="http://localhost:3000/1.jpg"/></div>
            <div className='author-introduction'>
                Brady Xu
                <Divider>Social Media</Divider>
                <a href="https://github.com/xiaomeng831" target="_blank"><Avatar size={30} icon={<GithubOutlined/>} className='account'/></a>
                <a href="https://www.linkedin.com/in/brady-xu-915ba9200/" target="_blank"><Avatar size={30} icon={<LinkedinOutlined />}  className='account'/></a>
                <Tooltip placement="bottomLeft" title={text} ><Avatar size={30} icon={<WechatOutlined/>}  className='account' style={{ cursor: "pointer" }} /></Tooltip>
            </div>
        </div>
    )
}
export default Author