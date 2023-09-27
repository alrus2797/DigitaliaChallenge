// Create a HomeScreen component that will be used by the home page route
//
// Path: src/components/home-screen/HomeScreen.tsx

import React from "react";
import { useLoaderData } from "react-router-dom";
import { Row } from "react-bootstrap";
import { Poll } from "../../types";
import { ClosedPolls } from "./closed-polls";

export const ClosedPollsScreen = () => {
  const { polls } = useLoaderData() as { polls: Poll[] };

  return (
    <>
      <h1>Closed Polls</h1>
      <Row>
        <ClosedPolls polls={polls} />
      </Row>
    </>
  );
};
