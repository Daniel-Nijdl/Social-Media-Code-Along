import { useState } from "react";
import {
  Segment,
  Image,
  Grid,
  Divider,
  Header,
  Button,
  List,
} from "semantic-ui-react";
import { followUser, unfollowUser } from "../../util/profileActions";

const ProfileHeader = ({
  profile,
  ownAccount,
  loggedUserFollowStats,
  setLoggedUserFollowStats,
}) => {
  const [loading, setLoading] = useState(false);
  const isFollowing = loggedUserFollowStats.following.some(
    (eachUser) => eachUser.user === profile.user._id
  );
  return (
    <>
      <Segment>
        <Grid stackable className="profileGrid">
          <Grid.Column width={11}>
            <Grid.Row>
              <Header
                as="h2"
                content={profile.user.name}
                style={{
                  marginBottom: "5px",
                }}
              />
            </Grid.Row>
            <Grid.Row stretched>
              {profile.bio}
              <Divider hidden />
            </Grid.Row>
            <Grid.Row>
              {profile.social ? (
                <>
                  <List>
                    <List.Item>
                      <List.Icon name="mail" />
                      <List.Content content={profile.user.email} />
                    </List.Item>

                    {profile.social.facebook && (
                      <List.Item>
                        <List.Icon name="facebook" color="blue" />
                        <List.Content
                          as={"a"}
                          href={profile.social.facebook}
                          content={profile.social.facebook}
                        />
                      </List.Item>
                    )}

                    {profile.social.instagram && (
                      <List.Item>
                        <List.Icon name="instagram" color="red" />
                        <List.Content
                          as={"a"}
                          href={profile.social.instagram}
                          content={profile.social.instagram}
                        />
                      </List.Item>
                    )}

                    {profile.social.twitter && (
                      <List.Item>
                        <List.Icon name="twitter" color="blue" />
                        <List.Content
                          as={"a"}
                          href={profile.social.twitter}
                          content={profile.social.twitter}
                        />
                      </List.Item>
                    )}

                    {profile.social.youtube && (
                      <List.Item>
                        <List.Icon name="youtube" color="red" />
                        <List.Content
                          as={"a"}
                          href={profile.social.youtube}
                          content={profile.social.youtube}
                        />
                      </List.Item>
                    )}
                  </List>
                </>
              ) : (
                <p>No Social Media Links</p>
              )}
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={5} stretched style={{ textAlign: "center" }}>
            <Grid.Row>
              <Image size="large" circular avatar src={profile.user.profilePicURL} />
            </Grid.Row>
            <Divider hidden />

            {!ownAccount && (
              <Button
                compact
                loading={loading}
                disabled={loading}
                content={isFollowing ? "Following" : "Follow"}
                icon={isFollowing ? "check circle" : "add user"}
                color={isFollowing ? "instagram" : "twitter"}
                onClick={async () => {
                  setLoading(true);
                  isFollowing
                    ? await unfollowUser(
                        profile.user._id,
                        setLoggedUserFollowStats
                      )
                    : await followUser(
                        profile.user._id,
                        setLoggedUserFollowStats
                      );
                  setLoading(false);
                }}
              />
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
};

export default ProfileHeader;
