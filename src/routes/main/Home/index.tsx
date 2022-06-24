import {
  Dropdown,
  DropdownToggle,
  useHtml,
} from "@starter-frontend/html-elements";
import { Fragment, useEffect } from "react";

const Home = () => {
  const { modal } = useHtml();

  useEffect(() => {
    modal.onOpen({
      children: (
        <Fragment>
          {[...Array(30)].map((_, index) => (
            <p key={index}>asdasds</p>
          ))}
        </Fragment>
      ),
    });
  }, []);
  return (
    <p>
      <Dropdown btn={<DropdownToggle>asdasd</DropdownToggle>}>asdasd</Dropdown>
    </p>
  );
};

export default Home;
