import { useRouter } from "next/router";
import { Message, Icon } from "semantic-ui-react";
// import { useState } from "react";
import Link from "next/link";

export const HeaderMessage = () => {
  const router = useRouter();
  const isSignup = router.pathname === "/signup";
  // const [hideMessage, setHideMessage] = useState(false)

  return (
    <Message
      // hidden={hideMessage}
      // onDismiss={() => {
      //   setHideMessage(true)
      // }}
      color="teal"
      icon={isSignup ? "settings" : "privacy"}
      header={isSignup ? "Get Started Here" : "Welcome Back"}
      content={
        isSignup ? "Create New Account" : "Login with Email and Password"
      }
    />
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const isSignup = router.pathname === "/signup";
  return (
    <>
      {isSignup ? (
        <>
          <Message warning>
            <Icon name="help" />
            Existing user ? <Link href="/login">Login Here!</Link>
          </Message>
        </>
      ) : (
        <>
          <Message attached="top" info>
            <Icon name="lock" />
            <Link href="/reset">Forgot Password?</Link>
          </Message>
          <Message attached="bottom" warning>
            <Icon name="help" />
            New user ? <Link href="/signup">Signup Here!</Link>
          </Message>
        </>
      )}
    </>
  );
};
