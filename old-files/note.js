function _id(id){
  return document.getElementById(id);
}

var   Note = React.createClass({
    render:function(){
      if(this.state.editing){
        return this.renderForm();
      }else{
        return this.renderDisplay();
      }
    },
    edit:function(){
      this.setState({editing:true});
    },
    remove:function(){
      alert("it has been removed");
    },
    save:function(){
      var val = this.refs.newText.value;
      alert("TODO: save note value "+val);
      this.setState({editing:false});
    },
    renderDisplay:function(){
      return(<div className="note">
      <h2>{this.props.children}</h2>
<div className="btns">
<button onClick={this.edit} className="btn edit">Edit</button>
<button onClick={this.remove} className="btn remove">Remove</button>
</div>
        </div>);
    },
    renderForm:function(){
      return( <div className="note">
<textarea className="tarea" ref="newText" defaultValue={this.props.children}></textarea>
<button onClick ={this.save} className="btn save">save</button>
      </div>);
    },
    getInitialState:function(){
      return{editing:false};
    }
  });

  var Board = React.createClass({
    render:function(){

      return(
        <div className="board">{this.state.notes.map(function(note,i){
          return (
            <Note key={i}>{note}</Note>
          );
        })}</div>
      );
    },
    getInitialState:function(){
      return {
        notes:[
          'Call Bill',
          'Email Lisa',
          'Go to doctor appointment',
          'Send proposal'
        ]
      };
    },
    propTypes:{
      count:function(props,propName){
        if(typeof props[propName] !== "number")
        {
        return  new Error("prop needs to be a number");
        }
        if(props[propName]>100){

          return new Error ("Creating "+props[propName]+" is ridiculous");
        }
      }

    }
  });


  ReactDOM.render(<Board count={10}/>

    , _id('container'));
