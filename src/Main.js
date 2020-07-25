import React, { useState } from 'react';
import getContent from './helpers/GetContent';
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Form,
  Typography,
  Button,
  ButtonBase,
  SearchBar,
  InputAdornment,
  IconButton
} from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      height: '100vh',
      margin: 0
    }
  },
  body: {
    height: '100vh',
    margin: 0
  },
  content: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ECECEC',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainDiv: {
    width: '50vw',
    height: '50vh',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    textAlign: 'center'
  },
  h6: {
    marginBottom: '20%'
  },
  main: {
    padding: 20
  },
  topBar: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10
  },
  readButton: {
    backgroundColor: '#ECECEC',
    borderRadius: 7,
    padding: '7px 5px 7px 5px',
    '&:hover': {
      backgroundColor: '#E8E8E8'
    },
    minWidth: 70,
    marginLeft: 15,
    height: 50
  },
  mainForm: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'flex-end'
  },
  mainBox: {
    width: '100%'
  },
  input: {
    color: '#000000'
  },
  mainInput: {}
}));

function Main(props) {
  const classes = useStyles();

  // set state
  const [url, setUrl] = useState('');
  const [content, setContent] = useState(false);

  // handle submit button
  const handleSubmit = async e => {
    e.preventDefault();

    // call content getter
    var response = await getContent(url);
    setContent(response);
    e.target.select();
  };

  // handle form entry
  const handleChange = e => {
    setUrl(e.target.value);
  };

  console.log('content state', content);

  // main render
  if (content === false) {
    return (
      <div className={classes.content}>
        <div className={classes.mainDiv}>
          <Box className={classes.mainBox}>
            <Typography variant="h6" className={classes.h6}>
              read things
            </Typography>
            <form className={classes.mainForm} onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="text"
                value={url}
                name="url"
                onChange={handleChange}
                autoFocus
                variant="outlined"
                placeholder="https://www.nytimes.com/2020/04/04/opinion/sunday/coronavirus-trump-jared-kushner.html"
                label="URL"
                className={classes.mainInput}
                InputProps={{
                  style: {
                    fontSize: 11,
                    width: '100%'
                  },
                  className: classes.input,
                  endAdornment: (
                    <InputAdornment>
                      <IconButton type="submit">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </Box>
        </div>
      </div>
    );
  } else if (content) {
    return (
      <div>
        <div className={classes.topBar}>
          <form
            className={classes.mainForm}
            style={{
              width: '60%'
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              InputProps={{
                style: {
                  fontSize: 11
                }
              }}
              type="text"
              label="URL"
              variant="outlined"
              value={url}
              name="url"
              onChange={handleChange}
              autoFocus
              placeholder="URL"
              style={{ width: '85%', fontSize: 8 }}
            />
            <ButtonBase
              color="primary"
              className={classes.readButton}
              type="submit"
              variant="contained"
            >
              <Typography variant="body2">read it</Typography>
            </ButtonBase>
          </form>
        </div>
        <div className={classes.main}>
          <h2>{content.title}</h2>
          <h5>{content.author}</h5>
          {content.body.map(p => (
            <p>{p}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default Main;

// p.slice(0) === '+' ? (
//   <a href={p.slice(5, p.indexOf('+', 1))}>{p.slice(p.indexOf('+', 1))}</a>
// )
