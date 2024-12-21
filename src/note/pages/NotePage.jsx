import { useEffect, useState } from 'react';
import { CardNotes } from '../../components/CardNotes';
import { NotesForm } from '../../components/NotesForm';
import { useNoteStore } from '../../hooks/note/useNoteStore';
import { useForm } from '../../hooks/useForm';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const createFormFields = {
  createTitle: '',
  createDescription: '',
  createSelectedCategories: [],
};
const editFormFields = {
  editTitle: '',
  editDescription: '',
};

export const NotePage = () => {
  const [selected, setSelected] = useState('create-note');
  const {
    notes,
    activeNote,
    setActiveNote,
    startSavingNote,
    startDeletingNote,
    startLoadingNotesByCreator,
    startArchivingNote,
    startLoadingNoteCategories,
    startLoadingCategoriesOfNote,
  } = useNoteStore();

  const {
    createTitle,
    createDescription,
    createSelectedCategories,
    handleMultipleSelectChange,
    handleResetForm: handleResetCreateForm,
    handleInputChange: handleCreateInputChange,
  } = useForm(createFormFields);
  const {
    editTitle,
    editDescription,
    formState: formValuesEdit,
    setFormState,
    handleInputChange: handleEditInputChange,
  } = useForm(editFormFields);

  useEffect(() => {
    if (activeNote !== null) {
      setFormState({
        ...activeNote,
        editTitle: activeNote.title,
        editDescription: activeNote.description,
      });
    }
  }, [activeNote]);

  //* Create new note
  const onSubmitCreate = async (event) => {
    event.preventDefault();

    console.log(createSelectedCategories);

    setActiveNote({
      title: createTitle,
      description: createDescription,
      categories: createSelectedCategories,
    });

    await startSavingNote({
      title: createTitle,
      description: createDescription,
      //TODO: new CREATE SELECTED
      categories: createSelectedCategories,
    });
    handleResetCreateForm();

    startLoadingCategoriesOfNote(activeNote.id);
  };

  const onSubmitEdit = async (event) => {
    event.preventDefault();

    await startSavingNote({
      ...formValuesEdit,
      title: editTitle,
      description: editDescription,
    });

    setSelected('create-note');
  };

  //* click to edit note
  const handleClickEdit = (note) => {
    setActiveNote(note);
    setSelected('edit-note');
  };

  //* Delete Note
  const handleClickDelete = (note) => {
    startDeletingNote(note);
  };

  //* Add archive note
  const handleClickArchive = (note) => {
    startArchivingNote(note);
  };

  useEffect(() => {
    startLoadingNotesByCreator();
  }, []);

  useEffect(() => {
    startLoadingNoteCategories();
  }, []);

  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
      <Header />
      <div className='lg:grid lg:place-content-center lg:grid-cols-3 gap-4 p-5 flex flex-wrap md:flex-nowrap justify-center items-center h-auto'>
        <section className='lg:col-span-2 flex justify-center items-center gap-4 flex-wrap py-6 my-2 md:py-16 md:my-4 w-full'>
          {notes.map((note) => (
            <CardNotes
              key={note.id}
              {...note}
              handleClickArchive={() => handleClickArchive(note)}
              handleClickDelete={() => handleClickDelete(note)}
              handleClickEdit={() => handleClickEdit(note)}
            />
          ))}
        </section>

        <NotesForm
          selected={selected}
          onSubmitCreate={onSubmitCreate}
          handleEditInputChange={handleEditInputChange}
          editTitle={editTitle}
          editDescription={editDescription}
          createTitle={createTitle}
          createDescription={createDescription}
          createSelectedCategories={createSelectedCategories}
          handleCreateInputChange={handleCreateInputChange}
          onSubmitEdit={onSubmitEdit}
          handleMultipleSelectChange={handleMultipleSelectChange}
        />
      </div>

      <Footer />
    </div>
  );
};
