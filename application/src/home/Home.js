import React, {Component} from 'react';
import {Layout, Carousel, Button} from 'antd';
import LoginNav from '../nav/NavLogin';
import Nav from '../nav/Nav';
import Footer from '../footer/NewFooter';
import Post from './Post';
import './Home.css';
import axios from 'axios';

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLogin: false,
            page: 0,
            posts: [],

        }

        this.getPost = this.getPost.bind(this);
    }

    getPost(){
        const page = this.state.page;
        const that = this;
        axios(
            {
                method: 'GET',
                url: 'api/post-recommend/post/recommend',
                params: {
                    page: page
                }
            }
            ).then((res)=>{
                const posts = that.state.posts;
                posts.push(...res.data);
                that.setState({posts: posts});
                that.setState({page: page+1});
            })
    }

    componentDidMount(){
        this.getPost();

        if(window.localStorage.getItem("token") != undefined){
            this.setState({isLogin: true});
        }
    }


    render(){
        const nav = this.state.isLogin ? <LoginNav/> : <Nav/>;
        const listItems = this.state.posts.map((post) =>
        <Post title={post.title} content={post.content} time={post.issueDate} pid={post.pid} key={post.pid}/>
        );
        const more = this.getPost;
        return(
            <Layout>
                {nav}
                <div className={"home-content"}>
                    <div className={"home-background"}>
                        <Carousel autoplay>
                            <div>
                                <h1 id={"content-1"}>基于微服务架构的价格系统</h1>
                            </div>
                            <div>
                                <h1 id={"content-2"}>开始发布价格帖子！</h1>
                            </div>
                            <div>
                                <h1 id={"content-3"}>Getting Started!</h1>
                            </div>
                        </Carousel>
                    </div>
                    <div className={"home-posts"}>
                        {listItems}
                    </div>
                    <div style={{textAlign: 'center', margin: '15px 0'}}><Button onClick={more}>更多</Button></div>
                </div>
                <Footer></Footer>
            </Layout>
        );
    }
}

export default Home;