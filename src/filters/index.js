function datetime (timestamp) 
{
  return new Date(parseInt(timestamp) * 1000);
}

export default {
  datetime
}