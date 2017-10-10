import React from 'react';

class About extends React.Component {
	
	constructor(props) {
		super(props);
	};
	render(){
		console.log(this.props.data);
		return (
			<div>
				<h1 className='page-header'>{this.props.title}</h1>
				{this.props.data.map(function(item,i) {
					
					return (
						<div className='list-group' key={ item.id } >
							<a href={"#/subject/"+item.id} className="list-group-item">
						     	<span className="badge">{item.rating.average}</span>
						        <div className="media">
						            <div className="media-left" href="#">
						                <img src={item.images.small} />
						            </div>
						            <div className="media-body">
						                <h4 className="media-heading">{item.original_title}</h4>
						                <p>导演:{item.directors.map(function(directors,j){
						                	if(j==item.directors.length-1){
						                		return <span key={directors.id}>{directors.name}</span>
						                	}else{
						                		return <span key={directors.id}>{directors.name}、</span>
						                	}
						                },this)}</p>
						                <p>
						                类型:{item.genres.map(function(genre,n){
						                		if (n==item.genres.length-1) {
						                			return <span key={n}>{genre}</span>
						                		}else{
						                			return <span key={n}>{genre}、</span>
						                		}
						                	},this)}
						                </p>
						            </div>
						        </div>
						    </a>
						</div>
						)
				},this)}
			</div>
		)
	}
}

export default About;