import React, {useState} from 'react'
import 'antd/dist/antd.css'
import {Card,Input,Button,Spin,message} from 'antd'
import {UserOutlined,KeyOutlined} from '@ant-design/icons'
import '../static/css/login.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'

export default function Login(props) {

    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [valid,setValid] = useState(true)
    //用于节流发送错误信息
    const sendError = function(mes){
        if(valid){
            setValid(false)
            message.error(mes)
            setTimeout(()=>{
                setValid(true)
            },2000)
        }
    }
    const checkLogin = ()=>{
        if(!userName){
            sendError('用户名不能为空')
            return false
        }else if(!password){
            sendError('密码不能为空')
            return false
        }
        setIsLoading(true)  //加载框
        let dataProps = {
            'userName':userName,
            'password':password
        }
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:dataProps,
            withCredentials:true    //带上cookie
        }).then(
            res=>{
                setIsLoading(false) //取消加载框
                if(res.data.data=='登录成功！'){
                    localStorage.setItem('openId',res.data.openId)  //把服务器发来的openId缓存起来
                    props.history.push('/index')    //跳转到后台页面
                }else{
                    sendError('用户名密码错误！')
                }
            }
        )
    }
    return (
        <div className='login-div'>
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="LCB blog System" bordered={true} style={{width:400}}>
                    <Input 
                        id="userName"
                        size="large"
                        placeholder='Enter your username'
                        prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                        onChange={(e)=>{
                            setUserName(e.target.value)
                        }}
                    />
                    <br></br>
                    <Input.Password 
                        id="password"
                        size="large"
                        placeholder='Enter your password'
                        prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                    <br></br>
                    <br></br>


                    <Button type="primary" size="large" block onClick={checkLogin}>Login</Button>
                </Card>
            </Spin>
        </div>
    )
}
