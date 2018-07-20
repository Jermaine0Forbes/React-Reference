# React Reference

This is a way to keep note on how to do  react

[how to create a fragment][fragments]

[fragments]:#how-to-create-a-fragment
[home]:#react-reference

### how to create a fragment

<details>
<summary>
View Content
</summary>



**references**
- [Fragments](https://reactjs.org/docs/fragments.html)

**React Definition**: A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

**My Definition:** I think it is used to encase other child components, but I don't know if it is better than enclosing child 
components with `<React.Fragment>` or just `<div>` tags

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```


**item.js** 
```js
import React from "react";
import ReactDOM from "react-dom";

export default class Item extends React.Component{
    
    render(){
            var code  = this.props.code;
          if (code == "" || code == undefined)
               code = "there is no code"
        
        return(
            <React.Fragment>
                <ul>
                    <li>{code}</li>
                    <li>{this.props.item}</li>
                </ul>
            </React.Fragment>
        );
    }
}


```

**list.js**
```js
import React from "react";
import ReactDOM from "react-dom";
import Item from "./item.js"

export default class List extends React.Component {
    
    constructor(props){
        super(props);
        this.url = "http://apiv3.iucnredlist.org/api/v3/country/list?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee";
        this.state = {urls:[]};
        this.get = this.get.bind(this);
        this.setData = this.setData.bind(this);
        this.size = 3;
        this.addMore = this.addMore.bind(this);
    }
    
    addMore(){
        
        this.size +=3;
        
        this.get();
    }
    
    setData(data){
        
        var size = 3, urls = [];
         
            for(let x = 0; x < this.size; x++){
            console.log(data[x])
//            console.log(data[x].country)
            urls[x] = data[x];
            }
        
            this.setState({urls:urls})
        
        
    }
    
    componentWillMount(){
        this.get();
    }
    
    get(){
        
       
        
        
        fetch(this.url)
        .then(result =>{
            return result.json();
        })
        .then(result =>{
            //console.log(result)
             this.setData(result.results);
        })
        .catch(err =>{
            console.log(err)
        })
        
       
       
        
    }
    
    render(){
        
        var items;
        if( this.state.urls.length > 0){
           items = this.state.urls.map(element =>{
                return <Item item={element.country} key={element.isocode} code={element.isocode}/>
            })
        }else{
            items = <Item item="something is needed" />
        }
        
         return (<div>Now lets see if it works
            <div className="my-4">
            {items}
            </div>
                <button className="btn btn-primary" onClick={this.addMore}> Add More</button>
            </div>) ;
        
    }
 
};

```

**root.js**
```js
import React from "react";
import ReactDOM from "react-dom";
//import Item from "./item.js"
import List from "./list.js"


class Root extends React.Component {
    
   render(){
       return(<List />);
}
 
}; 

ReactDOM.render(<Root />, document.getElementById("root"));
```

</details>

[go back :house:][home]
