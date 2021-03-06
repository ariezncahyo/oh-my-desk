import { createAction } from 'redux-actions';
import updateWidget from 'utils/updateWidget';
import * as TYPES from '../actionTypes';

export const widgetChangeCurrentPage = createAction(TYPES.WIDGET_CHANGE_CURRENT_PAGE);
export const widgetListInfoStore = createAction(TYPES.WIDGET_LIST_INFO_STORE);
export const widgetListSelect = createAction(TYPES.WIDGET_LIST_SELECT);
export const widgetInfoUpdate = createAction(TYPES.WIDGET_INFO_UPDATE,
  (id, update) => ({ id, update }));
export const widgetSelectFilter = createAction(TYPES.WIDGET_SELECT_FILTER);

export const widgetInfoUpdateWithIPC = (id, update) => (dispatch) => {
  const nextData = Object.assign({}, { id }, update);

  dispatch(widgetInfoUpdate(id, update));
  updateWidget('web', nextData);
};
