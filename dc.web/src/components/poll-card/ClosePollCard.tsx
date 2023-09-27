import moment from "moment";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Poll } from "../../types";

export const ClosedPollCard = ({ poll }: { poll: Poll }) => {
  const endDateMoment = moment(poll.endDate);
  return (
    <Card border="secondary" className="mb-4">
      <Card.Body>
        <Card.Title>{poll.title}</Card.Title>
        <Card.Text className="mb-2 text-muted">
          Ended: <b>{endDateMoment.fromNow()}</b> <small> ({endDateMoment.format("MMMM Do YYYY, h:mm:ss a")})</small>
        </Card.Text>
        <Card.Text>{poll.description}</Card.Text>

        <Link to={`/poll/${poll.id}`}>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
