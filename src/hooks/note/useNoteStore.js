import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import noteApi from '../../api/noteApi';
import {
  handleAddCategoriesToNote,
  handleAddNewNote,
  handleDeleteNote,
  handleLoadCategories,
  handleLoadNotes,
  handleSetActiveNote,
  handleUpdateNote,
} from '../../store/slices/note/noteSlice';

export const useNoteStore = () => {
  const dispatch = useDispatch();
  const { notes, archivedNotes, activeNote, categories } = useSelector(
    (state) => state.note
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveNote = (note) => {
    dispatch(handleSetActiveNote(note));
  };

  const startSavingNote = async (note) => {
    try {
      let createdNote;

      if (note.id) {
        await noteApi.put(`/notes/${note.id}`, note);
        dispatch(handleUpdateNote({ ...note, user }));
        Swal.fire('Edited', 'The note has been edited.', 'success');
        return;
      }

      const { data } = await noteApi.post('/notes/new', note);
      createdNote = data.note;

      dispatch(handleAddNewNote({ ...note, id: createdNote.id, user }));
      Swal.fire('Created', 'The note has been created.', 'success');

      if (note.categories?.length > 0 && createdNote?.id) {
        await startAddingCategoriesToNote(createdNote.id, note.categories);
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error saving', error.response.data.msg, 'error');
    }
  };

  const startAddingCategoriesToNote = async (noteId, categoryIds) => {
    try {
      const { data } = await noteApi.post(
        `/categories/notes/${noteId}/add_categories`,
        {
          categoryIds,
        }
      );

      Swal.fire('Success', 'Categories added to note successfully.', 'success');
      console.log(data); // Si quieres ver la respuesta del servidor
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Error adding categories',
        error.response?.data?.error || 'Something went wrong',
        'error'
      );
    }
  };

  const startLoadingNotesByCreator = async () => {
    try {
      const { data } = await noteApi.get('/notes');

      const notesWithCategories = await Promise.all(
        data.notes.map(async (note) => {
          const categoriesResponse = await noteApi.get(
            `/categories/notes/${note.id}`
          );

          const categories = categoriesResponse.data.categories.map(
            (category) => ({
              id: category.id,
              name: category.name,
            })
          );

          return {
            ...note,
            categories,
          };
        })
      );

      dispatch(handleLoadNotes(notesWithCategories));
    } catch (error) {
      console.error('Error loading notes with categories:', error);
    }
  };

  const startDeletingNote = async (note) => {
    try {
      await noteApi.delete(`/notes/${note.id}`);
      dispatch(handleDeleteNote(note));
      Swal.fire('Deleted', 'The note has been deleted', 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Error deleting', error.response.data.msg, 'error');
    }
  };

  const startArchivingNote = async (note) => {
    try {
      const { data } = await noteApi.put(`/notes/${note.id}/archive`);

      dispatch(handleUpdateNote({ ...data.note }));
      Swal.fire('Archived', 'The note has been archived.', 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Error archiving', error.response.data.msg, 'error');
    }
  };

  const startUnarchivingNote = async (note) => {
    try {
      const { data } = await noteApi.put(`/notes/${note.id}/activate`);
      dispatch(handleUpdateNote({ ...data.note }));
      Swal.fire('Unarchived!', 'The note has been unarchived.', 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Error unarchiving', error.response.data.msg, 'error');
    }
  };

  const startLoadingNoteCategories = async () => {
    try {
      const { data } = await noteApi.get('/categories');

      dispatch(handleLoadCategories(data.categories));
    } catch (error) {
      console.log('Error loading notes');
      console.log(error);
    }
  };

  const startLoadingCategoriesOfNote = async (noteId) => {
    try {
      const { data } = await noteApi.get(`/categories/notes/${noteId}`);

      dispatch(
        handleAddCategoriesToNote({
          noteId,
          categories: data.categories,
        })
      );
    } catch (error) {
      console.log('Error loading categories');
      console.log(error);
    }
  };

  return {
    activeNote,
    archivedNotes,
    categories,
    notes,
    setActiveNote,
    startAddingCategoriesToNote,
    startArchivingNote,
    startDeletingNote,
    startLoadingCategoriesOfNote,
    startLoadingNoteCategories,
    startLoadingNotesByCreator,
    startSavingNote,
    startUnarchivingNote,
  };
};
