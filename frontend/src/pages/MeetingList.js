import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import MeetingListResults from 'src/components/meeting/MeetingListResults';
import customers from 'src/__mocks__/customers';
import axios from 'axios';
import { useQuery } from 'react-query';


const MeetingList = () => {
  const { isLoading, error, data } = useQuery("fetchMeetings", () =>
    axios("meetings")
  )

  let body;

  if (isLoading) {
    body = <p>Loading..</p>
  } else if (error) {
    body = <p>Error!</p>
  } else {
    body = <MeetingListResults meetings={data.data} />
  }

  return (
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
          { body }
        </Container>
      </Box>
    </>
  );
}

export default MeetingList;
