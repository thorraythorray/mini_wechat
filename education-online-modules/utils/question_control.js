let questions = [{"answer": "B", "stem": "Lily was so ___looking at the picture that she forgot the time.", "options": [{"content": "carefully", "option": "A"}, {"content": "careful", "option": "B"}], "img": null, "no": 1}, {"answer": "A", "stem": "Putting paper cuts on the windows ______ good luck.", "options": [{"content": "means", "option": "A"}, {"content": "mean", "option": "B"}], "img": null, "no": 2}, {"answer": "B", "stem": "Look!baiTony is wearing a_______coat!", "options": [{"content": "long red beautiful", "option": "A"}, {"content": "beautiful long red", "option": "B"}], "img": "", "no": 3}, {"answer": "A", "stem": "My English name is ______. His Chinese name is ______.?", "options": [{"content": "Jim Green; Sun Huimin", "option": "A"}, {"content": "Green Jim; Sun Huimin", "option": "B"}], "img": "", "no": 4}, {"answer": "A", "stem": "Is it ______ eraser?-No, it isn’t. It’s ______ sharpener.", "options": [{"content": "an; a ", "option": "A"}, {"content": " a; a ", "option": "B"}], "img": null, "no": 5}, {"answer": "B", "stem": "Lily was so ___looking at the picture that she forgot the time.", "options": [{"content": "carefully", "option": "A"}, {"content": "careful", "option": "B"}], "img": null, "no": 6}, {"answer": "A", "stem": "Putting paper cuts on the windows ______ good luck.", "options": [{"content": "means", "option": "A"}, {"content": "mean", "option": "B"}], "img": null, "no": 7}, {"answer": "B", "stem": "Look!baiTony is wearing a_______coat!", "options": [{"content": "long red beautiful", "option": "A"}, {"content": "beautiful long red", "option": "B"}], "img": "", "no": 8}, {"answer": "A", "stem": "My English name is ______. His Chinese name is ______.?", "options": [{"content": "Jim Green; Sun Huimin", "option": "A"}, {"content": "Green Jim; Sun Huimin", "option": "B"}], "img": "", "no": 9}, {"answer": "A", "stem": "Is it ______ eraser?-No, it isn’t. It’s ______ sharpener.", "options": [{"content": "an; a ", "option": "A"}, {"content": " a; a ", "option": "B"}], "img": null, "no": 10}]

var questionControl = {
  questions: questions,
  favorite_list: new Set(),
  wrong_list: new Set(),
  view_list: [],
  vid: 0,
  getNextQuestion: function(step=1) {
    this.vid+=step
    this.vid = Math.min(this.vid, this.view_list.length-1)
    let qid = this.view_list[this.vid]
    return this.questions[qid]
  },
  getPreviousQuestion: function(step=1) {
    this.vid -= step
    this.vid = Math.max(this.vid, 0)
    let qid = this.view_list[this.vid]
    return this.questions[qid]
  },
  isFavorite: function(){
    let qid = this.view_list[this.vid]
    return this.favorite_list.has(qid)
  },
  toggleFavorite: function(){
    let qid = this.view_list[this.vid]
    if (this.favorite_list.has(qid)){
      this.favorite_list.delete(qid)
      return false
    }else{
      this.favorite_list.add(qid)
      return true
    }
  },
  getQuestionCount: function(){
    return this.questions.length
  },
  setFavoriteList: function(list){
    this.favorite_list = new Set(list)
  },
  isWrong: function (qid) {
    return this.wrong_list.has(qid)
  },
  setWrongList: function(list){
    this.wrong_list = new Set(list)
  },
  toggleWrong: function(){
    let qid = this.view_list[this.vid]
    if (this.favorite.has(qid)){
      this.wrong_list.delete(qid)
      return false
    }else{
      this.wrong_list.add(qid)
      return true
    }
  },
  finishedYet: function(){
    return this.vid >= this.view_list.length-1
  }

};



module.exports = {
  questionControl: questionControl
}