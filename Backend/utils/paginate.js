function buildQuery(req){
  const q = {};
  if(req.query.status) q.status = req.query.status;
  if(req.query.priority) q.priority = req.query.priority;
  if(req.query.assignedTo) q.assignedTo = req.query.assignedTo;
  
  return q;
}
module.exports = { buildQuery };
