import _ from "lodash";
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
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import OfflineBoltOutlined from '@material-ui/icons/OfflineBoltOutlined';
import RoomOutlined from '@material-ui/icons/RoomOutlined';

const MeetingDetail = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.currentUser.user);
  const limit = 10;

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
    const meeting = data.data.meeting;
    const users = data.data.users;

    body =
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={4}
          md={4}
          xl={4}
          xs={12}
        >
          <Card>
            <CardHeader
              title="Meeting Details"
            />
            <Divider />
            <CardContent>
              <Box
                sx={{
                  position: 'relative'
                }}
              >
              <Grid
                container
                spacing={2}
                >
                <Grid
                  item
                  xs={12}
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <AccessTimeIcon color="action" />
                  <Typography
                    color="textSecondary"
                    display="inline"
                    sx={{ pl: 1 }}
                    variant="body2"
                  >
                    { moment(meeting.occurs_at).format('MMMM Do YYYY, h:mm A') }
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <RoomOutlined color="action" />
                  <Typography
                    color="textSecondary"
                    display="inline"
                    sx={{ pl: 1 }}
                    variant="body2"
                  >
                    { meeting.location }
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <OfflineBoltOutlined color="action" />
                  <Typography
                    color="textSecondary"
                    display="inline"
                    sx={{ pl: 1 }}
                    variant="body2"
                  >
                    Status: { _.capitalize(meeting.status) }
                  </Typography>
                </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          lg={8}
          md={8}
          xl={8}
          xs={12}
        >
          <Card>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Attendees
                    </TableCell>
                    <TableCell>
                      Response
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      hover
                      key={user.id}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Avatar
                            src={user.avatarUrl}
                            sx={{ mr: 2 }}
                          >
                          </Avatar>
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            { user.name}
                          </Typography>

                          { user.role === "owner" &&
                            <Typography
                              sx={{ pl: 1 }}
                              color="textSecondary"
                            >
                              (Organizer)
                            </Typography>
                          }
                        </Box>
                      </TableCell>
                      <TableCell>
                        { _.capitalize(user.status) }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </Card>
        </Grid>
      </Grid>
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
