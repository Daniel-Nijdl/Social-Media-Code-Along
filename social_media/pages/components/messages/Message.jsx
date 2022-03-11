import React, { useState } from "react";
import { Icon, Popup } from "semantic-ui-react";
import calculateTime from "../../util/calculateTime";

const Message = ({ message, user, deleteMsg, bannerProfilePic, divRef }) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  
  const isSender = message.sender === user._id;
  return (
    <div className="bubbleWrapper" ref={divRef}>
      <div 
      className={isSender && "own" + " inlineContainer"}
      onClick={() => isSender && setShowDeleteIcon(!setShowDeleteIcon)}
      >
        <img
        style={{objectFit: "contain", height: "20px", width: "20px"}}
          className="inlineIcon"
          src={isSender ? user.profilePicURL : bannerProfilePic}
        />

        <div className={isSender ? "ownBubble own" : "otherBubble other"}>
          {message.msg}
        </div>
        {showDeleteIcon && (
          <Popup
            triggerRef={
              <Icon
                name="trash"
                color="red"
                style={{ cursor: "pointer" }}
                onClick={() => deleteMsg(message._id)}
              />
            }
            content="This will only delete the message from YOUR inbox, not theirs"
            position="top right"
          />
        )}
      </div>
      <span className={isSender ? "own" : "other"}>
        {calculateTime(message.date)}
      </span>
    </div>
  );
};

export default Message;
