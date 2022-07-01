import {
  Card,
  Dropdown,
  DropdownToggle,
  useHtml,
} from "@starter-frontend/html-elements";
import { Fragment, useEffect } from "react";

const Home = () => {
  const { modal } = useHtml();

  useEffect(() => {
    // modal.onOpen({
    //   children: (
    //     <Fragment>
    //       {[...Array(30)].map((_, index) => (
    //         <p key={index}>asdasds</p>
    //       ))}
    //     </Fragment>
    //   ),
    // });
  }, []);
  return (
    <Fragment>
      <Card
        className="p-5"
        $border={{
          color: {
            variant: {
              name: "red",
            },
          },
        }}
      >
        asdasd
      </Card>
      <Dropdown btn={<DropdownToggle>asdasd</DropdownToggle>}>menu</Dropdown>
    </Fragment>
  );
};

export default Home;
