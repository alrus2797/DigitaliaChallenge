import { Button, Card, Col, Row } from "react-bootstrap";
import { Poll, PollChoice } from "../../types";
import { useLoaderData } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { createVote } from "../../services/votes";
import { Vote } from "../../types/Vote";
import { useState } from "react";

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

  return (
    <div>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <Row>
        {poll.pollChoices.map((choice) => (
          <Col>
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
        ))}
      </Row>
    </div>
  );
};
