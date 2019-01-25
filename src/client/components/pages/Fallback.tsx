import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Aligner from "../ui/Aligner";

const Fallback: React.FC = () => (
  <DefaultLayout>
    <Aligner height="100%" justify="center" align="center">
      <p>Loading ...</p>
    </Aligner>
  </DefaultLayout>
);

export default Fallback;
