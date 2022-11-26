import React from 'react';
import {Box, Button, IconButton, Text, HStack, useColorModeValue, useDisclosure} from '@chakra-ui/react';
import {BsTrashFill, BsPencil} from 'react-icons/bs';

import DeletePrayerAlert from './DeletePrayerAlert';

type Props = {
  id: string,
  title: string,
  text: string,
  onEdit: () => void,
}

function PrayerCard({id, title, text, onEdit}: Props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const bg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box as="details" w="full">
      <Button as="summary" listStyleType="none" w="full" justifyContent="space-between" fontWeight="bold" fontSize="xl">
        <Box w="full" overflow="hidden" pr="2" noOfLines={1}>
          <Text noOfLines={1}>{title}</Text>
        </Box>
        <HStack spacing='1rem'>
          <IconButton onClick={onEdit} aria-label="Edit prayer" icon={<BsPencil/>} size="sm" colorScheme="green"/>
          <IconButton onClick={onOpen} aria-label="Delete prayer" icon={<BsTrashFill/>} size="sm" colorScheme="red"/>
        </HStack>
      </Button>
      <Box bg={bg} my="2" mx="4" p="1" rounded="sm">
        {/* This won't (hypothetically) be dangerous for now since the only one the user could sabotage is themselves.
        However, if we ever integrate a sharing system we will need to run this text through dompurify at its source. */}
        <Text dangerouslySetInnerHTML={{__html: text}} />
      </Box>
      <DeletePrayerAlert isOpen={isOpen} onClose={onClose} all={false} id={id}/>
    </Box>
  );
}

export default PrayerCard;