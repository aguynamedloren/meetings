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

const MeetingListResults = ({ customers, ...rest }) => (
  <Card {...rest}>
    <CardHeader
      title="Meetings"
    />
    <Divider />
    <Box sx={{ minWidth: 1050 }}>
      <Table>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              hover
              key={customer.id}
            >
              <TableCell>
                {moment(customer.createdAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>
                {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </Card>
);

MeetingListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default MeetingListResults;
