import { createReducer } from "actionware";

const openModal = (name, payload) => ({ name, payload });
const closeModal = name => ({ name });

export const actions = {
  openModal,
  closeModal
};

export const reducer = createReducer({})
  .on(actions.openModal, (state, { name, payload }) => {
    return { ...state, [name]: { isOpen: true, payload } };
  })
  .on(actions.closeModal, (state, { name }) => {
    delete state[name];
    return { ...state };
  });
