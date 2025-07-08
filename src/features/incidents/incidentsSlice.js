import { createSlice,nanoid } from "@reduxjs/toolkit";

const persist = list => localStorage.setItem("incidents", JSON.stringify(list));

const slice = createSlice({
  name:"incidents",
  initialState:{ list: JSON.parse(localStorage.getItem("incidents")) ?? [] },
  reducers:{
    addIncident:{
      reducer(state,action){
        state.list.push(action.payload);      // mutate-only
        persist(state.list);
      },
      prepare(data){ return { payload:{ id:nanoid(), ...data } }; }
    },
    updateIncident(state,{payload}){
      const idx = state.list.findIndex(i=>i.id===payload.id);
      if(idx>-1) state.list[idx] = payload;
      persist(state.list);
    }
  }
});

export const { addIncident, updateIncident } = slice.actions;
export default slice.reducer;
