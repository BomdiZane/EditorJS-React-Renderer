/** QuoteOutput
  *
  * @version 1.0.0
  * @created - 2019.08.20
  * @author - Adombang Munang Mbomndih (Bomdi) <dzedock@gmail.com> (https://bomdisoft.com)
  *
  * Version History
  * ---------------
  * @version 1.0.1 - 2020.02.12 - Covert to React component - Adombang Munang Mbomndih
  * @version 1.0.2 - 2020.07.17 - Add config parameter - Adombang Munang Mbomndih
  */

//#region imports
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Quote from './quote/index.jsx';
//#endregion

const supportedStyles = ['container', 'content', 'author', 'message'];

const QuoteOutput = ({ data, style, config }) => {
  if (!data) return '';
  if (!style || typeof style !== 'object') style = {};

  supportedStyles.forEach(customStyle => {
    if (!style[customStyle] || typeof style[customStyle] !== 'object') style[customStyle] = {};
  });

  let content = null;
  let caption = 'Unknown';

  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.text && typeof data.text === 'string') {
    content = data.text;
    if (data.caption && typeof data.caption === 'string') caption = data.caption;
    if (data.alignment && typeof data.alignment === 'string') style.textAlign = data.alignment;
  }

  if (!content) return '';
  return <Quote author={ ReactHtmlParser(caption) } message={ ReactHtmlParser(content) } style={ style } config={ config } />;
};

export default QuoteOutput;
