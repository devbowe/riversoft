(function () {
  //capturando UTM's
  /*function getUrlParamByName(name, url) {
    if (!url) url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return "";

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  //formulario de contato
  $("#cadastrar").on("click", function (e) {
    e.preventDefault();

    var nome = $("#name").val();
    var email = $("#email").val();
    var telefone = $("#phone").val();
    var cargo = $("#office").val();
    var empresa = $("#business").val();
    var aceitouTermos = $("#acceptlgpd");

    if (!nome) {
      $("#nome").focus();
      Swal.fire({
        type: "warning",
        text: "Por favor, informe seu nome completo",
        timer: 5000,
      });
    } else if (
      !validacaoEmail($("#email").val()) ||
      emailCorporativo($("#email").val()) == false
    ) {
      $("#email").focus();
      Swal.fire({
        type: "warning",
        text: "Por favor, informe seu e-mail corporativo",
        timer: 5000,
      });
    } else if (!telefone) {
      $("#phone").focus();
      Swal.fire({
        type: "warning",
        text: "Por favor, informe seu telefone",
        timer: 5000,
      });
    } else if (!cargo) {
      $("#office").focus();
      Swal.fire({
        type: "warning",
        text: "Por favor, informe seu cargo",
        timer: 5000,
      });
    } else if (!empresa) {
      $("#business").focus();
      Swal.fire({
        type: "warning",
        text: "Por favor, informe sua empresa",
        timer: 5000,
      });
    } else if (!aceitouTermos.is(":checked")) {
      aceitouTermos.focus();
      Swal.fire({
        title: "Suas informações de cadastro estão incompletas",
        type: "warning",
        text:
          "Seus dados estarão seguros conosco. Para continuar, aceite os termos.",
        timer: 5000,
      });
    } else {
      var data_array = [
        { name: "Nome", value: nome },
        { name: "email", value: email },
        { name: "Telefone", value: telefone },
        { name: "Ocupação", value: cargo },
        { name: "Empresa", value: empresa },
        { name: "utm_source", value: getUrlParamByName("utm_source") },
        { name: "utm_medium", value: getUrlParamByName("utm_medium") },
        { name: "utm_campaign", value: getUrlParamByName("utm_campaign") },
        { name: "utm_term", value: getUrlParamByName("utm_term") },
        { name: "utm_content", value: getUrlParamByName("utm_content") },
        { name: "Qualificação do Lead", value: "Marketing Qualify" },
        { name: "token_rdstation", value: "ca0085c09fb1228e4f43d1437db4f767" },
        {
          name: "identificador",
          value: "River Soft - Demonstração STCP Riversoft",
        },
      ];

      RdIntegration.post(data_array);

      $("input").val("");
      $("select").val("nulo");

      setTimeout(function () {
        location.href = "obrigado.html";
      }, 500);

      return true;
    }
    return false;
  });*/

  /*
        Máscaras
    */

  $("#phone").mask("(00) 00000-0000");

  /* $('#nome').keypress(function(e) {
            var keyCode = (e.keyCode ? e.keyCode : e.which); // Variar a chamada do keyCode de acordo com o ambiente.
            if (keyCode > 47 && keyCode < 58) {
              e.preventDefault();
            }
        */

  $("#name").keyup(function () {
    this.value = this.value.replace(
      /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g,
      ""
    );
  });

  $("#email").on("blur", function () {
    if (
      !validacaoEmail($("#email").val()) ||
      emailCorporativo($("#email").val()) == false
    ) {
      $("#email").focus();
      Swal.fire({
        type: "warning",
        text: "Por favor, informe seu e-mail corporativo",
        timer: 5000,
      });
    } else {
      console.log("E-mail ok");
    }
  });

  function validacaoEmail(email) {
    var verifica =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return verifica.test(String(email).toLowerCase());
  }

  var invalidDomains = [
    "@gmail.",
    "@yahoo.",
    "@hotmail.",
    "@live.",
    "@aol.",
    "@outlook.",
    "@bol.",
    "@uol.",
  ];

  function emailCorporativo(email) {
    const emailNormalized = String(email).toLowerCase();
    for (var i = 0; i < invalidDomains.length; i++) {
      var domain = invalidDomains[i];
      if (emailNormalized.indexOf(domain) != -1) {
        return false;
      }
    }
    return true;
  }
})();
