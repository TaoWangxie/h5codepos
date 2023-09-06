import { StateType } from '@/@types'
import { Module } from 'vuex'

const state = {
  mid:true
}
type MidStateType = typeof state

const mid: Module<MidStateType, StateType> = { namespaced: true, ...state }

export { MidStateType, state }
export default mid