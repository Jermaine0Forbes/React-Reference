# React Reference

This is a way to keep note on how to do react

- [how to change the port number][port-number]
- [how to create a fragment][fragments]
- [how to re-render a component when the window resizes][window-resize]
- [how to use switch statement inside react][switch-react]
- [how to update field values in reduxForm][update-reduxform]
- [how to setup jest with react][jest-react]
- [how to setup react with webpack ][setup-wp]

### Errors
- [React Error : __WEBPACK_IMPORTED_MODULE_4_jquery___default(…)(…).modal is not a function][error-1]
- [Support for the experimental syntax 'jsx' isn't currently enabled][err-2]

[err-2]:#support-for-the-experimental-syntax-jsx-isnt-currently-enabled
[setup-wp]:#how-to-setup-react-with-webpack[setup-wp]
[jest-react]:#how-to-setup-jest-with-react
[update-reduxform]:#how-to-update-field-values-in-reduxform
[switch-react]:#how-to-use-switch-statement-inside-react
[window-resize]:#how-to-rerender-a-component-when-the-window-resizes
[error-1]:#modal-is-not-a-function
[port-number]:#how-to-change-port-number
[fragments]:#how-to-create-a-fragment
[home]:#react-reference


### Support for the experimental syntax 'jsx' isn't currently enabled

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [Unexpected token “<”](https://stackoverflow.com/questions/56952728/jest-tests-on-react-components-unexpected-token)
- [“Cannot use import statement outside a module”](https://stackoverflow.com/questions/58613492/how-to-resolve-cannot-use-import-statement-outside-a-module-in-jest)
---

This is an error that you will see if you're jest to test react applications. This solution can also fix several other errors like 
-  Unexpected token “<”
-  “Cannot use import statement outside a module” 

Basically the way to resolve this issue is to add react presets within a `babel.config.js`. If you have set up jest yet, then go [here][jest-react]


1. If you have not installed these babel packages then you should right now.

```
 npm i -D @babel/preset-env @babel/preset-react
```

2. Next, create a `babel.config.js` file and insert this code

```js
module.exports = {presets: ['@babel/preset-env','@babel/preset-react']}

```
3. What I found out is that when you added these presets you don't receive this error message, when you run jest that might a jsx component
within the file.

</details>

[go back :house:][home]

### how to setup react with webpack

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [How to setup React with Webpack](https://levelup.gitconnected.com/how-to-setup-a-react-application-with-webpack-f781b5c4a4ab)
---

1. First install react & webpack libraries

```
npm i react react-dom ; npm i -D webpack webpack-cli
```

2. Next create a directory that will hold the react files. So in the terminal type `mkdir src` or whatever you want your folder to be named.
Then create the  **App.js** file, and add the basic code like so.

```js

import React from "react";

export default function App() {
  return <h1>Hello World</h1>;
}
```

3. Now, create the **index.js** file that will render the react file like so.

```js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("app"));
```

4. Next install the babel loaders that will compile your react code so that can be used in the browser

```
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

5. Now it's time to create the webpack file. So you can  `vim webpack.config.js`, and add this code like so to your config file

```js

const path = require("path");
module.exports = {
  entry: "/src/index.js",
  output: { path: path.resolve(__dirname, "public/js/") },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  mode: "development",
  watch:true,
};

```

6. Now in your package.json, add a webpack script that you can call when you do `npm run ...` like so

```
  "scripts": {
    "build": "webpack" // in the scripts property add this code
  },

```

7. So now you if put in the the terminal `npm run build`, webpack would be in watch mode and will compile your code
to the designated **output** property. So in this example it would be `public/js/main.js`. If you want to change the 
name of the output file you have to add the  **filename** property inside the **output** object of the webpack object..


</details>

[go back :house:][home]


### how to setup jest with react

<details>
<summary>
View Content
</summary>

:link: **Reference**

- [How to test React with Jest](https://www.robinwieruch.de/react-testing-jest)
---

I'm going to assume that you already installed react and got a react app up and running

1. So first install jest

```
npm i -D jest
```
2. Now in the package.json, add this in the *scripts* section. This will allow you to run jest with any
cofigurations that you are going to put in the `jest.config.js`

```json
{
  ...
  "scripts": {
    "start": "webpack serve --config ./webpack.config.js --mode development",
    "test": "jest --config jest.config.js",
    "test:watch": "npm run test -- --watch",
  },
  ...
}
```

3. Now let's `vim jest.config.js` and add this necessary code to look for any js files that might have the *spec* extension

```js
module.exports = {
  "testRegex": "((\\.|/*.)(spec))\\.js?$"
}
```

4. If you have not installed babel libraries that are needed for jest, here is the time to do so

```
 npm i -D @babel/preset-env @babel/preset-react
```

5. Next, let's create a `babel.config.js` file in order to make sure jest does not throw any errors when you add JSX in
your testing files. Add code like so 

```js
module.exports = {presets: ['@babel/preset-env','@babel/preset-react']}

```

6. Now if you already have an App.js file, create a *App.spec.js* file and add code like so. This will be a general
 assertion to just to see if jest is running.

```js
import React from "react";


describe('My Test Suite', () => {
  it('should show my first test', () => {
    expect(true).toEqual(true);
  });
});

```

7. Now run `npm run test`, jest should start running and the result should pass.

</details>

[go back :house:][home]



### how to update field values in reduxForm

<details>
<summary>
View Content
</summary>

:link: **Reference**
- [stackoverflow](https://stackoverflow.com/questions/45230531/programmatically-change-redux-form-field-value)
---

This is only important if you're meaning to update any information in the reduxForm library

```js
import { change } from "redux-form";

handleSelectChange = (value, type) => {
  if (type === "site") {
      // The change method will update value based on the name of the field
      // that is provided in the second parameter
    this.props.change('nameofForm', "nameOfField", value);
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({change}, dispatch);
}

```

</details>

[go back to table of contents][home]

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
