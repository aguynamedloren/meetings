import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import MeetingListResults from 'src/components/meeting/MeetingListResults';
import customers from 'src/__mocks__/customers';

const MeetingList = () => (
  <>
    <Helmet>
      <title>Meetings | Meetings</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <MeetingListResults customers={customers} />
      </Container>
    </Box>
  </>
);

export default MeetingList;
