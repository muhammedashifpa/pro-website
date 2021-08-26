$('.invalid-box').hide()
// id="invalid-name-span"
// id="invalid-number-span"
// id="invalid-email-span"
// id="invalid-message-span"
/*==============    variables ===============*/
var nameState = false;
var secNameTry = false;
var numberState = false;
var secNumberTry = false;
var emailState = false;
var secEmailTry = false;
var messageState = false;
/*==================================       name validation      =======================================*/
/*==============    restric unwanted elements ===============*/
$('#Inputfullname').keypress(function(event){
    var x = event.which || event.keycode;
    let lastSpaceRegex = /\s$/;
    let valueBox = $('#Inputfullname').val();
    /*=====    restric double space ====*/
    if(lastSpaceRegex.test(valueBox) && x===32){
      return false;
    }
    /*=====    restric first space ====*/
    if(valueBox.length == 0 && x === 32){
      return false
    }
    if((x>=65&&x<=90)||(x>=97&&x<=122)||x===32){
      /*======= make true after false by length ========*/
      if(secNameTry&&valueBox.length>=2){
        nameState=true;
        $("#invalid-name-span").hide()
        $('#nameLabel').css("color", "var(--text-color)");
        console.log('show')
      }
      if(secNameTry&&valueBox.length<4){
        $('#nameLabel').css("color", "red");
        console.log("this also", valueBox.length)
        $("#invalid-name-span").show();
      }
      
      return true
    }
    else{
      return false
    }
})
/*=============  length lesstan 5  ============*/
$('#Inputfullname').blur(function(){
  let valueBox = $('#Inputfullname').val();
  if(valueBox.length<3){
    console.log('minimum 3 char');
    $("#invalid-name-span").show()
    nameState= false;
    secNameTry=true;
    $('#nameLabel').css("color", "red");
  }
})
/*=============  autofill  ============*/
$('#Inputfullname').change(function(){
  let valueBox = $('#Inputfullname').val();
  if(valueBox.length>3){
    console.log('name auto filled');
    $("#invalid-name-span").hide()
    nameState= true;
    $('#nameLabel').css("color", "var(--text-color)");
  }
})
/*========================================     number validation    =======================================*/
$('#InputNumber').keypress(function(event){
  var x = event.which || event.keycode;
  let valueBox = $('#InputNumber').val();
  if(secNumberTry&&valueBox.length==9){
    $('#numberLabel').css("color", "var(--text-color)");
    $('#invalid-number-span').hide();
  }
  /*===== allow number only ====*/
  if((x>=48&&x<=57)){
    return true
  }
  else{
    return false
  }
})

$('#InputNumber').blur(function(){
  let valueBox = $('#InputNumber').val();
  if(valueBox.length<10){
    console.log('minimum 10 num');
    $('#numberLabel').css("color", "red");
    $('#invalid-number-span').show();
    numberState = false;
    secNumberTry = true;
  }
})
/*=============  autofill  ============*/
$('#InputNumber').change(function(){
  let valueBox = $('#InputNumber').val();
  if(valueBox.length<10){
    console.log('minimum 10 num');
    $('#numberLabel').css("color", "red");
    $('#invalid-number-span').show();
    numberState = false;
    secNumberTry = true;
  }
  else{
    $('#numberLabel').css("color", "var(--text-color)");
    $('#invalid-number-span').hide();
    numberState = true;
  }
})
/*========================================       email validation      =======================================*/
// restrict space
$('#InputEmail').keypress(function(event){
    var x = event.which || event.keycode;
    /*===== allow number only ====*/
    if(x==32){
      return false
    }
    else{
      return true
    }
  })
$('#InputEmail').blur(function(){
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let valueBox = $('#InputEmail').val();
  this.value = valueBox.trim();
  if(emailRegex.test(valueBox)){
    console.log('@gmail.com');
    emailState=true;
    $('#labelEmail').css("color", "var(--text-color)");
    $('#invalid-email-span').hide();
    //email true after blur
  }
  else{
    secEmailTry=true;
    emailState=false;
    $('#labelEmail').css("color", "red");
    $('#invalid-email-span').show();
    // email false after blur
  }
})
$('#InputEmail').keyup(function(){
  let valueBox = $('#InputEmail').val();
  this.value = valueBox.replace(/\s/g,'')
  if(secEmailTry){
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(emailRegex.test(valueBox)){
    console.log('@gmail.com');
    emailState=true;
    $('#labelEmail').css("color", "var(--text-color)");
    $('#invalid-email-span').hide();
    // email true after second try
  }
  else{
    emailState=false;
    $('#labelEmail').css("color", "red");
    $('#invalid-email-span').show();
    // email false after second chance
  }
}
})
/*=============  autofill  ============*/
$('#InputEmail').change(function(){
  console.log('autofill')
  let valueBox = $('#InputEmail').val();
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(emailRegex.test(valueBox)){
    console.log('@gmail.com');
    emailState=true;
    $('#labelEmail').css("color", "var(--text-color)");
    $('#invalid-email-span').hide();
    // email true after auto fill
  }
  else{
    secEmailTry=true;
    emailState=false;
    $('#labelEmail').css("color", "red");
    $('#invalid-email-span').show();
    // email false after auto fill
  }
})

/*========================================       message       =======================================*/
$('#InputMessage').keypress(function(){
    var valueBox = $('#InputMessage').val();
    if(valueBox.length>=10){
        $('#invalid-message-span').hide();
        $('#labelMessage').css("color", "var(--text-color)");
        console.log('message satisfied');
        messageState = true;
    }
})
$('#InputMessage').blur(function(){
    var valueBox = $('#InputMessage').val();
    if(valueBox.length<10){
        $('#invalid-message-span').show();
        $('#labelMessage').css("color", "red");
        messageState = false;
    }
})


/*========================================       submission      =======================================*/



/*========================================       Ajax      =======================================*/
$("#gform").submit((e)=>{
  e.preventDefault()
  if(!nameState){
    $('#nameLabel').css("color", "red");
    $("#invalid-name-span").show()
  }
  if(!numberState){
    $('#numberLabel').css("color", "red");
    $("#invalid-number-span").show()
  }
  if(!emailState){
    $('#labelEmail').css("color", "red");
    $("#invalid-email-span").show()
  }
  if(!messageState){ 
    $('#invalid-message-span').show();
    $('#labelMessage').css("color", "red");
  }
  if(nameState&&numberState&&emailState&&messageState){
  $.ajax({
      url:"https://script.google.com/macros/s/AKfycbyssVG5NPkyP_uVbtuE0GRKvVGBwFg8-gOsvc21FihhQbQMRtFA4In_C8HdfP0AqHrBHg/exec",
      data:$("#gform").serialize(),
      method:"post",
      success:function (response){
          alert("Message sent successfully")
          e.preventDefault();
          $('#gform').trigger("reset");
          nameState = false;
          secNameTry = false;
          numberState = false;
          secNumberTry = false;
          emailState = false;
          secEmailTry = false;
          messageState = false;
          //window.location.href="https://google.com"
      },
      error:function (err){
          alert("Something Error")

      }
  })
}
else{
  alert('please fill the form')
  secNameTry = true;
  secEmailTry = true;
  secNumberTry = true;
}
})

/*========================  collaps navbar  ===========================*/
$("#navbarNavAltMarkup").on('show.bs.collapse', function() {
  $('a.nav-linker').click(function() {
      $("#navbarNavAltMarkup").collapse('hide');
  });
});

