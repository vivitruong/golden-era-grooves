import Paint from "./apps/Paint";

const gen = () => {
    let id = -1;
    return () => {
      id += 1;
      return id;
    };
  };
  const genId = gen();
  const genIndex = gen();
  export const defaultAppState = [
    {
      component: InternetExplorer,
      header: {
        title: 'Internet Explorer',
        icon: iePaper,
      },
      defaultSize: {
        width: 700,
        height: 500,
      },
      defaultOffset: {
        x: 130,
        y: 20,
      },
      resizable: true,
      minimized: false,
      maximized: window.innerWidth < 800,
      id: genId(),
      zIndex: genIndex(),
    },
    {
      component: Minesweeper,
      header: {
        title: 'Minesweeper',
        icon: mine,
      },
      defaultSize: {
        width: 0,
        height: 0,
      },
      defaultOffset: {
        x: 180,
        y: 170,
      },
      resizable: false,
      minimized: false,
      maximized: false,
      id: genId(),
      zIndex: genIndex(),
    },
    {
      component: Winamp,
      header: {
        title: 'Winamp',
        icon: winamp,
        invisible: true,
      },
      defaultSize: {
        width: 0,
        height: 0,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: false,
      minimized: false,
      maximized: false,
      id: genId(),
      zIndex: genIndex(),
    },
    {
      component: MyComputer,
      header: {
        title: 'My Computer',
        icon: computer,
      },
      defaultSize: {
        width: 660,
        height: 500,
      },
      defaultOffset: {
        x: 250,
        y: 40,
      },
      resizable: true,
      minimized: false,
      maximized: window.innerWidth < 800,
      id: genId(),
      zIndex: genIndex(),
    },
  ];

  export const defaultIconState = [
    {
      id: 4,
      icon: winamp,
      title: 'Winamp',
      component: Winamp,
      isFocus: false,
    },
    {
      id: 5,
      icon: paintLarge,
      title: 'Paint',
      component: Paint,
      isFocus: false,
    },
  ];

  export const appSettings = {


    Winamp: {
      header: {
        icon: winamp,
        title: 'Winamp',
        invisible: true,
      },
      component: Winamp,
      defaultSize: {
        width: 0,
        height: 0,
      },
      defaultOffset: {
        x: 0,
        y: 0,
      },
      resizable: false,
      minimized: false,
      maximized: false,
      multiInstance: false,
    },
    Paint: {
      header: {
        icon: paint,
        title: 'Untitled - Paint',
      },
      component: Paint,
      defaultSize: {
        width: 660,
        height: 500,
      },
      defaultOffset: {
        x: 280,
        y: 70,
      },
      resizable: true,
      minimized: false,
      maximized: window.innerWidth < 800,
      multiInstance: true,
    },
  };

  export { Winamp };
