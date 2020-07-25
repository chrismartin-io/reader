import React from 'react';
import JSSoup from 'jssoup';

function GetNYTimes(blob) {
  // get soup
  let soup = new JSSoup(blob.data);

  console.log('soup is', soup);

  // get title
  let h1spans = soup.findAll('h1');
  let title = h1spans[0].nextElement._text;

  // get author
  let author;
  let spans = soup.findAll('span');
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].attrs) {
      for (let attr in spans[i].attrs) {
        if (attr === 'itemProp') {
          if (spans[i].attrs[attr] === 'name') {
            author = spans[i].nextElement._text;
          }
        }
      }
    }
  }

  // get article body tag
  let bodyTag;
  let bodySection = soup.findAll('section');

  for (let i = 0; i < bodySection.length; i++) {
    if (bodySection[i].attrs) {
      for (let attr in bodySection[i].attrs) {
        if (attr === 'itemProp') {
          if (bodySection[i].attrs[attr] === 'articleBody') {
            bodyTag = bodySection[i];
          }
        }
      }
    }
  }

  // loop through body tag
  let body = [];
  let current = bodyTag;
  let searching = true;
  let aTag = false;
  let moveSentence = false;

  while (searching) {
    current = current.nextElement;

    // if (current.name === 'p') {
    //   if (current.contents[0]._text) {
    //     body.push(current.contents[0]._text);
    //   }
    // }

    if (current.name === 'a') {
      console.log('a tag', current);
      if (current.nextElement._text !== undefined) {
        console.log('parsing a');

        console.log('body char', body[body.length - 1].slice(body[body.length - 1].length - 1))

        // check previous for empty space or not
        if (
          body[body.length - 1].slice(body[body.length - 1].length - 1) ===
            ' ' ||
          body[body.length - 1].slice(body[body.length - 1].length - 1) === '“'
        ) {
          console.log('if statement true')
          body[body.length - 1] =
            body[body.length - 1] +
            '+href' +
            current.attrs.href +
            '+' +
            current.nextElement._text;
          aTag = true;
          moveSentence = true;
        } else {
          body.push(
            '<a href="' + current.attrs.href + '">' + current.nextElement._text + '</a>'
          );
          aTag = true;
          moveSentence = true;
        }
      }
    } else if (current._text !== undefined) {
      if (aTag) {
        aTag = false;
        continue;
      } else if (moveSentence === true) {
        body[body.length - 1] = body[body.length - 1] + current._text;
        moveSentence = false;
      } else {
        body.push(current._text);
      }
    }

    if (current.name === 'p' && current.attrs.class.includes('etfikam0')) {
      searching = false;
    }
  }

  console.log('title', title);
  console.log('author', author);
  console.log('bodysection', bodySection);
  console.log('bodytag', bodyTag);
  console.log('body array', body);

  return {
    title: title,
    author: author,
    body: body
  };
}

export default GetNYTimes;
