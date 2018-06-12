import React, { Component, Fragment } from 'react';

class QuoteData extends Component{
    
    shareOnTwitter =(text,url) =>{
        
        window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');

    }

    render() {
        return(
            <div >
                <a href={this.props.qdata.link} id="text" dangerouslySetInnerHTML={{
                __html: this.props.qdata.content
                }} />
                <p id="author">- {this.props.qdata.title}</p>
                <br />
                <button onClick={()=>this.shareOnTwitter(this.props.qdata.content,this.props.qdata.link)}>Share</button>
            </div>
        )
    }
}

class QuoteMachine extends Component {
    constructor(){
        super();
        this.state={
            quote:{
                content:'',
                link:'',
                title:''
            },
            hasQuote:false
        }
        this.END_POINT='https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=42'
    }
    
    getRandomQuote=(event)=> {
        let i = Math.floor(Math.random()*42);
        fetch(this.END_POINT)
        .then(response=>response.json())
        .then(data=>{
            console.log(i)
            console.log(data)
            if(data[i].content && data[i].title && data[i].link) {
                this.setState({
                    quote:{
                        content: data[i].content,
                        link:data[i].link,
                        title: data[i].title
                    }
                })
                if(this.state.hasQuote===false) {
                    this.setState({hasQuote:true})
                }
            }
            else {
                return console.error('No Quote found!')
            }
        })
    }
    render() {
        // console.log(this.state)
        
        return (
            <div id="quote-box">
                <h1>Quote Machine</h1>
                <button onClick={this.getRandomQuote}>New Quote</button>
                <br />
                {this.state.hasQuote===true ? <QuoteData qdata={this.state.quote}/>:'No quote Yet'}
            </div>
        );
    }
}

export default QuoteMachine;