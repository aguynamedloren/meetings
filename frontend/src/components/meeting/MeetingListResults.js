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

const MeetingListResults = ({ meetings, ...rest }) => (
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
);

MeetingListResults.propTypes = {
  meetings: PropTypes.array.isRequired
};

export default MeetingListResults;
