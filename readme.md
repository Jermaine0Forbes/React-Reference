# React Reference

This is a way to keep note on how to do react

- [how to change the port number][port-number]
- [how to create a fragment][fragments]
- [how to re-render a component when the window resizes][window-resize]
- [how to use switch statement inside react][switch-react]

### Errors
- [React Error : __WEBPACK_IMPORTED_MODULE_4_jquery___default(…)(…).modal is not a function][error-1]

[switch-react]:#how-to-use-switch-statement-inside-react
[window-resize]:#how-to-rerender-a-component-when-the-window-resizes
[error-1]:#modal-is-not-a-function
[port-number]:#how-to-change-port-number
[fragments]:#how-to-create-a-fragment
[home]:#react-reference

### how to use switch statement inside react

<details>
<summary>
View Content
</summary>

:link: **Reference**
- [stackoverflow](https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component)
---

When you are rendering a  component you can create a switch statement that looks like below

```js
 render(){
     return(
         <>
            {
                {
                'foo': <Foo />,
                'bar': <Bar />
                }[param]
            }
         </>
     )
 }
```

Explanation: 

</details>

[go back to table of contents][home]


### how to re-render a component when the window resizes

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [Re-render a React Component on Window Resize](https://www.pluralsight.com/guides/re-render-react-component-on-window-resize)
---

:exclamation: **Note:**

---

#### A way to do it with hooks 

```js
import React from 'react'
function MyComponent() {
  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    
}

    window.addEventListener('resize', handleResize)
  })
  return <div>Rendered at {dimensions.width} x {dimensions.height}</div>
}
```

#### A way to do it with classes 

```js
  class MyComponent extends Component{

      constructor(props){
          super(props)
          this.state ={
              setSize: {
                  height:window.innerHeight,
                  width:window.innerWidth,
              },
          }
      }

      handleResize = () => {

          // insert other stuff
          
          this.setState({
              setSize:{
                  height:window.innerHeight,
                  width:window.innerWidth
              }
          })
      }

      componentDidMount()
      {
          const {handleResize} = this;

          window.addEventListener("resize", handleResize);
      }
  }

```

</details>

[go back :house:][home]

### modal is not a function

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [stackoverflow](https://stackoverflow.com/questions/52464915/react-error-webpack-imported-module-4-jquery-default-modal-is-no/52464960)
---

```js
// If you ever get this error just import the $ in the top of your component like so

import $ from 'jquery'
```

</details>

[go back :house:][home]


### how to change the port number

<details>
<summary>
View Content
</summary>

1. Assuming that you already created a react application with the command `create-react-app insertNameOfApp`. 
If you are  in linux type this in the terminal.

```
vim .env
```

2. This should open a new file in the vim editor. Type 'i' in the editor in order to insert text and insert the 
port number of your choosing

```
PORT=4000
```

3. To save and quit the editor hit the "ESC" key and ":wq".

4. Now run react and the port number should be changed to number that is the **.env** file.

</details>

[go back :house:][home]

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
