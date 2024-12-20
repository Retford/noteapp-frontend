import {
  Button,
  Card,
  CardBody,
  Input,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react';
import { useNoteStore } from '../hooks/note/useNoteStore';

export const NotesForm = ({
  selected,
  createTitle,
  createDescription,
  handleCreateInputChange,
  onSubmitCreate,
  onSubmitEdit,
  editTitle,
  editDescription,
  handleEditInputChange,
  createSelectedCategories,
  isArchiveForm,
  handleMultipleSelectChange,
}) => {
  const { categories } = useNoteStore();
  return (
    <div className='flex flex-col w-full justify-center items-center p-5 relative'>
      <Card className='max-w-full w-[15rem] lg:w-[340px] lg:fixed lg:top-1/3'>
        <CardBody className='overflow-hidden'>
          <Tabs
            fullWidth
            aria-label='Tabs form'
            selectedKey={selected}
            size='md'
          >
            {!isArchiveForm ? (
              <Tab key='create-note' title='Create note'>
                <form className='flex flex-col gap-4' onSubmit={onSubmitCreate}>
                  <Input
                    isRequired
                    label='Title'
                    placeholder='Enter the title'
                    type='text'
                    autoComplete='text'
                    name='createTitle'
                    value={createTitle}
                    onChange={handleCreateInputChange}
                  />
                  <select
                    className='max-w-xs'
                    label='Favorite Animal'
                    placeholder='Select an category'
                    multiple
                    name='createSelectedCategories'
                    value={createSelectedCategories}
                    onChange={handleMultipleSelectChange}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <Textarea
                    isRequired
                    label='Description'
                    placeholder='Enter the description'
                    name='createDescription'
                    value={createDescription}
                    onChange={handleCreateInputChange}
                  />
                  <Button fullWidth type='submit' color='primary'>
                    Create
                  </Button>
                </form>
              </Tab>
            ) : (
              ''
            )}

            <Tab key='edit-note' title='Edit note'>
              <form className='flex flex-col gap-4' onSubmit={onSubmitEdit}>
                <Input
                  isRequired
                  label='Title'
                  placeholder='Enter the title'
                  type='text'
                  autoComplete='text'
                  name='editTitle'
                  value={editTitle}
                  onChange={handleEditInputChange}
                />
                <Textarea
                  isRequired
                  label='Description'
                  placeholder='Enter the description'
                  name='editDescription'
                  value={editDescription}
                  onChange={handleEditInputChange}
                />
                <Button fullWidth type='submit' color='primary'>
                  Save
                </Button>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};
