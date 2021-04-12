import _ from "lodash";
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

import {
  NavLink as RouterLink,
} from 'react-router-dom';

const MeetingListResults = ({ meetings, ...rest }) => {
  const rowOpacity = (meeting) => {
    const meeting_start = moment(meeting.occurs_at);
    const now = moment();

    if (now > meeting_start) {
      return "0.4"
    } else if (meeting.status === "cancelled") {
      return "0.25"
    } else {
      return "1.0"
    }
  }

  return (
    <Card {...rest}>
      <CardHeader
        title="Meetings"
      />
      <Divider />
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableBody>
            {meetings.map((meeting) => (
              <TableRow
                hover
                key={meeting.id}
                component={RouterLink}
                to={`/app/meetings/${meeting.id}`}
                sx={{
                  opacity: rowOpacity(meeting),
                  textDecoration: meeting.status === "cancelled" ? "line-through" : "inherit",
                }}
              >
                <TableCell>
                  { moment(meeting.occurs_at).format('MMMM Do YYYY, h:mm A') }
                  { " - " }
                  { moment(meeting.ends_at).format('h:mm A') }
                </TableCell>
                <TableCell>
                  { `${meeting.city}, ${meeting.state}` }
                </TableCell>
                <TableCell>
                  { _.capitalize(meeting.status) }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
};

MeetingListResults.propTypes = {
  meetings: PropTypes.array.isRequired
};

export default MeetingListResults;
