import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Tooltip,
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
      className={`w-[19rem] xs:w-[360px] sm:w-[400px] lg:w-[420px]  ${
        isArchivePage ? 'bg-default-400' : ''
      } `}
    >
      <CardHeader className='flex gap-3'>
        <div className='w-full'>
          <p className='text-md line-clamp-1'>{title}</p>
        </div>
        <div className='w-full overflow-hidden whitespace-nowrap flex gap-1 pb-2 overflow-x-scroll scroll-hidden'>
          {categories &&
            categories.map((category) => (
              <Chip
                color='success'
                className='select-none'
                variant='faded'
                key={category.id}
              >
                {category.name}
              </Chip>
            ))}
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className='h-36 w-full'>{description}</p>
      </CardBody>
      <Divider />
      <CardFooter className='justify-between'>
        <Button
          className='min-w-16 px-0'
          endContent={
            !isArchivePage ? (
              <Tooltip showArrow placement='bottom' content='Archive'>
                <ArchiveInactiveIcon className='w-5 h-5' />
              </Tooltip>
            ) : (
              <Tooltip showArrow placement='bottom' content='Unarchive'>
                <ArchiveActiveIcon className='w-5 h-5' />
              </Tooltip>
            )
          }
          onPress={handleClickArchive || handleClickActive}
        ></Button>
        <Tooltip showArrow placement='bottom' content='Edit'>
          <Button
            className='min-w-16 px-0'
            variant='light'
            endContent={<EditIcon className='w-5 h-5' />}
            onPress={handleClickEdit}
          ></Button>
        </Tooltip>
        <Tooltip showArrow placement='bottom' content='Delete'>
          <Button
            className='min-w-16 px-0'
            endContent={<DeleteIcon className='w-5 h-5' />}
            color='danger'
            variant='solid'
            onPress={handleClickDelete}
          ></Button>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};
