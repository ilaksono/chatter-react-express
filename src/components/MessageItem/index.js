const MessageItem = ({msg, mine}) => {


  return (
    <div className={`${mine ? 'mine ': 'yours '}messages`}>
      <div className={'message last'}>
        {msg.description}
      </div>
    </div>
  )
}
export default MessageItem;