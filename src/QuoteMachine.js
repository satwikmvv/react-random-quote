import React, { Component, Fragment } from 'react';

class QuoteData extends Component{
    render() {
        return(
            <div>
                {this.props.qdata.content}
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
        this.END_POINT='https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
    }
    
    getRandomQuote=(event)=> {
        fetch(this.END_POINT)
        .then(response=>response.json())
        .then(data=>{
            if(data[0].content && data[0].title && data[0].link) {
                this.setState({
                    quote:{
                        content: data[0].content,
                        link:data[0].link,
                        title: data[0].title
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
        console.log(this.state)
        
        return (
            <Fragment>
                <h1>Quote Machine</h1>
                <button onClick={this.getRandomQuote}>New Quote</button>
                <br />
                {this.state.hasQuote===true ? <QuoteData qdata={this.state.quote}/>:'No quote Yet'}
            </Fragment>
        );
    }
}

export default QuoteMachine;