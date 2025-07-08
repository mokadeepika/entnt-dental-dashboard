import { createSlice,nanoid } from "@reduxjs/toolkit";

const persist = list => localStorage.setItem("patients", JSON.stringify(list));

const slice = createSlice({
  name:"patients",
  initialState:{ list: JSON.parse(localStorage.getItem("patients")) ?? [] },
  reducers:{
    addPatient:{
      reducer(state,action){
        state.list.push(action.payload);   // mutate-only
        persist(state.list);
      },
      prepare(data){ return { payload:{ id:nanoid(), ...data } }; }
    },
    updatePatient(state,{payload}){
      const i = state.list.findIndex(p=>p.id===payload.id);
      if(i>-1) state.list[i] = payload;
      persist(state.list);
    },
    deletePatient(state,{payload}){
      state.list = state.list.filter(p=>p.id!==payload);
      persist(state.list);
    }
  }
});

export const { addPatient, updatePatient, deletePatient } = slice.actions;
export default slice.reducer;
