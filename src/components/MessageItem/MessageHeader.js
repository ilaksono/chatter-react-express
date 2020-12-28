

const MessageHeader = ({ username, mine, color }) => {

  return (
    <div
      className={`msg-head-container${mine
        ? ' head-right'
        : ' head-left'}`}
      style={{
        color: color
      }}
    >
      <h7>{username}</h7>
    </div>
  );
};
export default MessageHeader;