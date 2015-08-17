function parseScores(scores){
  var result = [];
  for(var i = 0;i< scores.length;i++){
    eachScore(scores[i],result);
  }
  return result;
}

function eachScore(scoreObj,result){
  var course = scoreObj.course_name;
  var score = scoreObj.score;
  var name = scoreObj.student_name;
  var scoreId = scoreObj.student_id;
  for(var j = 0; j< result.length; j++){
    if(scoreObj.student_id === result[j].id){
      result[j][course] = score;
      return;
    }
  }
  var obj = {};
  obj.id = scoreId;
  obj.name = name;
  obj[course] = score;
  result.push(obj);
}

module.exports = parseScores;
