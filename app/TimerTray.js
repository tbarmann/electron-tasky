const electron = require('electron');
const path = require('path');
const {Tray, app, Menu} = electron;
const isMacOS = process.platform === 'darwin';


class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
    this.mainWindow = mainWindow;
    this.setToolTip('Timer App');
  }

  onClick(event, bounds) {
        // click event bounds
    const {x, y} = bounds;

    // window height and width
    const {height, width} = this.mainWindow.getBounds();
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPosition = isMacOS ? y : y - height;
      this.mainWindow.setBounds({
        x: x - (width/2),
        y: yPosition,
        height,
        width
      });
      this.mainWindow.show();
    }
  }
  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);
    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;