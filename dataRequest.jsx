import React from 'react';

import About from './About.jsx';

class DataRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			datas:"",
			title:"",
			currentPage:"",
			states:""
		};
		this.showPage = 8;
		this.pageNumber = [];
		this.Data=null;
		this.uri = null;
		this.getData = this.getData.bind(this);
		this.changeState = this.changeState.bind(this);
	}
	getData(url){
		this.pageNumber = [];
		this.Data = null;
		this.uri = null;
		var uri = url;
		var that = this;
		var URL = url.split("/");
		that.uri = URL[0];
		if (!URL[1]) {
			URL.push(1);
		}
		var currentPage = Number(URL[1]);
		var start = (Number(URL[1])-1)*5;
		var count = 5;
		var url = 'https://api.douban.com/v2/movie/'+URL[0]+"?"+"start="+start+"&&"+"count="+count;
		$.ajax({
			url:url,
			type:'GET',
			dataType:'jsonp',
			success:function(data){
				that.Data = data;
				if (Math.ceil(data.total/5)<8) {
					that.showPage = Math.ceil(data.total/5);
				}
				var allocation = Math.floor(that.showPage/2);
				var start = currentPage-allocation;
				var end = start+that.showPage-1;
				if (start<=0) {
					start = 1;
					end = start+that.showPage-1;
				}
				if (end>Math.ceil(data.total/5)) {
					end = Math.ceil(data.total/5);
					start = end-that.showPage+1;
				};
				for (var i = start; i <=end; i++) {
					that.pageNumber.push(i);
				};
				that.setState({
					datas:data.subjects,
					title:data.title,
					currentPage:currentPage,
					states:uri
				});
			},
			error:function(){
				console.log("数据请求失败！！！");
			}

		});
	}
	changeState(event){
		$(event.target).parent().siblings().removeClass("active");
		$(event.target).parent().addClass('active');
		var that = this;
		setTimeout(function(){
			that.setState({
				datas:""
			})
		},1);
	}
	render(){
		if (this.state.datas!="") {
			return (
				<div>
					<About data={this.state.datas} title={this.state.title} />
					<p>总共{this.Data.total}条电影,共{Math.ceil(this.Data.total/5)}页</p>
					<nav className='align_ul'>
						<ul className="pagination" ref="myUL">
						    { this.state.currentPage==1 ? <li className="disabled"><a>上一页</a></li> : <li onClick={this.changeState}><a href={"/#/"+this.uri+"/"+(this.state.currentPage-1)}>上一页</a></li>}
						    {this.pageNumber.map(function(page,i){
						    
				    			if (page==this.state.currentPage) {
				    			return <li className="active" key={i+10000} onClick={this.changeState}><a href={"React_douban/#/"+this.uri+"/"+page}>{page}</a></li>
				    			}else{
				    			return <li key={i+10000} onClick={this.changeState}><a href={"React_douban/#/"+this.uri+"/"+page}>{page}</a></li>
				    			}
						    		
						    },this)}
						    {this.state.currentPage==Math.ceil(this.Data.total/5) ? <li className="disabled"><a>下一页</a></li> : <li onClick={this.changeState}><a href={"/#/"+this.uri+"/"+(this.state.currentPage+1)}>下一页</a></li>}
						</ul>
					</nav>
				</div>
			)
		}else{
			this.getData(window.location.hash.substr(2));
			return(
				<div className="wrap" >
				    <div className="spinner">
				        <div className="cube1"></div>
				        <div className="cube2"></div>
				    </div>
				</div>
				)
		}
	}
}
export default DataRequest;