import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { NestedList } from './MenuContainer';
import { useFetchData } from '../hooks/useFetchData';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      // key={keyID}
    >
      {value === index && (
        <Box>
          <Typography component={'span'} variant={'body2'}>
            {children}
          </Typography>
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

function SimpleTabs() {
  const data = useFetchData();
  const [value, setValue] = React.useState(0);

  const handleChange = useCallback((e, newValue) => {
    setValue(newValue);
  }, []);

  console.log(data);

  return (
    <>
      <AppBar position='static' color='default'>
        <Tabs
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          {data.map(({ title, id }, ind) => (
            <Tab value={ind} label={title.en.title} key={id} />
          ))}
        </Tabs>
      </AppBar>
      {data.map(({ id, sub }, indeX) => (
        <TabPanel value={value} index={indeX} key={id}>
          <NestedList dataprops={sub} />
        </TabPanel>
      ))}
    </>
  );
}

export default SimpleTabs;
