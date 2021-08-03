module.exports.getdate=getdate;

function getdate()
{
var today= new Date();
var options={day:'numeric',weekday:'long',month:'long'};
var day=today.toLocaleDateString("en-US",options);
return day;

}
console.log(module.exports);
