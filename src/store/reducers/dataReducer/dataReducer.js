import {
  GET_DATA,
  ADD_CHECK_DATA,
  FILTER_CHECK_DATA,
  SET_SAVED_DATA,
  EQ_CHECK_DATA
} from "../../actions/actionTypes/actionTypes";

const initialState = {
  data: {
    tiles: [],
    doors: [],
    showers: [],
    laminates: [],
    walls: []
  },
  checkData: {
    tiles: [],
    doors: [],
    showers: [],
    laminates: [],
    walls: []
  },
  savedCHDATA: null
};

export default (state = initialState, action) => {
  const {
    type,
    arrKey,
    id,
    dArr,
    arrValue,
    mainObj,
    name,
    checked,
    isChRbtn = false,
    isS = false,
    isRbtn,
    checkData
  } = action;

  switch (type) {
    case ADD_CHECK_DATA:
      const updatedArr = state.checkData[name].map(item => {
        if (item.id === Number(id)) {
          return {
            ...item,
            isCheck: checked,
            isChRbtn
          };
        } else {
          return {
            ...item,
            isChRbtn: false
          };
        }
      });

      return {
        ...state,
        checkData: {
          ...state.checkData,
          [name]: updatedArr
        }
      };
    case FILTER_CHECK_DATA:
      const unchecks = state[mainObj][name].filter(item =>
        !isRbtn ? item.id !== +id : item.id === +id
      );

      return {
        ...state,
        [dArr]: {
          ...state[dArr],
          [name]: unchecks
        }
      };

    case EQ_CHECK_DATA:
      let doors = [];
      let walls = [];
      let laminates = [];

      const { doors: d, laminates: l, walls: w } = state.savedCHDATA
        ? state.savedCHDATA
        : state.data;
      const sendedDoors = d.filter(door => door.isCheck);
      const sendedLamins = l.filter(lam => lam.isCheck);
      const sendedWalls = w.filter(wall => wall.isCheck);
      const savedP = {
        tiles: [],
        doors: sendedDoors,
        showers: [],
        laminates: sendedLamins,
        walls: sendedWalls
      };

      Object.keys(checkData).forEach(key => {
        const obj = isS ? savedP : state.data;
        const updChk = obj[key].map((door, i) => {
          let isCheck = false;
          let isChRbtn = false;

          checkData[key].forEach((el, ind) => {
            // console.log(el, door);
            if (el.id === door.id) {
              isChRbtn = true;
              isCheck = true;
            }
            // else {
            //   isChRbtn = checkData[key].length === ind + 1 ? true : false;
            // }
          });

          return {
            ...door,
            isChRbtn,
            isCheck
          };
        });

        switch (key) {
          case "doors":
            doors = updChk;
            break;
          case "walls":
            walls = updChk;
            break;
          case "laminates":
            laminates = updChk;
            break;

          default:
            break;
        }
      });

      return {
        ...state,
        savedCHDATA: isS
          ? savedP
          : {
              tiles: [],
              doors,
              showers: [],
              laminates,
              walls
            },
        checkData: {
          tiles: [],
          doors,
          showers: [],
          laminates,
          walls
        }
      };
    case SET_SAVED_DATA:
      const a = checkData.doors;
      const b = state.savedCHDATA.doors;

      const chLamin = checkData.laminates;
      const svLamin = state.savedCHDATA.laminates;

      const chWalls = checkData.walls;
      const svWalls = state.savedCHDATA.walls;

      const updatedDoors = b.map((item1, i) => {
        const itemFromArr2 = a.find(item2 => item2.id === item1.id);

        if (itemFromArr2) {
          return {
            ...itemFromArr2,
            isChRbtn: false,
            isCheck: true
          };
        } else {
          return {
            ...item1,
            isChRbtn: false,
            isCheck: false
          };
        }
      });

      const updatedLamins = svLamin.map((item1, i) => {
        const itemFromArr2 = chLamin.find(item2 => item2.id === item1.id);

        if (itemFromArr2) {
          return {
            ...itemFromArr2,
            isChRbtn: false,
            isCheck: true
          };
        } else {
          return {
            ...item1,
            isChRbtn: false,
            isCheck: false
          };
        }
      });

      const updatedWalls = svWalls.map((item1, i) => {
        const itemFromArr2 = chWalls.find(item2 => item2.id === item1.id);

        if (itemFromArr2) {
          return {
            ...itemFromArr2,
            isChRbtn: false,
            isCheck: true
          };
        } else {
          return {
            ...item1,
            isChRbtn: false,
            isCheck: false
          };
        }
      });

      return {
        ...state,
        savedCHDATA: {
          tiles: [],
          doors: updatedDoors,
          showers: [],
          laminates: updatedLamins,
          walls: updatedWalls
        }
      };
    case GET_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [arrKey]: arrValue
        },
        checkData: {
          ...state.checkData,
          [arrKey]: arrValue
        }
      };

    default:
      return state;
  }
};
