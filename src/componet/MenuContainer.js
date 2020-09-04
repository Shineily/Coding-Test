import React, { useCallback } from 'react';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'center',
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: '#d9ecf2',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const NestedList = React.memo((props) => {
  const classes = useStyles();
  const data = props.dataprops;

  console.log(data);

  const [open, setOpen] = React.useState(new Array(data.length).fill(false));
  const [text, setText] = React.useState('');

  const handleClick = useCallback(
    (index) => () => {
      open[index] = !open[index];
      setOpen([...open]);
    },
    [open]
  );

  const searchText = useCallback((event) => {
    setText(event.target.value);
  }, []);

  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={text}
              onChange={searchText}
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </ListSubheader>
      }
      className={classes.root}
    >
      {data
        .map((sub) => {
          const products = sub.products.filter((prod) =>
            prod.translations.en.title
              .toLowerCase()
              .includes(text.toLowerCase())
          );
          return { ...sub, products };
        })
        .filter((sub) => sub.products.length > 0)
        .map(({ id, products, translations }, index) => (
          <div key={id}>
            <ListItem button onClick={handleClick(index)}>
              <ListItemText
                primary={`${translations.en.title} (${translations.es.title})`}
              />
              {open[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open[index]} timeout='auto' unmountOnExit>
              {products.map(({ translations, id }) => (
                <List component='div' disablePadding key={id}>
                  <ListItem button className={classes.nested}>
                    <ListItemText
                      primary={translations.en.title}
                      secondary={translations.es.title}
                    />
                  </ListItem>
                </List>
              ))}
            </Collapse>
          </div>
        ))}
    </List>
  );
});
