import { useRouter } from "next/router";
import { List, Icon } from "semantic-ui-react";
import Link from "next/link";
import { logoutUser } from "../../util/auth";

const SideMenu = ({
  user: { email, unreadNotification, unreadMessage, username },
}) => {
  return (
    <>
      <List>
        <List.Item onClick={() => logoutUser(email)}>
          <Icon name="home" size="large" />
          <List.Content>
            <List.Header content="Home" />
          </List.Content>
        </List.Item>
      </List>
    </>
  );
};

export default SideMenu;
