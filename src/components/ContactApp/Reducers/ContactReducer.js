/* eslint-disable import/no-anonymous-default-export */
import * as actionTypes from '../Actions/ActionTypes'

export default (state = [], action) => {
  switch (action.type){

    case actionTypes.CREATE_NEW_CONTACT:
    return [
      ...state,
      Object.assign({}, action.contact)
    ]
    default:
      return state
  }
}
