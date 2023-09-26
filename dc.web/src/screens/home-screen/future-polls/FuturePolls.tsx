import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Poll } from "../../../types";
import moment from "moment";

interface FuturePollsProps {
  polls: Poll[];
}

export const FuturePolls = ({ polls }: FuturePollsProps) => {
  const futurePolls = polls.filter((poll) => {
    const now = new Date();
    const endDate = new Date(poll.endDate);
    return endDate > now;
  });
  return (
    <>
      {futurePolls.map((poll) => (
        <Col key={poll.id} sm={12} md={6} lg={4} xl={3}>
          <Card border="secondary">
            <Card.Body>
              <Card.Title>{poll.title}</Card.Title>
              <Card.Text className="mb-2 text-muted">
                Ends in: <b>{moment(poll.endDate).fromNow()}</b>
              </Card.Text>
              <Card.Text>{poll.description}</Card.Text>

              <Link to={`/poll/${poll.id}`}>
                <Button variant="primary">Vote</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};
