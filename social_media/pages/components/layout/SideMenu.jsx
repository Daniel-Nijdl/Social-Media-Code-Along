import { useRouter } from "next/router";
import { List, Icon, Divider, Sidebar } from "semantic-ui-react";
import Link from "next/link";
import { logoutUser } from "../../util/auth";


const SideMenu = ({
  user: { email, unreadNotification, unreadMessage, username },
}) => {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;
  return (
    <>
      <List
        // style={{ marginTop: ".25rem" }}
        size="big"
        verticalAlign="middle"
        selection
        className="side-list"
      >
        <Link href="/">
          <List.Item active={isActive("/")}>
            <Icon
              name="home"
              size="large"
              color={isActive("/") ? "teal" : undefined}
            />
            <List.Content>
              <List.Header content="Home" />
            </List.Content>
          </List.Item>
        </Link>

        <Divider hidden />

        <Link href="/messages">
          <List.Item active={isActive("/messages")}>
            <Icon
              name={unreadMessage ? "hand point right" : "mail outline"}
              size="large"
              color={
                isActive("/messages")
                  ? "teal"
                  : unreadMessage
                  ? "orange"
                  : "undefined"
              }
            />
            <List.Content>
              <List.Header content="Messages" />
            </List.Content>
          </List.Item>
        </Link>

        <Divider hidden />

        <Link href="/notifications">
          <List.Item active={isActive("/notifications")}>
            <Icon
              name={unreadNotification ? "hand point right" : "bell outline"}
              size="large"
              color={
                isActive("/notifications")
                  ? "teal"
                  : unreadNotification
                  ? "orange"
                  : "undefined"
              }
            />
            <List.Content>
              <List.Header content="Notifications" />
            </List.Content>
          </List.Item>
        </Link>

        <Divider hidden />

        <Link href={`/${username}`}>
          <List.Item active={router.query.username === username}>
            <Icon
              name="user"
              size="large"
              color={router.query.username === username ? "teal" : undefined}
            />
            <List.Content>
              <List.Header content="Profile" />
            </List.Content>
          </List.Item>
        </Link>

        <Divider hidden />

        <List.Item onClick={() => logoutUser(email)}>
          <Icon name="log out" size="large" />
          <List.Content>
            <List.Header content="Logout" />
          </List.Content>
        </List.Item>
      </List>
    </>
  );
};

export default SideMenu;
