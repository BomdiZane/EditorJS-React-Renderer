# EditorJS-React Renderer (ERR)

[View live example](http://bomdizane.github.io/EditorJS-React-Renderer)

A library for rendering styled, responsive and flexible React components from [block style](https://editorjs.io/saving-data) data objects like those generated by codex editors like [Editor.js](https://editorjs.io/).

This package works well with output from the Editor.js rich text editor library.
However, there is no dependency on Editor.js. We only require that your data is in a similar block style format.


## Setup

Install the package via NPM

```shell
npm i editorjs-react-renderer
```

Install peer dependencies if you don't already have them in your project

```shell
npm i react prop-types
```

CDN usage will be available soon...

Add to your module/application

```javascript
import Output from 'editorjs-react-renderer';
OR
const Output = require('editorjs-react-renderer');
```

**Output** accepts a block style data object as prop

```javascript
const data = {
  "time": 1564767102436,
  "blocks": [
    {
      "type" : "header",
      "data" : {
        "level" : 4,
        "text" : "Editor.js React Renderer"
      }
    },
    {
      "type": "image",
      "data": {
        "file": {
          "url": "https://cdn1.imggmi.com/uploads/2019/8/24/fdbf3465641e401ebe0ec58d278656d1-full.jpg"
        },
        "caption": "Test Caption",
        "withBorder": false,
        "stretched": false,
        "withBackground": false
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque accusantium veritatis dolorum cum amet! Ipsa ullam nisi, dolor explicabo ut nobis repudiandae saepe illo error facilis consectetur, quisquam assumenda dolorum."
      }
    },
    {
      "type": "quote",
      "data": {
        "text": "&nbsp;<b>Lorem</b>&nbsp; ipsum dolor sit amet <mark class=\"cdx-marker\">consectetur</mark> adipisicing elit. Doloremque accusantium veritatis dolorum cum amet! Ipsa ullam nisi, dolor explicabo ut nobis repudiandae saepe illo error facilis consectetur, quisquam assumenda dolorum.",
        "caption": "Anonymous",
        "alignment": "left"
      }
    },
    {
      "type": "table",
      "data": {
        "content": [
          ["Name", "Age", "Position", "SSN"],
          ["Jack&nbsp;", "<strong>51</strong>", "All trades", "654654414131333"],
          ["John Doe", "<strong>32</strong>", "Senior Consultant", "0002145465145641"]
        ]
      }
    },
    {
      "type" : "warning",
      "data" : {
        "message" : "This is a warning!"
      }
    },
    {
      "type" : "list",
      "data" : {
        "items" : [
          "<i>Item one</i>",
          "Another item",
          "<strong>Item 3</strong>"
        ],
        "style" : "ordered"
      }
    },
    {
      "type": "delimiter",
      "data": {}
    },
  ],
  "version": "2.14.0"
};
```

*The **time** and **version** properties are not required. Only the **blocks** array is required*

Notice that your block data can also be HTML markup.

Pass your block style data to **Output()** and ERR will take care of the rest :)

```javascript
const Post = () => <section><Output data={ data } /></section>;

export default Post;
```

Each object in the *blocks* property of your block style data is converted to a responsive, styled React component.

**Output()** accepts a style prop through which you can add custom style to the supported components.

See the [Style](#style) section for more


## Render Single Block

Sometimes you might want to render just a single component like a paragraph or header. While this is possible with the **Output** component, you should consider using one of the more specific block output components.

```javascript
import { ListOutput } from 'editorjs-react-renderer';

const listData = {
  "items" : ["Item one", "Another item", "Item 3"],
  "style" : "unordered" // ordered or unordered
};

// Your custom style will be merged with the defaults, with yours as priority
const listStyle = {
  textAlign: 'left'
};

const Todo = () => <ListOutput data={ listData } style={ style } />;

export default Todo;
```

See the [API](#api) section for more block output components


## Style

You can style all supported components/blocks by passing a style prop to the **Output** component. This is an object whose keys correspond to the names of the supported blocks you intend to style.

**NB:** The keys to the style prop object must be in all lowercase.

The values can be nested objects. The following example highlights the current possible nestings and keys for the supported block.

```javascript
const style = {
  header: {
    textAlign: 'left',
    // All other valid JSX inline styles are allowed here
  },
  image: {
    img: {
      maxHeight: '400px',
      // All other valid JSX inline styles are allowed here
    },
    figure: {
      backgroundColor: 'aliceblue',
      // All other valid JSX inline styles are allowed here
    },
    figcaption: {
      borderRadius: '5px',
      // All other valid JSX inline styles are allowed here
    }
  },
  paragraph: {
    textAlign: 'left',
    cursor: 'default',
    // All other valid JSX inline styles are allowed here
  },
  list: {
    textAlign: 'left',
    // All other valid JSX inline styles are allowed here
  },
  table: {
    table: {
      margin: 0,
      // All other valid JSX inline styles are allowed here
    },
    tr: {
      margin: 0,
      // All other valid JSX inline styles are allowed here
    },
    th: {
      minWidth: '100px',
      // All other valid JSX inline styles are allowed here
    },
    td: {
      padding: '12px 15px',
      // All other valid JSX inline styles are allowed here
    },
  },
  quote: {
    container: {
      width: '100%',
      // All other valid JSX inline styles are allowed here
    },
    content: {
      minWidth: '240px',
      // All other valid JSX inline styles are allowed here
    },
    author: {
      fontWeight: 'bold',
      // All other valid JSX inline styles are allowed here
    },
    message: {
      textAlign: 'left',
      // All other valid JSX inline styles are allowed here
    }
  },
  codeBox: {
    container: {
      width: '100%',
      // All other valid JSX inline styles are allowed here
    },
    code: {
      boxSizing: 'border-box',
      // All other valid JSX inline styles are allowed here
    },
  },
  warning: {
    fontWeight: 600,
    // All other valid JSX inline styles are allowed here
  },
  delimiter: {
    container: {
      margin: '8px 0',
      // All other valid JSX inline styles are allowed here
    },
    icons: {
      width: '20px',
      // All other valid JSX inline styles are allowed here
    }
  },
};

const Post = () => <section><Output data={ data } style={ style } /></section>;

export default Post;
```
Of course, there is a limit to what you can do with JSX inline styling. But don't forget you can just as well style these components in your separate css file if you need features like media queries or pseudo-selectors.

```css
/* example.css */
table{
  margin: 0;
}
tr{
  margin: 0;
}
th{
  min-width: 100px;
}
td{
  padding: 12px 15px;
}
```

In the next version, you will be able to pass properties like **class** and **id** to output methods which you can target in your css files.


## Server Side Rendering

There is full support for SSR


## API

### Components/Functions

* Output(data[,style])
* CodeBoxOutput(data[,style])
* HeaderOutput(data[,style])
* ParagraphOutput(data[,style])
* TableOutput(data[,style])
* ImageOutput(data[,style])
* ListOutput(data[,style])
* QuoteOutput(data[,style])
* WarningOutput(data[,style])
* DelimiterOutput([,style])


## Supported blocks/components
* [CodeBox](https://github.com/BomdiZane/codebox)
* [Header](https://github.com/editor-js/header)
* [Paragraph](https://github.com/editor-js/paragraph)
* [Image](https://github.com/editor-js/image)
* [List](https://github.com/editor-js/list)
* [Table](https://github.com/editor-js/table)
* [Quote](https://github.com/editor-js/quote)
* [Warning](https://github.com/editor-js/warning)
* [Delimiter](https://github.com/editor-js/delimiter)

There's more coming...


## Author

Adombang Munang Mbomndih (Bomdi)

LinkedIn: [LinkedIn](http://www.linkedin.com/in/adombangmunang)

![](https://firebasestorage.googleapis.com/v0/b/editorjs-react-renderer.appspot.com/o/Bomdi%202.jpg?alt=media&token=323c4b3e-8542-4031-9660-74280a8cfefc)
