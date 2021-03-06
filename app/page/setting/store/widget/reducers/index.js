import { combineReducers } from 'redux-immutable';
import byId from './byId';
import currentPage from './currentPage';
import filter from './filter';
import items from './items';
import selectedId from './selectedId';
import totalNumber from './totalNumber';

const widgetReducers = combineReducers({
  byId,
  currentPage,
  filter,
  items,
  selectedId,
  totalNumber,
});

export default widgetReducers;
