import React from 'react';

class Details extends React.Component {
	constructor(props){
		super(props);
		this.state={
			image:'',
			rating:'',
			directors:'',
			countries:'',
			casts:'',
			summary:'',
			title:''
		}
		this.getData = this.getData.bind(this);
	}
	getData(url){
		var that = this;
		$.ajax({
			url:'https://api.douban.com/v2/movie/'+url,
			type:'GET',
			dataType:'jsonp',
			success:function(data){
				console.log(data);
				that.setState({
					image:data.images["large"],
					rating:data.rating["average"],
					directors:data.directors,
					countries:data.countries,
					casts:data.casts,
					summary:data.summary,
					title:data.title
				});
				console.log(that.state);
			},
			error:function(){
				console.log("数据请求失败！！！");
			}
		})
	}
	render(){
		if (this.state.image=="") {
			this.getData(window.location.hash.substr(2));
			return(
				<div className="wrap" >
				    <div className="spinner">
				        <div className="cube1"></div>
				        <div className="cube2"></div>
				    </div>
				</div>
				)
		}else{
			return (
				<div style={{fontSize:"16px"}}>
					<img style={{float:"left",paddingRight:"30px"}} src={this.state.image} />
					<h1><b style={{fontSize:"50px"}}>{this.state.title}</b></h1>
					
					<span>豆瓣评分:</span><span style={{color:'red'}}>{this.state.rating}</span>
					
					&nbsp;&nbsp;&nbsp;
					<span>导演:
						<span>
						{this.state.directors.map(function(director,i){
						if (i==this.state.directors.length-1) {
							return(
								<a key={director.id} style={{color:"green",textDecoration:"none",fontWeight:600}}>{director.name}</a>
								)
						}else{
							return(
								<a key={director.id} style={{color:"green",textDecoration:"none",fontWeight:600}}>{director.name}、</a>
								)
						}
					},this)}
						</span>
					</span>
					&nbsp;&nbsp;&nbsp;
					<span>国家/地区: {this.state.countries.map(function(country,i){
						if (this.state.countries.length-1==i) {
							return <span key={i+1000}>{country}</span>
						}else{
							return <span key={i+1000}>{country}、</span>
						}
					},this)}</span>
					<span></span>
					<p>
						<span style={{marginTop:"10px"}}>主演:</span>
						<span style={{color:"green",fontWeight:600}}>
							{this.state.casts.map(function(cast,i){
								if (i==this.state.casts.length-1) {
									return <span key={cast.id}>{cast.name}</span>
								}else{
									return <span key={cast.id}>{cast.name}、</span>
								}
							},this)}
						</span>
					</p>
				
					<p style={{lineHeight:'2em'}}>{this.state.summary}</p>
				</div>
			)	
		}
	}
}
export default Details;