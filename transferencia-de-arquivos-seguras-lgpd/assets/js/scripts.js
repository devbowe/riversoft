(function () {
  // ExitPopUp
  $.stickToMe({
    layer: "#stickLayer",
    fadespeed: 400,
    cookie: true,
    cookieExpiration: 86400,
    maxamount: 1,
  });

  //capturando UTM's
  function getUrlParamByName(name, url) {
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
    var cargo = $("#profissao").val();
    var empresa = $("#company").val();
    var aceitouTermos = $("#acceptlgpd");

    if (!nome) {
      $("#name").focus();
      Swal.fire({
        type: "warning",
        text: "Por favor, informe seu nome completo",
        timer: 5000,
      });
    } else if (!validacaoEmail(email) || emailCorporativo(email) == false) {
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
    } else if (telefone.length <= 14) {
      $("#phone").focus();
      Swal.fire({
        type: "warning",
        text: "Por favor, informe o número de telefone válido",
        timer: 5000,
      });
    } else if (!cargo) {
      $("#profissao").focus();
      Swal.fire({
        type: "warning",
        text: "Por favor, informe seu cargo",
        timer: 5000,
      });
    } else if (!empresa) {
      $("#company").focus();
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
        text: "Seus dados estarão seguros conosco. Para continuar, aceite os termos.",
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
        { name: "token_rdstation", value: "ca0085c09fb1228e4f43d1437db4f767" },
        {
          name: "identificador",
          value: "transferencias-de-arquivos-seguras-lgpd",
        },
      ];

      RdIntegration.post(data_array);

      $("input").val("");
      $("select").val("nulo");

      setTimeout(function () {
        location.href = "./obrigado.html";
      }, 500);

      return true;
    }
    return false;
  });

  //Máscaras
  $("#phone").mask("(00) 00000-0000");

  //Remove caracteres especiais do campo
  $("#name").keyup(function () {
    this.value = this.value.replace(
      /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g,
      ""
    );
  });

  // Verifica o formato do E-mail
  function validacaoEmail(email) {
    var verifica =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return verifica.test(String(email).toLowerCase());
  }

  //Verifica se o e-mail é corporativo
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
})();
