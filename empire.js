$(document).ready(function(){
  toHome();
});

$(".Star_Wars").click(function(){
  toHome();
});

$(".inferiors").on('click', ".inferior", function(){
  $("#for_back").show();
  var id=$(this).prop('id');
  console.log($(this).prop('id'));
  var new_character = $.grep(objects, function(e){
    return e.id == id;
  });
  console.log(new_character[0].id);
  $(".character").attr('id', new_character.id);
  $(".character").html("");
  $(".character").html(
    "<img class=\"main_avatar\" src=\"assets/avatars/" + new_character[0].image + "\">\
    <p class=\"name header\">" + new_character[0].name + "</p>\
    <p class=\"position header\">" + new_character[0].post + "</p>"
  );
  determinationOfInferiors(new_character[0].id);
});




function toHome(){
  $(".character").attr('id', undefined);
  $(".character").html(
    "<img class=\"main_avatar\" src=\"assets/avatars/empire.png\" alt=\"Star Wars\">\
    <p class=\"name header\"> Galactic Empire </p>\
    <p class=\"position header\"> Imperial military </p>"
  );
  $("#for_back").hide();
  determinationOfInferiors(undefined);
};

function determinationOfInferiors(character_id){
  $(".inferiors").html("");
  var number_of_inferiors = 0;
  $.each($(objects), function() {
    if (this.parent == character_id)
    {
      number_of_inferiors++;
      $("<div/>", {
          "class": "inferior",
          "id": this.id
      }).appendTo(".inferiors");
      $("#" + this.id).html(
        "<img class=\"avatar\" src=\"assets/avatars/" + this.image + "\">\
        <div class=\"descript\">\
        <p class=\"name\">" + this.name + "</p>\
        <p class=\"position\">" + this.post + "</p>\
        </div>"
      );
    };
  });
};
