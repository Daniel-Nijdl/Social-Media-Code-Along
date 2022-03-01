import { Menu } from "semantic-ui-react";

const ProfileMenuTabs = ({
  activeItem,
  handleItemClick,
  followersLength,
  followingLength,
  ownAccount,
  loggedUserFollowStats
}
) => {
  return (
    <>
      <Menu pointing secondary>
        <Menu.Item
          name="profile"
          active={activeItem === "profile"}
          onClick={() => handleItemClick("profile")}
        />
        <Menu.Item
          name={`${followersLength} followers`}
          active={activeItem === "followers"}
          onClick={() => handleItemClick("followers")}
        />
        <Menu.Item
          name={`${followingLength} following`}
          active={activeItem === "following"}
          onClick={() => handleItemClick("following")}
        />
        {ownAccount && (
          <>
            <Menu.Item
              name="Update Profile"
              active={activeItem === "updateProfile"}
              onClick={() => handleItemClick("updateProfile")}
            />
            <Menu.Item
              name="Update Settings"
              active={activeItem === "updateSettings"}
              onClick={() => handleItemClick("updateSettings")}
            />
          </>
        )}
      </Menu>
    </>
  );
};

export default ProfileMenuTabs;
