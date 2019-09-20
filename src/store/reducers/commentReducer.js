import uuid from 'uuid/v1';

const SET_TABS = 'SET_TABS';
const DELETE_TAB = 'DELETE_TAB';
const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

const initialState = {
  tabs: [],
  activeTab: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABS: {
      const newTab = { ...action.payload, tabId: uuid() };
      return {
        ...state,
        tabs: [...state.tabs, newTab],
        activeTab: newTab,
      };
    }
    case SET_ACTIVE_TAB: {
      return { ...state, activeTab: action.payload };
    }
    case DELETE_TAB: {
      const filteredTabs = state.tabs.filter(
        prevTab => prevTab.tabId !== action.payload
      );
      return { ...state, tabs: filteredTabs };
    }
    default:
      return {
        ...state,
      };
  }
};

export default reducer;

export const setTabs = payload => ({
  type: SET_TABS,
  payload,
});
export const setActiveTab = payload => ({
  type: SET_ACTIVE_TAB,
  payload,
});
export const deleteTab = payload => ({
  type: DELETE_TAB,
  payload,
});
