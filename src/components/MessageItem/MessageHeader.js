

const MessageHeader = ({ username, mine, color, profile_pic }) => {

  return (
    <div
      className={`msg-head-container${mine
        ? ' head-right'
        : ' head-left'}`}
      style={{
        color: color
      }}
    >
      <img src={profile_pic} style={{width: 36, height: 36, borderRadius: '50%', marginRight: 8}}alt=''/>
      <h7>{username}</h7>
    </div>
  );
};
export default MessageHeader;