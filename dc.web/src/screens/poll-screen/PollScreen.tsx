import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { Poll, PollChoice } from "../../types";
import { useLoaderData } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { createVote } from "../../services/votes";
import { Vote } from "../../types/Vote";
import { useState } from "react";
import moment from "moment";

export const PollScreen = () => {
  const { storedValue: guestName } = useLocalStorage<string>("guestName", null);
  const { poll, votedChoice } = useLoaderData() as {
    poll: Poll;
    votedChoice: PollChoice[];
  };
  const [votedChoiceId, setVotedChoiceId] = useState<string>(
    votedChoice && votedChoice.length > 0 ? votedChoice[0].id! : ""
  );

  const alreadyVoted = votedChoice && votedChoice.length > 0;

  const saveVote = async (vote: Vote) => {
    try {
      let createdVote = await createVote(vote);
      setVotedChoiceId(createdVote.choiceId);
    } catch (err) {
      console.log("Out error", err);
      alert("Error saving vote");
    }
  };

  const isOpen = new Date(poll.endDate) > new Date();

  return (
    <div>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <p>End Date: {moment(poll.endDate).format("MMMM Do YYYY, h:mm:ss a")}</p>
      <Row>
        {isOpen ? (
          poll.pollChoices.map((choice) => (
            <Col key={choice.id}>
              <Card border={votedChoiceId === choice.id ? "success" : ""}>
                <Card.Body>
                  <Card.Title>{choice.title}</Card.Title>
                  <Card.Text>{choice.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="primary"
                    onClick={() => {
                      console.log(
                        "Voted for",
                        choice.title,
                        choice.id,
                        guestName
                      );
                      saveVote({
                        pollId: poll.id!,
                        choiceId: choice.id!,
                        author: guestName!,
                      });
                    }}
                    disabled={alreadyVoted || votedChoiceId !== ""}
                  >
                    Vote
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{width:"10%"}}>Place</th>
                <th>Choice</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {poll.pollChoices
                .sort((a, b) => b.numberOfVotes! - a.numberOfVotes!)
                .map((choice, index) => (
                  <tr key={choice.id}>
                    <td> { index === 0 ? '🥇' : ''} {index + 1}</td>
                    <td>{choice.title}</td>
                    <td>{choice.numberOfVotes}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Row>
    </div>
  );
};
