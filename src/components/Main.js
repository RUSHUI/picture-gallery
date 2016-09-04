require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import  ReactDOM from 'react-dom';

let imageDatas = require('../data/imgData.json');


imageDatas  = (function getImageURL(imageDataArr) {
    for(var i =0, j= imageDataArr.length;i<j;i++){
      var singleImageData= imageDataArr[i];
      singleImageData.imageURL = require('../images/'+ singleImageData.fileName);
      imageDataArr[i]  = singleImageData;
    }
    return imageDataArr;
  })(imageDatas);

function getRangeRandom(Min,Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}
/*获取0-30°之间的任意的正负值*/
function get30DegRandom() {
  return (Math.random()> 0.5 ?"":"-")+ Math.ceil(Math.random()*30);
}

var ImgFigure =  React.createClass({
  handleClick:function(e){
  if(this.props.arrange.isCenter){
    this.props.inverse();
  }else{
    this.props.center();
  }
  e.preventDefault();
  e.stopPropagation();
  },
  render:function(){
    var styleObj ={};
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }

    if(this.props.arrange.rotate){
      styleObj['transform'] = 'rotate(' +this.props.arrange.rotate +'deg)';
    }
    if(this.props.arrange.isCenter){
      styleObj.zIndex =11;
    }
    var imgFigureClassName ='img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse':'';
    return (
      <figure className={imgFigureClassName} style ={styleObj} onClick={this.handleClick}>
        <img onClick={this.handleClick} src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    );
  }
});
var ControllerUnit = React.createClass({
  handleClick:function(){

  },
  render:function(){
    return (
      <span className="controller-unit" onClick={this.handleClick}></span>
    );
  }
});
class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      imgsArrangeArr:[
        {
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      ]
    };

    this.Constant= {
        centerPos:{
          left:0,
          right:0
        },
        hPosRange:{
          leftSecX:[0,0],
          rightSecX:[0,0],
          y:[0,0]
        },
        vPosRange:{
          x:[0,0],
          topY:[0,0]
        }
      }
  }
  center(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  }
  componentDidMount(){
    var stageDom = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDom.scrollWidth,
      stageH = stageDom.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    var imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW  =imgFigureDom.scrollWidth,
      imgH = imgFigureDom.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil( imgH/2);
    this.Constant.centerPos = {
      left:halfStageW - halfImgW,
      top:halfStageH - halfImgH
    };
    this.Constant.hPosRange.leftSecX[0] = -halfImgH;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
    this.Constant.hPosRange.rightSecX[0]= halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] =stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH- halfImgH;

    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;

    this.Constant.vPosRange.x[0] = halfStageW -imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  }


  inverse(index){
    return function(){
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse  = ! imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr:imgsArrangeArr
      });

    }.bind(this);
  }

  rearrange(centerIndex){
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,
      imgsArrangeTopArr = [],
      topImgNum = Math.floor(Math.random()*2),
      topImgSpliceIndex =0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

    imgsArrangeCenterArr[0].pos = centerPos;

    imgsArrangeCenterArr[0].rotate = 0;
    imgsArrangeCenterArr[0].isCenter = true;
    topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr  = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

    imgsArrangeTopArr.forEach(function(value,index){
      imgsArrangeTopArr[index]={
        pos:{
          top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
          left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
        },
        rotate:get30DegRandom(),
        isCenter:false
      }
    });
    for(var i =0,j = imgsArrangeArr.length,k = j/2;i<j;i++){
      var hPosRangeLORX = null;
      if(i < k){
        hPosRangeLORX = hPosRangeLeftSecX;
      }else{
        hPosRangeLORX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i]={
        pos:{
          top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
            left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
        },
        rotate:get30DegRandom(),
        isCenter:false
      }

    }
    if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
      imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
    this.setState({
      imgsArrangeArr:imgsArrangeArr
    });
  }
  render() {
    var controllerUnits =[],
      imgFigures = [];
    imageDatas.forEach(function(value,idx){
      if(!this.state.imgsArrangeArr[idx]){
        console.log(this.state.imgsArrangeArr[idx]);
        this.state.imgsArrangeArr[idx] ={
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      }
      imgFigures.push(<ImgFigure center={this.center(idx)} inverse ={this.inverse(idx)} arrange={this.state.imgsArrangeArr[idx]} data={value} key={idx} ref ={'imgFigure' + idx }/>);
      controllerUnits.push(<ControllerUnit key={idx}/>)
    }.bind(this));
    return (
     <section className="stage" ref="stage" >
        <section className="img-sec">
          {imgFigures}
        </section>
       <nav className="controller-nav">
         {controllerUnits}
       </nav>
     </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
