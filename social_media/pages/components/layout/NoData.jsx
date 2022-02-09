import { Message, Button } from "semantic-ui-react";

export const NoProfilePost = () => {
  return (
    <>
      <Message
        info
        icon="meh"
        header="Sorry"
        content="User had no posted anything yet"
      />
      <Button
        icon="long arrow alternate left"
        content="Go Back"
        as="a"
        href="/"
      />
    </>
  );
};

export const NoFollowData = () => {};

export const NoMessages = () => {
  return (
    <Message
      info
      icon="telegram plane"
      header="Sorry"
      content="You have not messaged anyone yet. Search above to find a friend!"
    />
  );
};

export const NoPosts = () => {
  return (
    <Message
      info
      icon="meh"
      header="Hey!"
      content="No Posts. Make sure you follow someone"
    />
  );
};
