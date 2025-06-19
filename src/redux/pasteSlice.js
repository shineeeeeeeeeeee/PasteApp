import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Inner lib,
      // that detects changes to a "draft state" and produces a brand new immutable state based off those changes.
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("Paste already exist")
        return
      }
      // If the course is not in the Pastes, add it to the Pastes
      state.pastes.push(paste)
      
      // Update to localstorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      // show toast
      toast.success("Paste added")
    },

    updatePastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.pastes[index] = paste
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste updated")
      }
    },
    // reducer function takes old state and action and makes a new state out of it
    removeFromPastes: (state, action) => {
      const pasteId = action.payload

      console.log(pasteId)
      const index = state.pastes.findIndex((item) => item._id === pasteId)

      if (index >= 0) {
        // If the course is found in the Pastes, remove it
        state.pastes.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste deleted")
      }
    },
    resetPaste: (state) => {
      state.pastes = []
      // Update to localstorage
      localStorage.removeItem("pastes")
    },
  },
})

export const { addToPastes, removeFromPastes, updatePastes } = pasteSlice.actions

export default pasteSlice.reducer