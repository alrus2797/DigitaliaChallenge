// Create a HomeScreen component that will be used by the home page route
//
// Path: src/components/home-screen/HomeScreen.tsx

import React from "react";
import { useLoaderData } from "react-router-dom";
import { Row } from "react-bootstrap";
import { Poll } from "../../types";
import { FuturePolls } from "./future-polls";

export const HomeScreen = () => {
  const { polls } = useLoaderData() as { polls: Poll[] };

  return (
    <>
      <h1>Latest Polls</h1>
      <Row>
        <FuturePolls polls={polls} />
      </Row>
    </>
  );
};
