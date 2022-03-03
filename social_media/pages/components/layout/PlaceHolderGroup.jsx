import {
  Placeholder,
  Divider,
  List,
  Button,
  Card,
  Container,
  Icon,
} from "semantic-ui-react";
import { range } from "lodash";

export const PlaceholderPosts = () =>
  range(1, 3).map((each) => (
    <>
      <Placeholder key={each} fluid>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
      <Divider hidden />
    </>
  ));

export const PlaceholderSuggestions = () => {};

export const PlaceholderNotifications = () => {};

export const EndMessage = () => {};

export const LikesPlaceholder = () =>
  range(1, 6).map((each) => (
    <Placeholder key={each} style={{ minWidth: "200px" }}>
      <Placeholder.Header image>
        <Placeholder.Line length="full" />
      </Placeholder.Header>
    </Placeholder>
  ));
