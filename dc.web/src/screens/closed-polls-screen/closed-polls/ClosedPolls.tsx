import { Col } from "react-bootstrap";
import { Poll } from "../../../types";
import { ClosedPollCard } from "../../../components";

interface ClosedPollsProps {
  polls: Poll[];
}

export const ClosedPolls = ({ polls }: ClosedPollsProps) => {
  const futurePolls = polls.filter((poll) => {
    const now = new Date();
    const endDate = new Date(poll.endDate);
    return endDate < now;
  });
  return (
    <>
      {futurePolls.map((poll) => (
        <Col key={poll.id} sm={12} md={6} lg={4} xl={3}>
          <ClosedPollCard poll={poll} />
        </Col>
      ))}
    </>
  );
};
