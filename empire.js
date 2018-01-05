$(document).ready(function(){
  toHome();
  function toHome(){
    $("#for_back").hide();
    determinationOfInferiors(undefined);
  }

  function determinationOfInferiors(character_id){
    var number_of_inferiors = 0;
    $.each($(objects), function() {
      if (this.parent == character_id)
      {
        number_of_inferiors++;
        $("<div/>", {
            "class": "inferior btn",
            "id": this.id
        }).appendTo(".inferiors");
        $("#" + this.id).html(
          "<img class=\"avatar\" src=\"assets/avatars/" + this.image + "\">\
          <p class=\"name\">" + this.name + "</p>\
          <p class=\"position\">" + this.post + "</p>"
        );
      };
    });
  }
});
