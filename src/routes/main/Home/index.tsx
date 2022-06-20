import { useHtml } from "@starter-frontend/html-elements";
import { Fragment, useEffect } from "react";

const Home = () => {
  const { modal } = useHtml();

  useEffect(() => {
    modal.onOpen({
      children: (
        <Fragment>
          {[...Array(400)].map((_, index) => (
            <p key={index}>asdasds</p>
          ))}
        </Fragment>
      ),
    });
  }, []);
  return <p>Main Home</p>;
};

export default Home;
