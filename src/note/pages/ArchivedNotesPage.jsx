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
};
const editFormFields = {
  editTitle: '',
  editDescription: '',
};

export const ArchivedNotesPage = () => {
  const {
    activeNote,
    archivedNotes,
    startSavingNote,
    setActiveNote,
    startDeletingNote,
    startUnarchivingNote,
    startLoadingNotesByCreator,
  } = useNoteStore();

  const [selected, setSelected] = useState('');

  const {
    createTitle,
    createDescription,
    handleInputChange: handleCreateInputChange,
  } = useForm(createFormFields);
  const {
    editTitle,
    editDescription,
    formState: formValuesEdit,
    handleResetForm: handleResetEditForm,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNote]);

  const onSubmitEdit = async (event) => {
    event.preventDefault();

    await startSavingNote({
      ...formValuesEdit,
      title: editTitle,
      description: editDescription,
    });

    handleResetEditForm();
    setSelected('');
  };

  const handleClickEdit = (note) => {
    setActiveNote(note);
    setSelected('edit-note');
  };

  const handleClickDelete = (note) => {
    startDeletingNote(note);
  };

  const handleClickActive = (note) => {
    startUnarchivingNote(note);
  };

  useEffect(() => {
    startLoadingNotesByCreator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
      <Header />
      <div className='grid place-content-center md:grid-cols-3 gap-4 p-5'>
        <section className='col-span-2 flex justify-center items-center gap-4 flex-wrap py-6 my-2 md:py-16 md:my-4'>
          {archivedNotes.map((note) => (
            <CardNotes
              key={note.id}
              {...note}
              handleClickActive={() => handleClickActive(note)}
              handleClickDelete={() => handleClickDelete(note)}
              handleClickEdit={() => handleClickEdit(note)}
              isArchivePage={true}
            />
          ))}
        </section>
        <NotesForm
          selected={selected}
          handleEditInputChange={handleEditInputChange}
          editTitle={editTitle}
          editDescription={editDescription}
          createTitle={createTitle}
          createDescription={createDescription}
          handleCreateInputChange={handleCreateInputChange}
          onSubmitEdit={onSubmitEdit}
          isArchiveForm={true}
        />
      </div>
      <Footer />
    </div>
  );
};
