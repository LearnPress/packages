import {combineReducers} from '@wordpress/data';

const {omit} = lodash;
const USER_DATA = {};

export const setItemStatus = (item, status) => {
    const userSettings = {
        ...item.userSettings,
        status
    }

    return {
        ...item,
        userSettings
    }
}

export const userCourse = (state = USER_DATA, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data
            }
        case 'COMPLETE_ITEM':
        case 'MARK_INCOMPLETE_ITEM':
            let courseItems = Object.values(state.courseItems);

            return {
                ...state,
                courseItems: courseItems.reduce((memo, item) => {
                    memo[item.id] = item.id == action.itemId ?
                        setItemStatus(item, action.type === 'COMPLETE_ITEM' ? 'completed' : '') :
                        {...item};
                    return memo;
                }, {})
            }
        case 'START_QUIZ':
        case 'START_QUIZ_SUCCESS':
            return {
                ...state,
                courseItems: Object.values(state.courseItems).reduce((memo, item) => {
                    memo[item.id] = item.id == action.quizId ?
                        setItemStatus(item, action.type === 'START_QUIZ' ? 'started' : '') :
                        {...item};
                    return memo;
                }, {})
            }
        case 'SUBMIT_QUIZ':
            return {
                ...state,
                courseItems: Object.values(state.courseItems).reduce((memo, item) => {
                    memo[item.id] = item.id == action.quizId ?
                        setItemStatus(item, 'completed') :
                        {...item};
                    return memo;
                }, {})
            }
    }
    return state;
};

export default userCourse;