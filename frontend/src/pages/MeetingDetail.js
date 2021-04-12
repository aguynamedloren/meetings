import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import moment from 'moment';

import {
  Navigate,
  useParams
} from "react-router-dom";

import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider
} from '@material-ui/core';

const MeetingDetail = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.currentUser.user);

  const { isLoading, error, data } = useQuery("fetchMeetings", () =>
    axios.get(`meetings/${id}`, {
      headers: {
        "access-token": currentUser.accessToken,
        "client": currentUser.client,
        "uid": currentUser.uid,
      }
    }),
    {
      retry: false,
    }
  )

  let body;

  if (isLoading) {
    body = <p>Loading..</p>
  } else if (error) {
    console.log("error")
    body = <Navigate to="/404" />
  } else {
    const meeting = data.data;

    body =
      <Card>
        <CardHeader
          title="Meeting"
        />
        <Divider />
        <Box sx={{ minWidth: 1050 }}>
          This is a meeting
          { moment(meeting.occurs_at).format('MM/DD/YYYY') }
          { meeting.location }
        </Box>
      </Card>
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

export default MeetingDetail;
