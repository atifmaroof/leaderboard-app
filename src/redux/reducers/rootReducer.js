import { combineReducers } from "redux"
import leaderboard from "./leaderboard"

const rootReducer = combineReducers({
  leaderboard: leaderboard,
})

export default rootReducer
