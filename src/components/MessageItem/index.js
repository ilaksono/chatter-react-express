const MessageItem = ({msg}) => {


  return (
    <div className={'yours messages'}>
      <div className={'message last'}>
        {msg.description}
      </div>
    </div>
  )
}
export default MessageItem;