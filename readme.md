# [EditorJS-React Renderer (ERR)](https://err.bomdisoft.com/)

[View live example](https://err.bomdisoft.com/)

[![](https://flat.badgen.net/npm/v/editorjs-react-renderer?icon=npm)](https://www.npmjs.com/package/editorjs-react-renderer)
![npm](https://img.shields.io/npm/dw/editorjs-react-renderer)
[![](https://flat.badgen.net/npm/license/editorjs-react-renderer)](https://www.npmjs.com/package/editorjs-react-renderer)

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
      "type" : "embed",
      "data" : {
        "service" : "coub",
        "source" : "https://coub.com/view/1czcdf",
        "embed" : "https://coub.com/embed/1czcdf",
        "width" : 580,
        "height" : 320,
        "caption" : "My Life"
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
      "type": "checklist",
      "data": {
        "items": [
          {
            "text": "Gather requirements",
            "checked": true
          },
          {
            "text": "Develop API",
            "checked": true
          },
          {
            "text": "Notify stakeholders",
            "checked": false
          },
        ]
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

The values can be nested objects. The following example highlights the current possible nestings and keys for the supported block.

```javascript
// All valid JSX inline styles are allowed
const style = {
  header: {
    textAlign: 'left',
  },
  image: {
    img: {
      maxHeight: '400px',
    },
    figure: {
      backgroundColor: 'aliceblue',
      border: '1px solid #eee'
    },
    figcaption: {
      borderRadius: '5px',
    }
  },
  embed: {
    video: {
      maxHeight: '400px',
    },
    figure: {
      justifyContent: 'center',
    },
    figcaption: {
      borderRadius: '5px',
    }
  },
  paragraph: {
    textAlign: 'left',
    cursor: 'default',
  },
  list: {
    textAlign: 'left',
  },
  checklist: {
    container: {},
    item: {},
    checkbox: {},
    label: {},
  },
  table: {
    table: {},
    tr: {},
    th: {},
    td: {},
  },
  quote: {
    container: {},
    content: {},
    author: {
      fontWeight: 'bold',
    },
    message: {
      textAlign: 'left',
    }
  },
  codeBox: {
    container: {
      width: '100%',
    },
    code: {
      boxSizing: 'border-box',
    },
  },
  warning: {
    fontWeight: 400,
  },
  delimiter: {
    container: {},
    svg: {},
    path: {
      fill: '#231F20'
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


## Config

All renderers accept a **config** object parameter. If you wish to disable a default styles and only apply your own, you can pass a **disableDefaultStyle** value of **true** to the element's config options

```javascript
const config = {
  header: {
    disableDefaultStyle: true,
  },
  image: {
    disableDefaultStyle: true,
  },
};

const Post = () => <section><Output data={ data } style={ style } config={ config } /></section>;

export default Post;
```


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
* EmbedOutput(data[,style])
* ListOutput(data[,style])
* ChecklistOutput(data[,style])
* QuoteOutput(data[,style])
* WarningOutput(data[,style])
* DelimiterOutput([,style])


## Supported blocks/components
* [CodeBox](https://github.com/BomdiZane/codebox)
* [Header](https://github.com/editor-js/header)
* [Paragraph](https://github.com/editor-js/paragraph)
* [Image](https://github.com/editor-js/image)
* [Embed](https://github.com/editor-js/embed)
* [List](https://github.com/editor-js/list)
* [Checklist](https://github.com/editor-js/checklist)
* [Table](https://github.com/editor-js/table)
* [Quote](https://github.com/editor-js/quote)
* [Warning](https://github.com/editor-js/warning)
* [Delimiter](https://github.com/editor-js/delimiter)

There's more coming...


## Author

Adombang Munang Mbomndih (Bomdi)

LinkedIn: [LinkedIn](http://www.linkedin.com/in/adombangmunang)
