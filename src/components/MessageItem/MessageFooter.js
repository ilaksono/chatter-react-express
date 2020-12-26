const formatDate = (date) => {
  const time = new Date(date).getTime();
  let unit = "second";
  let diff = (new Date().getTime() - time) / 1000;

  if (diff >= 60) {
    // convert to minutes
    diff /= 60;
    unit = "minute";
    if (diff >= 60) {
      // '' hours
      diff /= 60;
      unit = "hour";
      if (diff >= 24) {
        // '' days
        diff /= 24;
        unit = "day";
        if (diff >= 30) {
          // '' months
          diff /= 30;
          unit = "month";
          if (diff >= 12) {
            // '' years
            diff /= 12;
            unit = "year";
          }
        }
      }
    }
  }
  diff = parseInt(diff);
  if (diff !== 1) unit += "s";
  return `${diff} ${unit} ago`;
}

const MessageFooter = ({time, mine}) => {

  return (
    <div className={`msg-foot${mine ? ' head-right' : ' head-left'}`}>
      <h7>
        {formatDate(time)}
      </h7>
    </div>
  )
}

export default MessageFooter;
