import { createSlice } from '@reduxjs/toolkit';

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    isLoadingNotes: true,
    notes: [],
    archivedNotes: [],
    categories: [],
    noteCategories: {},
    activeNote: null,
  },
  reducers: {
    handleSetActiveNote: (state, { payload }) => {
      state.activeNote = payload;
    },
    handleAddNewNote: (state, { payload }) => {
      if (!payload.isArchived) {
        state.notes.push(payload);
      } else {
        state.archivedNotes.push(payload);
      }
      state.activeNote = null;
    },

    handleUpdateNote: (state, { payload }) => {
      const { id, isArchived } = payload;

      if (isArchived) {
        state.notes = state.notes.filter((note) => note.id !== id);
        state.archivedNotes = state.archivedNotes.map((note) =>
          note.id === id ? payload : note
        );
      } else {
        state.archivedNotes = state.archivedNotes.filter(
          (note) => note.id !== id
        );
        state.notes = state.notes.map((note) => {
          if (note.id === payload.id) {
            return payload;
          }
          return note;
        });
      }
      state.activeNote = null;
    },

    handleDeleteNote: (state, { payload }) => {
      const { id, isArchived } = payload;
      if (isArchived) {
        state.archivedNotes = state.archivedNotes.filter(
          (note) => note.id !== id
        );
      } else {
        state.notes = state.notes.filter((note) => note.id !== id);
      }
    },

    handleLoadNotes: (state, { payload = [] }) => {
      state.isLoadingNotes = false;

      state.notes = payload.filter((note) => !note.isArchived);
      state.archivedNotes = payload.filter((note) => note.isArchived);
    },

    handleLoadCategories: (state, { payload = [] }) => {
      state.isLoadingNotes = false;
      payload.forEach((categories) => {
        const existsNote = state.categories.some(
          (dbNote) => dbNote.id === categories.id
        );
        if (!existsNote) {
          state.categories.push(categories);
        }
      });
    },

    handleLoadCategoriesOfNote: (state, { payload }) => {
      const noteIndex = state.notes.findIndex(
        (note) => note.id === payload.noteId
      );
      if (noteIndex !== -1) {
        state.notes[noteIndex].categories = payload.categories;
      }
    },

    handleLogoutNoteApp: (state) => {
      state.isLoadingNotes = true;
      state.notes = [];
      state.archivedNotes = [];
      state.categories = [];
      state.noteCategories = {};
      state.activeNote = null;
    },
  },
});

export const {
  handleAddNewNote,
  handleDeleteNote,
  handleLoadNotes,
  handleLogoutNoteApp,
  handleSetActiveNote,
  handleUpdateNote,
  handleLoadCategories,
  handleAddCategoriesToNote,
  handleLoadCategoriesOfNote,
} = noteSlice.actions;
