var colleagues = [];

$(document).ready(function(){
  toHome();
});

//события
$(".Star_Wars").click(function(){
  toHome();
});

$("#for_back").click(function(){
  var id = $.grep(objects, function(e){return e.id == $(".character").attr('id');})[0].parent;
  if (id == undefined)
    toHome();
  else
    renderingOfTheCharacter($.grep(objects, function(e){ return e.id == id;})[0]);
});

$("#to_left").click(function(){
  var index = getIndex();
  if(index-1 >= 0)
    renderingOfTheCharacter(colleagues[index-1]);
});

$("#to_right").click(function(){
  var index = getIndex();
  if(colleagues.length-index-2 >= 0)
    renderingOfTheCharacter(colleagues[index+1]);
});

$(".inferiors").on('click', ".inferior", function(){
  $("#for_back").show();
  $("#to_left").show();
  $("#to_right").show();
  var id=$(this).prop('id');
  renderingOfTheCharacter($.grep(objects, function(e){return e.id == id;})[0]);
});

//функции
function toHome(){
  $("#for_back").hide();
  $("#to_left").hide();
  $("#to_right").hide();

  $(".character").attr('id', "undefined");
  $(".character").html(
    "<img class=\"main_avatar\" src=\"assets/avatars/empire.png\" alt=\"Star Wars\">\
    <p class=\"name_header\"> Galactic Empire </p>\
    <p class=\"position_header\"> Imperial military </p>"
  );
  determinationOfInferiors(undefined);
}

function renderingOfTheCharacter(new_character){
  $(".character").attr('id', new_character.id);
  $(".character").html("");
  $(".character").html(
    "<img class=\"main_avatar\" src=\"assets/avatars/" + new_character.image + "\">\
    <p class=\"name_header\">" + new_character.name + "</p>\
    <p class=\"position_header\">" + new_character.post + "</p>"
  );
  searchColleagues(new_character);
  determinationOfInferiors(new_character.id);
}

function determinationOfInferiors(character_id){
  $(".inferiors").html("");
  $.each (objects, function(){
    if (this.parent == character_id)
    {
      $("<div/>",{"class": "inferior", "id": this.id}).appendTo(".inferiors");

      $("#" + this.id).html(
        "<img class=\"avatar\" src=\"assets/avatars/" + this.image + "\">\
        <div class=\"avatar_hover\"></div>\
        <div class=\"descript\">\
        <p class=\"name\">" + this.name + "</p>\
        <p class=\"position\">" + this.post + "</p>\
        </div>"
      );

      var number_inferiors = countOfInferiors(this.id);
      if (number_inferiors > 0)
        $(".inferior#"+this.id).append("<div class=\"inferiors_count\">" + number_inferiors + "</div>");
    };
  });
}

function countOfInferiors(character_id){
  var inferiors_count = 0;
  $.each (objects, function(){
    if (this.parent == character_id)
      inferiors_count += countOfInferiors(this.id) + 1;
  });
  return inferiors_count;
}

function searchColleagues(character){
  colleagues = [];
  $.each($(objects), function() {
    if (this.parent == character.parent)
      colleagues.push(this);
  });
}

function getIndex(){
  var current_character = $.grep(objects, function(e){
    return e.id == $(".character").attr('id');
  });
  return $.inArray(current_character[0], colleagues);
}
