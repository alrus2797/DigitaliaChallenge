import { Button, Stack, Row, Table, Modal, Form } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { Poll, PollChoice } from "../../types";
import moment from "moment";
import { useState } from "react";
import { createPoll } from "../../services";
import { useAuth } from "../../hooks/useAuth";

const emptyPoll = {
  title: "",
  description: "",
  endDate: new Date(),
  pollChoices: [],
};

const emptyChoice = {
  title: "",
};

export const DashboardScreen = () => {
  // Screen to create new polls and see the polls that the user has created
  const { polls: fetchedPolls } = useLoaderData() as { polls: Poll[] };
  const [show, setShow] = useState(false);

  const [polls, setPolls] = useState<Poll[]>(fetchedPolls);

  const [pollTime, setPollTime] = useState<string>(
    new Date().toISOString().slice(11, 16)
  );
  const [pollDate, setPollDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [poll, setPoll] = useState<Poll>(emptyPoll);
  const { user } = useAuth();

  const [choices, setChoices] = useState<PollChoice[]>([
    { ...emptyChoice },
    { ...emptyChoice },
  ]);

  if (!user) {
    return <div>Not logged in</div>;
  }

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    let targetName = e.target.name;
    if (e.target.name === "endDate" || e.target.name === "endTime") {
      return;
    }
    setPoll({ ...poll, [targetName]: e.target.value });
  };

  const savePoll = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endDate = new Date(pollDate + "T" + pollTime + ":00");
    const newPoll = { ...poll, endDate, pollChoices: choices };
    console.log(newPoll, user);
    try {
      const response = await createPoll(newPoll, user.accessToken ?? "");
      console.log(response);
      setPolls([response, ...polls]);
      handleClose();
    } catch (err) {
      console.log(err);
      alert("Error creating poll");
    }
  };
  const handleClose = () => {
    setShow(false);
    setPoll(emptyPoll);
    setChoices([{ ...emptyChoice }, { ...emptyChoice }]);
  };

  return (
    <div>
      <Stack direction="horizontal">
        <h1>Dashboard</h1>
        <Button className="ms-auto" onClick={() => setShow(true)}>
          Create New Poll
        </Button>
      </Stack>

      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Poll Name</th>
              <th># Choices</th>
              <th>End At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll) => {
              return (
                <tr key={poll.id}>
                  <td>{poll.title}</td>
                  <td>{poll.pollChoices.length}</td>
                  <td>{moment(poll.endDate).format("YYYY-MM-DD HH:mm:ss")}</td>
                  <td>View</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={savePoll}>
            <Form.Group className="mb-3" controlId="formPollTitle">
              <Form.Label>Poll Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter poll title"
                required
                name="title"
                onChange={handleChanges}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPollEndDate">
              <Form.Label>Poll End Date</Form.Label>
              <Form.Control
                type="date"
                value={pollDate}
                min={pollDate}
                placeholder="Enter poll end date"
                name="endDate"
                onChange={(e) => {
                  setPollDate(e.target.value);
                }}
                required
              />

              <Form.Label>Poll End Time</Form.Label>
              <Form.Control
                type="time"
                value={pollTime}
                min={pollTime}
                placeholder="Enter poll end time"
                name="endTime"
                onChange={(e) => {
                  setPollTime(e.target.value);
                }}
                step={60}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPollDescription">
              <Form.Label>Poll Description</Form.Label>
              <Form.Control
                value={poll.description}
                as="textarea"
                rows={3}
                placeholder="Enter poll description"
                name="description"
                onChange={handleChanges}
                required
              />
            </Form.Group>

            <hr />

            <Form.Group className="mb-3" controlId="formPollChoices">
              <Form.Label>Poll Choices</Form.Label>
              {choices.map((choice, index) => {
                return (
                  <div key={index}>
                    <Form.Group
                      className="mb-3"
                      controlId="formPollChoiceTitle"
                    >
                      <Form.Label>Choice #{index + 1} Title</Form.Label>
                      <Stack 
                        direction="horizontal"
                        gap={2}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter choice title"
                          required
                          name="title"
                          value={choices[index].title}
                          onChange={(e) => {
                            let newChoices = [...choices];
                            newChoices[index].title = e.target.value;
                            setChoices(newChoices);
                          }}
                        />
                        {index > 1 && <Button variant="outline-danger" size="sm" onClick={() => {
                          let newChoices = choices.filter((choice, i) => i !== index);
                          console.log(newChoices, index, choices)
                          setChoices(newChoices);
                        }}>
                          ❌
                        </Button>}
                      </Stack>
                    </Form.Group>
                  </div>
                );
              })}
            </Form.Group>

            <Button
              variant="primary"
              type="button"
              onClick={() => {
                setChoices([...choices, { ...emptyChoice }]);
              }}
            >
              Add Choice
            </Button>

            <hr />
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
