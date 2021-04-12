import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import MeetingListResults from 'src/components/meeting/MeetingListResults';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const MeetingList = () => {
  const currentUser = useSelector((state) => state.currentUser.user);

  const headers = {
    "access-token": currentUser.accessToken,
    "client": currentUser.client,
    "uid": currentUser.uid,
  }

  const mutation = useMutation(
    () => axios.post('/meetings', {}, { headers }),
    {
      onSuccess: () => {
        refetch();
      }
    }
  )

  const { isLoading, error, data, refetch } = useQuery("fetchMeetings", () =>
    axios.get("meetings", { headers })
  )

  const addMeetingClick = (event) => {
    event.preventDefault();
    mutation.mutate();
  }

  // todo: cleanup
  let body;

  if (isLoading) {
    body = <p>Loading..</p>
  } else if (error) {
    body = <p>Error!</p>
  } else {
    body = <MeetingListResults
      meetings={data.data}
      mutationIsLoading={mutation.isLoading}
      addMeetingClick={addMeetingClick} />
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
