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
  const handleClick = (meeting) => {
    console.log("meeting clicked")
    console.log(meeting)
  };

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
              >
                <TableCell>
                  {moment(meeting.occurs_at).format('MM/DD/YYYY')}
                </TableCell>
                <TableCell>
                  {meeting.location}
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
