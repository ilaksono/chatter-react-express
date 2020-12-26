

const MessageHeader = ({ username, mine }) => {

  return (
    <div className={`msg-head-container${mine ? ' head-right': ' head-left'}`}>
      <h7>{username}</h7>
    </div>
  );
};
export default MessageHeader;