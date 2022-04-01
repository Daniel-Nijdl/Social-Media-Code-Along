import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Container, Icon } from "semantic-ui-react";



const Navbar = () => {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  return (
    <Menu fluid borderless pointing secondary className="nav-bar">
      {/* <Menu.Menu text position="left">
      <Menu.Item position="left" header>
        <Icon name="bars" size="large" />
      </Menu.Item>
      </Menu.Menu> */}
      <Container text>
        <Link href="/login">
          <Menu.Item header active={isActive("/login")} position="left">
            <Icon name="sign in" size="large" />
            Login
          </Menu.Item>
        </Link>
        <Link href="/signup">
          <Menu.Item header active={isActive("/signup")}>
            <Icon name="signup" size="large" />
            Sign Up
          </Menu.Item>
        </Link>

      </Container>
      
    </Menu>

    
  );
};

export default Navbar;
