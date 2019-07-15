import {
  EDIT_TREE_PARENT,
  EDIT_TREE_CHILD,
  SET_CURRENT_STYLE,
  RENAME_PACKAGE,
  RENAME_PROJECT,
  SET_NODE,
  SET_ACTIVE,
  SET_TREE,
  SET_PACKAGES,
  SET_STYLES,
  CLEAR_TREE,
  SET_STYLE_DATA,
  SET_PACKAGE_DATA,
  DELETE_PROJECT,
  GET_PROJECTS,
  EDIT_TREE_PACK,
  RENAME_STYLE
} from "../../actions/actionTypes/actionTypes";
import shortid from "shortid";

const initialState = {
  treeData: [],
  projectResponse: {
    data: []
  },
  packages: {
    data: []
  },
  styles: {
    data: []
  },
  uploadedFiles: [],
  isChildstyle: false,
  currentStyle: 0,
  activeId: -1,
  isStyle: false,
  node: {}
};

export default (state = initialState, action) => {
  const {
    type,
    projId,
    isRename,
    id,
    currentStyle,
    name,
    node,
    packageId,
    activeId,
    isStyle,
    styles,
    stData,
    packages,
    thumbnails,
    treeData,
    data,
    elements,
    projectResponse,
    project
  } = action;

  switch (type) {
    case SET_TREE:
      return {
        ...state,
        treeData
      };
    case GET_PROJECTS:
      return {
        ...state,
        treeData: [
          ...state.treeData,
          {
            ...project,
            parent: true,
            isRename: false,
            actId: shortid.generate(),
            children: []
          }
        ],
        projectResponse: projectResponse
          ? projectResponse
          : state.projectResponse
      };
    case DELETE_PROJECT:
      const filteredProjects = state.treeData.filter(proj => proj.id !== id);

      return {
        ...state,
        treeData: filteredProjects
      };
    case SET_ACTIVE:
      return {
        ...state,
        activeId,
        isStyle
      };
    case CLEAR_TREE:
      return {
        ...state,
        activeId: -1,
        isStyle: false,
        node: {},
        treeConfigs: {
          name: "Объект 1",
          parent: true,
          isRename: false,
          id: 0,
          children: [],
          elements: []
        }
      };
    case SET_STYLES:
      const updatedProjs = state.treeData.map(td => {
        const newMap = td.children.map(items => {
          stData.forEach(item => {
            if (items.id === item.package_id) {
              return {
                ...items,
                children: items.children.push({
                  ...item,
                  package_id: item.package_id,
                  project_id: projId,
                  actId: shortid.generate(),
                  isRename: false,
                  child: true,
                  children: [
                    {
                      name: "Полы",
                      id: shortid.generate(),
                      actId: shortid.generate(),
                      checkChild: true,
                      subParent: true,
                      children: [
                        {
                          name: "Балкон",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "Ванная",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "Комнаты",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "Кухня",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "СУ",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          elements: []
                        }
                      ]
                    },
                    {
                      name: "Стены",
                      id: shortid.generate(),
                      actId: shortid.generate(),
                      child: true,
                      checkChild: true,
                      subParent: true,
                      children: [
                        {
                          name: "Балкон",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "Ванная",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "Комнаты",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "Кухня",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "СУ",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        }
                      ]
                    },
                    {
                      name: "Оборудование",
                      id: shortid.generate(),
                      actId: shortid.generate(),
                      child: true,
                      checkChild: true,
                      subParent: true,
                      children: [
                        {
                          name: "Балкон",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "Ванная",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "Комнаты",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "Кухня",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        },
                        {
                          name: "СУ",
                          checkChild: true,
                          subStyle: true,
                          id: shortid.generate(),
                          actId: shortid.generate(),
                          elements: []
                        }
                      ]
                    }
                  ]
                })
              };
            }
          });
          return items;
        });

        return {
          ...td,
          children: newMap
        };
      });

      return {
        ...state,
        treeData: updatedProjs,
        styles: {
          ...styles,
          data: [...state.styles.data, ...styles.data]
        }
      };
    case SET_STYLE_DATA:
      let smArr = [];
      const updatedStyles = state.styles.data.map(style => {
        if (style.id === data.id) {
          return {
            ...style,
            ...data
          };
        } else {
          return style;
        }
      });

      const addedObjs = state.styles.data.filter(style => style.id === data.id);
      if (addedObjs.length) {
        smArr = updatedStyles;
      } else {
        smArr = [...state.styles.data, data];
      }

      return {
        ...state,
        styles: {
          ...state.styles,
          data: smArr
        }
      };
    case SET_PACKAGE_DATA:
      let pckgArr = [];
      const updatedPacks = state.packages.data.map(pack => {
        if (pack.id === data.id) {
          return {
            ...pack,
            ...data
          };
        } else {
          return pack;
        }
      });

      const checkPacks = state.packages.data.filter(
        pack => pack.id === data.id
      );
      if (checkPacks.length) {
        pckgArr = updatedPacks;
      } else {
        pckgArr = [...state.packages.data, data];
      }

      return {
        ...state,
        packages: {
          ...state.packages,
          data: pckgArr
        }
      };
    case SET_PACKAGES:
      return {
        ...state,
        packages: {
          ...state.packages,
          packages
        }
      };
    case SET_CURRENT_STYLE:
      return {
        ...state,
        currentStyle
      };

    case SET_NODE:
      return {
        ...state,
        node
      };

    case RENAME_PROJECT:
      const updatedProjects = state.treeData.map(proj => {
        if (proj.id === id) {
          return {
            ...proj,
            name,
            isRename
          };
        }
        return proj;
      });

      return {
        ...state,
        treeData: updatedProjects
      };

    case RENAME_PACKAGE:
      const upProjs = state.treeData.map(td => {
        if (td.id === projId) {
          const pCh = td.children.map(tp => {
            if (tp.id === id) {
              return {
                ...tp,
                isRename,
                name
              };
            } else {
              return tp;
            }
          });

          return {
            ...td,
            children: pCh
          };
        } else {
          return td;
        }
      });

      return {
        ...state,
        treeData: upProjs
      };

    case RENAME_STYLE:
      const updProjs = state.treeData.map(td => {
        if (td.id === projId) {
          const upPck = td.children.map(ts => {
            if (ts.id === packageId) {
              const aa = ts.children.map(ee => {
                if (id === ee.id) {
                  return {
                    ...ee,
                    isRename,
                    name
                  };
                } else {
                  return ee;
                }
              });

              return {
                ...ts,
                children: aa
              };
            } else {
              return ts;
            }
          });

          return {
            ...td,
            children: upPck
          };
        } else {
          return td;
        }
      });

      return {
        ...state,
        isStyle: true,
        treeData: updProjs
      };

    case EDIT_TREE_PACK:
      let arr = [];
      const updatedPjs = state.treeData.map(td => {
        const pCh = packages.data.filter(pack => pack.project_id === td.id);
        if (pCh.length) {
          arr = pCh.map(p => ({
            ...p,
            isRename: false,
            actId: shortid.generate(),
            styleChild: true,
            children: []
          }));
        } else {
          arr = td.children;
        }

        return {
          ...td,
          children: arr
        };
      });

      return {
        ...state,
        treeData: updatedPjs,
        packages: {
          ...packages,
          data: [...state.packages.data, ...packages.data]
        }
      };
    case EDIT_TREE_PARENT:
      const upP = state.treeData.map(td => {
        if (td.id === projId) {
          return {
            ...td,
            children: [
              ...td.children,
              {
                name: "Новый вид",
                id,
                actId: shortid.generate(),
                project_id: projId,
                styleChild: true,
                isRename: false,
                description: null,
                price: 0,
                children: [],
                elements: []
              }
            ]
          };
        } else {
          return td;
        }
      });

      return {
        ...state,
        isChildstyle: true,
        activeId: id,
        treeData: upP
      };
    case EDIT_TREE_CHILD:
      const upChildrens = state.treeData.map(td => {
        if (td.id === projId) {
          const upPck = td.children.map(ts => {
            if (ts.id === packageId) {
              return {
                ...ts,
                children: [
                  ...ts.children,
                  {
                    id,
                    package_id: packageId,
                    project_id: projId,
                    actId: shortid.generate(),
                    isStyle: true,
                    isRename: false,
                    child: true,
                    elements,
                    name,
                    thumbnails,
                    children: [
                      {
                        name: "Полы",
                        id: shortid.generate(),
                        actId: shortid.generate(),
                        checkChild: true,
                        subParent: true,
                        children: [
                          {
                            name: "Балкон",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "Ванная",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "Комнаты",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "Кухня",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "СУ",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            elements: []
                          }
                        ]
                      },
                      {
                        name: "Стены",
                        id: shortid.generate(),
                        actId: shortid.generate(),
                        child: true,
                        checkChild: true,
                        subParent: true,
                        children: [
                          {
                            name: "Балкон",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "Ванная",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "Комнаты",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "Кухня",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "СУ",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          }
                        ]
                      },
                      {
                        name: "Оборудование",
                        id: shortid.generate(),
                        actId: shortid.generate(),
                        child: true,
                        checkChild: true,
                        subParent: true,
                        children: [
                          {
                            name: "Балкон",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "Ванная",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "Комнаты",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "Кухня",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          },
                          {
                            name: "СУ",
                            checkChild: true,
                            subStyle: true,
                            id: shortid.generate(),
                            actId: shortid.generate(),
                            elements: []
                          }
                        ]
                      }
                    ]
                  }
                ]
              };
            } else {
              return ts;
            }
          });

          return {
            ...td,
            children: upPck
          };
        } else {
          return td;
        }
      });

      return {
        ...state,
        isStyle: true,
        treeData: upChildrens
      };

    default:
      return state;
  }
};
