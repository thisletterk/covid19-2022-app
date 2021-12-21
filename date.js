module.exports.getDate = getDate;

function getDate() {
  let day = new Date()
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }
  return day.toLocaleDateString('en-UK', options)

}
