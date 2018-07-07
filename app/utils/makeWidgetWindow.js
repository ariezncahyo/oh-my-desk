import { BrowserWindow } from 'electron';
import url from 'url';
import * as actions from 'actions/widget';
import store from 'store/storeMain';
import createWidget from 'utils/createWidget';
import updateWidgetContentBounds from 'utils/updateWidgetContentBounds';
import * as PATH from 'constants/path';

const makeWidgetWindow = (id, info) => {
  const widgetInfo = createWidget(id, info);
  const widget = new BrowserWindow({
    acceptFirstMouse: true,
    title: widgetInfo.name,
    x: widgetInfo.position.x,
    y: widgetInfo.position.y,
    width: widgetInfo.size.width,
    height: widgetInfo.size.height,
    alwaysOnTop: widgetInfo.isOnTop,
    autoHideMenuBar: true,
    skipTaskbar: true,
    show: true,
    frame: false,
  });

  widget.loadURL(url.format({
    pathname: `${PATH.ROOT_PATH}/${PATH.WIDGET_PATH}`,
    protocol: 'file:',
    slashes: true,
  }));

  widget.once('ready-to-show', () => {
    widget.show();
  });

  widget.on('move', () => {
    updateWidgetContentBounds(id, widget);
  });

  widget.on('resize', () => {
    updateWidgetContentBounds(id, widget);
  });

  widget.on('closed', () => {
    store.dispatch(actions.closeTargetWidget(id));
  });

  widget.webContents.on('did-finish-load', () => {
    store.dispatch(actions.allocateIdTargetWidget(id));
  });

  return widget;
};

export default makeWidgetWindow;
