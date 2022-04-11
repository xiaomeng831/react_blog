//提供一个全局引用方法
import App from 'next/app'
import { AnimatePresence } from 'framer-motion'
import 'antd/dist/antd.css'
import '../static/style/components/header.css'
import '../static/style/components/author.css'
import '../static/style/components/footer.css'
import '../styles/globals.css'
import '../static/style/pages/index.css'
import '../static/style/pages/detailed.css'
import 'markdown-navbar/dist/navbar.css'

class MyAPP extends App {
    render(){
        const {Component, pageProps, router} = this.props;
        return(
            <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route}/>
            </AnimatePresence>
        )
    }
}
export default MyAPP