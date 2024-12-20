import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from '@nextui-org/react';
import { EditIcon } from '../assets/icons/EditIcon';
import { DeleteIcon } from '../assets/icons/DeleteIcon';
import { ArchiveInactiveIcon } from '../assets/icons/ArchiveInactiveIcon';
import { ArchiveActiveIcon } from '../assets/icons/ArchiveActiveIcon';

export const CardNotes = ({
  id,
  title,
  description,
  handleClickEdit,
  handleClickDelete,
  handleClickActive,
  handleClickArchive,
  isArchivePage,
  categories,
}) => {
  return (
    <Card
      key={id}
      className={`max-sm:w-[19rem] lg:w-[420px] ${
        isArchivePage ? 'bg-default-400' : ''
      } `}
    >
      <CardHeader className='flex gap-3'>
        <div>
          <p className='text-md line-clamp-1 md:w-[13rem] lg:w-auto lg:max-w-52'>
            {title}
          </p>
        </div>
        {categories &&
          categories.map((category) => (
            <Chip color='success' variant='faded' key={category.id}>
              {category.name}
            </Chip>
          ))}
      </CardHeader>
      <Divider />
      <CardBody>
        <p className='h-36 lg:w-80'>{description}</p>
      </CardBody>
      <Divider />
      <CardFooter className='justify-between'>
        <Button
          className='min-w-16 px-0'
          endContent={
            !isArchivePage ? (
              <ArchiveInactiveIcon className='w-5 h-5' />
            ) : (
              <ArchiveActiveIcon className='w-5 h-5' />
            )
          }
          onPress={handleClickArchive || handleClickActive}
        ></Button>
        <Button
          className='min-w-16 px-0'
          variant='light'
          endContent={<EditIcon className='w-5 h-5' />}
          onPress={handleClickEdit}
        ></Button>
        <Button
          className='min-w-16 px-0'
          endContent={<DeleteIcon className='w-5 h-5' />}
          color='danger'
          variant='solid'
          onPress={handleClickDelete}
        ></Button>
      </CardFooter>
    </Card>
  );
};
