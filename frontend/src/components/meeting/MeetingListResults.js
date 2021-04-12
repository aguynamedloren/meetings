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
                  opacity: meeting.status === "cancelled" ? "0.3" : "inherit",
                  textDecoration: meeting.status === "cancelled" ? "line-through" : "inherit",
                }}
              >
                <TableCell>
                  { moment(meeting.occurs_at).format('MMMM Do YYYY, h:mm A') }
                </TableCell>
                <TableCell>
                  { meeting.location }
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
