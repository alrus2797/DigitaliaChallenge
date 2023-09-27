import { Col } from "react-bootstrap";
import { Poll } from "../../../types";
import { OpenPollCard } from "../../../components";

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
          <OpenPollCard poll={poll} />
        </Col>
      ))}
    </>
  );
};
