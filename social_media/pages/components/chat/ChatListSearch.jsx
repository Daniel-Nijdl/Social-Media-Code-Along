import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { List, Image, Search } from "semantic-ui-react";
import { baseURL } from "../../util/auth";
let cancel;

const ChatListSearch = ({ chats, setChats }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleChange = async (e) => {
    const { value } = e.target;
    setText(value);
    setLoading(true);

    try {
      cancel && cancel();
      const token = Cookies.get("token");

      const res = await axios.get(`${baseURL}/api/v1/search/${value}`, {
        headers: { Authorization: `Bearer ${token}` },
        cancelToken: new axios.CancelToken((canceler) => {
          cancel = canceler;
        }),
      });

      if (res.data.length === 0) return setLoading(false);

      setResults(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const addChat = (result) => {
    const alreadyInChat = chats.findIndex(
      (chat) => chat.messagesWith === result._id
    );
    if (alreadyInChat !== -1) {
      return router.push(`/messages?message=${result._id}`);
    }

    const newChat = {
      messagesWith: result._id,
      name: result.name,
      profilePicURL: result.profilePicURL,
      lastMessage: "",
      date: Date.now(),
    };

    setChats((prev) => [newChat, ...prev]);
    return router.push(`/messages?message=${result._id}`);
  };

  return (
    <Search
      onBlur={() => {
        setResults([]);
        setLoading(false);
        setText("");
      }}
      loading={loading}
      value={text}
      resultRenderer={ResultRenderer}
      results={results}
      onSearchChange={handleChange}
      minCharacters={1}
      onResultSelect={(e, data) => addChat(data.results)}
    />
  );
};

const ResultRenderer = ({ _id, profilePicURL, name }) => {
  return (
    <List key={_id}>
      <List.Item>
        <Image avatar circular alt="Profile Pic" src={profilePicURL} />
        <List.Content as="a" header={name} />
      </List.Item>
    </List>
  );
};

export default ChatListSearch;
