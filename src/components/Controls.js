import React, {Component} from 'react'

import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import {connect} from 'react-redux';
import {myCheckButtonAction,myXSlideAction, myYSlideAction,myZSlideAction,myChangeVolumeAction} from '../redux/AppActions'
import Select from 'react-select'
import OpacityControl from './OpacityControl'
import ColorMapControl from './ColorMappingController'
const options = [
  { value: './assets/models/nrrd/00.nrrd:false', label: 'Spheroid' },
  { value: './assets/models/nrrd/simulation_data.nrrd:false', label: 'Simulation' },
  
];


const Range = Slider.Range;

const mapStateToProps = state => {
  return { 
    currentColorMap: state.currentColorMap
   };
};

export default connect(
     mapStateToProps,
    {myCheckButtonAction,myXSlideAction,myYSlideAction,myZSlideAction,myChangeVolumeAction})
    ( class Controls extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        currentVolume:"",
        xslideValue: 0,
        yslideValue: 0,
        zslideValue: 0,
        activateColorMapping: false,
        
      };

      this.handleCheckBoxInputChange = this.handleCheckBoxInputChange.bind(this);

      this.xSlideHandleChange = this.xSlideHandleChange.bind(this);
      this.ySlideHandleChange = this.ySlideHandleChange.bind(this);
      this.zSlideHandleChange = this.zSlideHandleChange.bind(this);
      this.volumeSelectChanged = this.volumeSelectChanged.bind(this);
   
      this.options  = ['one', 'two', 'three'];

      
 }


 handleCheckBoxInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  this.props.myCheckButtonAction(value);
  this.setState({
    [name]: value
  });
}


  xSlideHandleChange = (value) => {
    
    this.setState({
      xslideValue:value,
    });

   this.props.myXSlideAction(value[0],value[1]);
  };

  ySlideHandleChange = (value) => {
    this.setState({
      yslideValue:value,
    });

   this.props.myYSlideAction(value[0],value[1]);
  };

  zSlideHandleChange = (value) => {
    this.setState({
      zslideValue:value,
    });

   this.props.myZSlideAction(value[0],value[1]);
  };

  volumeSelectChanged = (selected) =>
  {
     this.setState({
      currentVolume: selected.value
     });
     var volumeProperties = selected.value.split(":");
     
     this.props.myChangeVolumeAction(volumeProperties[0],volumeProperties[1]);
  };


  componentWillMount() {

  }
render () {
  console.log("this.state.currentVolume "+ this.state.currentVolume);
  return (
      
      <div id="controls" className="controls-container" >
       
        <label>Volume</label>
        <br/>
        <Select options={options} onChange={this.volumeSelectChanged} />
        <div> 
       
        <label>
          <br/>
          Enable Color Map &nbsp;
         <input disabled = {(this.state.currentVolume == "") ? "disabled" : ""}
           name="activateColorMapping"
           type="checkbox"
           checked={this.state.activateColorMapping}
           onChange={this.handleCheckBoxInputChange}
           />
        </label>
       
          <div style={this.state.activateColorMapping ? {} : { display: 'none' }} >
           <ColorMapControl  />
           <OpacityControl/>
          </div>
     
       </div>
       
      
         <br/> 
         <div className="slices-container" >
         <label>
            X Slide <br/>

         </label>
        
         <Range disabled = {(this.state.currentVolume == "") ? "disabled" : ""} allowCross={false} step={0.0009} defaultValue={[0, 1]} min={0} max={1} onChange={this.xSlideHandleChange}/>

         <br/>

         <label>
         Y Slide <br/>
         </label>
         <Range disabled = {(this.state.currentVolume == "") ? "disabled" : ""} allowCross={false} step={0.0009} defaultValue={[0, 1]} min={0} max={1} onChange={this.ySlideHandleChange}/>
         <br/>

         <label>
         Z Slide <br/>
         </label>
         <Range disabled = {(this.state.currentVolume == "") ? "disabled" : ""} allowCross={false} step={0.0009} defaultValue={[0, 1]} min={0} max={1} onChange={this.zSlideHandleChange}/>
         </div>

      </div>

  );
}
})
