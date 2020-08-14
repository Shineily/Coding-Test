import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NestedList from './MenuContainer';
import axios from '../axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: '#d9ecf2',
  },
}));

function SimpleTabs() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    axios('/menu/product').then((res) => setData(res.data));
    // console.log(data);
  });

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position='static' color='default'>
        <Tabs
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          {data.map((index, ind) => (
            <Tab
              value={ind}
              label={index.translations.en.title}
              {...a11yProps(ind)}
            />
          ))}
        </Tabs>
      </AppBar>
      {data.map((index, ind) => (
        <TabPanel value={value} index={ind} className={classes.root}>
          <NestedList dataprops={index} />
        </TabPanel>
      ))}
    </div>
  );
}

export default SimpleTabs;
