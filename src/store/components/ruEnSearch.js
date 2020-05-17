export default{
  computed:{
    ruEnSearch(){
      let val = this.childTitleField
      let translate = {
        ru: '',
        en: ''
      }
      var map = {
        'q' : 'й', 'w' : 'ц', 'e' : 'у', 'r' : 'к', 't' : 'е', 'y' : 'н', 'u' : 'г', 'i' : 'ш', 'o' : 'щ', 'p' : 'з', '[' : 'х', ']' : 'ъ', 'a' : 'ф', 's' : 'ы', 'd' : 'в', 'f' : 'а', 'g' : 'п', 'h' : 'р', 'j' : 'о', 'k' : 'л', 'l' : 'д', ';' : 'ж', '\'' : 'э', 'z' : 'я', 'x' : 'ч', 'c' : 'с', 'v' : 'м', 'b' : 'и', 'n' : 'т', 'm' : 'ь', ',' : 'б', '.' : 'ю'
        };
        for (var i = 0; i < val.length; i++) {
          let count = 0
          for(var key in map){
            if(val[i] === key || val[i] === map[key]){
              translate.ru = translate.ru + map[key]
              translate.en = translate.en + key
              count++
            }
          }
            if(!count){
              translate.ru = translate.ru + val[i]
              translate.en = translate.en + val[i]
            }
        }
        return translate
    },
  }
}
