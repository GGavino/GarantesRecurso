"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9643],{9643:(k,p,l)=>{l.r(p),l.d(p,{AddGarantiaPageModule:()=>P});var m=l(177),g=l(4341),r=l(7863),u=l(8986),h=l(467),a=l(4438),f=l(7596);const v=t=>({"background-image":t});function G(t,c){if(1&t){const i=a.RV6();a.j41(0,"ion-button",23),a.bIt("click",function(){a.eBV(i),a.XpG();const n=a.sdS(9);return a.Njj(n.click())}),a.nrm(1,"ion-icon",24),a.k0s()}}function _(t,c){if(1&t&&a.nrm(0,"div",25),2&t){const i=a.XpG();a.Y8G("ngStyle",a.eq3(1,v,"url("+i.novaGarantia.foto+")"))}}function b(t,c){if(1&t){const i=a.RV6();a.j41(0,"ion-datetime",26),a.bIt("ionChange",function(n){a.eBV(i);const o=a.XpG();return a.Njj(o.handleDataDeCompraChange(n))}),a.k0s()}if(2&t){const i=a.XpG();a.FS9("value",i.novaGarantia.dataCompra)}}function C(t,c){if(1&t){const i=a.RV6();a.j41(0,"ion-datetime",27),a.bIt("ionChange",function(n){a.eBV(i);const o=a.XpG();return a.Njj(o.handleDataDeExpiracaoChange(n))}),a.k0s()}if(2&t){const i=a.XpG();a.FS9("value",i.novaGarantia.dataExpiracao)}}const M=[{path:"",component:(()=>{var t;class c{constructor(e,n,o){this.garantiasService=e,this.router=n,this.toastController=o,this.fotoSelecionada=!1,this.TAMANHO_MAXIMO_IMAGEM=1048576,this.novaGarantia={nome:"",modelo:"",dataCompra:(new Date).toISOString(),dataExpiracao:(new Date).toISOString(),observacoes:"",foto:""}}ngOnInit(){}adicionarGarantia(){this.validarCampos()&&(this.garantiasService.addGarantia(this.novaGarantia),this.mostrarMensagem("Garantia adicionada com sucessoaa!"),this.limparCampos(),this.router.navigateByUrl("/tabs/tab1"))}limparCampos(){this.novaGarantia={nome:"",modelo:"",dataCompra:(new Date).toISOString(),dataExpiracao:(new Date).toISOString(),observacoes:"",foto:""}}validarCampos(){if(!this.novaGarantia.nome||""===this.novaGarantia.nome.trim())return this.mostrarMensagem("Por favor, preencha o nome da garantia."),!1;if(!this.novaGarantia.modelo||""===this.novaGarantia.modelo.trim())return this.mostrarMensagem("Por favor, preencha o modelo da garantia."),!1;if(!this.novaGarantia.dataCompra)return this.mostrarMensagem("Por favor, selecione a data de compra da garantia."),!1;if(!this.novaGarantia.dataExpiracao)return this.mostrarMensagem("Por favor, selecione a data de expira\xe7\xe3o da garantia."),!1;if(new Date(this.novaGarantia.dataCompra)>new Date)return this.mostrarMensagem("A data de compra n\xe3o pode ser no futuro."),!1;const o=new Date(this.novaGarantia.dataCompra);return!(new Date(this.novaGarantia.dataExpiracao)<=o&&(this.mostrarMensagem("A data de expira\xe7\xe3o deve ser posterior \xe0 data de compra."),1))}mostrarMensagem(e){var n=this;return(0,h.A)(function*(){(yield n.toastController.create({message:e,duration:3e3,position:"bottom"})).present()})()}escolherFoto(e){var n=this;return(0,h.A)(function*(){const o=e.target.files[0];if(o)try{const d=yield n.convertFileToBase64(o);n.novaGarantia.foto=d}catch(d){console.error("Erro ao converter imagem para base64",d)}})()}voltar(){this.router.navigateByUrl("/tabs/tab1"),this.limparFoto()}convertFileToBase64(e){return new Promise((n,o)=>{const d=new FileReader;d.readAsDataURL(e),d.onload=()=>n(d.result),d.onerror=s=>o(s)})}handleDataDeCompraChange(e){this.novaGarantia.dataCompra=e.detail.value}handleDataDeExpiracaoChange(e){this.novaGarantia.dataExpiracao=e.detail.value}limparFoto(){this.novaGarantia.foto=""}}return(t=c).\u0275fac=function(e){return new(e||t)(a.rXU(f.i),a.rXU(u.Ix),a.rXU(r.K_))},t.\u0275cmp=a.VBU({type:t,selectors:[["app-add-garantia"]],decls:49,vars:7,consts:[["fileInput",""],[1,"ion-padding","back-color2"],[1,"ion-text-center","title-container"],["shape","round","color","yellow",1,"custom-button2",2,"position","fixed","top","16px","left","16px",3,"click"],[1,"black-text","custom-font",2,"font-size","2.5rem"],[1,"content-center"],["type","file","accept","image/*","hidden","",3,"change"],["class","button-border back-color custom-button",3,"click",4,"ngIf"],["class","foto-quadrada",3,"ngStyle",4,"ngIf"],[1,"black-text","custom-font",2,"margin-right","250px","font-size","19px"],[1,"button-border"],["placeholder","Nome da garantia",3,"ngModelChange","ngModel"],["placeholder","Descri\xe7\xe3o do Modelo",3,"ngModelChange","ngModel"],["fixed",""],["size","6"],[1,"black-text","custom-font",2,"font-size","19px"],["datetime","datetimeCompra"],[3,"keepContentsMounted"],["datetime","datetimeExpiracao"],[1,"black-text","custom-font",2,"margin-right","200px","font-size","19px"],["placeholder","Informa\xe7\xf5es Adicionais",3,"ngModelChange","ngModel"],[2,"bottom","16px","left","16px","right","16px","text-align","center"],["shape","round","color","yellow",1,"custom-button3",2,"font-size","20px",3,"click"],[1,"button-border","back-color","custom-button",3,"click"],["slot","icon-only","name","add-circle-outline",1,"custom-icon"],[1,"foto-quadrada",3,"ngStyle"],["id","datetimeCompra","presentation","date-time",3,"ionChange","value"],["id","datetimeExpiracao","presentation","date-time",3,"ionChange","value"]],template:function(e,n){if(1&e){const o=a.RV6();a.j41(0,"ion-content",1)(1,"div",2)(2,"ion-button",3),a.bIt("click",function(){return a.eBV(o),a.Njj(n.voltar())}),a.j41(3,"b"),a.EFF(4,"Voltar"),a.k0s()(),a.j41(5,"h1",4),a.EFF(6,"Garantes"),a.k0s()(),a.j41(7,"div",5)(8,"input",6,0),a.bIt("change",function(s){return a.eBV(o),a.Njj(n.escolherFoto(s))}),a.k0s(),a.DNE(10,G,2,0,"ion-button",7)(11,_,1,3,"div",8),a.k0s(),a.j41(12,"div")(13,"h1",9),a.EFF(14,"Nome"),a.k0s(),a.j41(15,"ion-item",10)(16,"ion-input",11),a.mxI("ngModelChange",function(s){return a.eBV(o),a.DH7(n.novaGarantia.nome,s)||(n.novaGarantia.nome=s),a.Njj(s)}),a.k0s()()(),a.j41(17,"div")(18,"h1",9),a.EFF(19,"Modelo"),a.k0s(),a.j41(20,"ion-item",10)(21,"ion-input",12),a.mxI("ngModelChange",function(s){return a.eBV(o),a.DH7(n.novaGarantia.modelo,s)||(n.novaGarantia.modelo=s),a.Njj(s)}),a.k0s()()(),a.j41(22,"ion-grid",13)(23,"ion-row")(24,"ion-col",14)(25,"div")(26,"h1",15),a.EFF(27,"Data de Compra"),a.k0s(),a.j41(28,"ion-item",10),a.nrm(29,"ion-datetime-button",16),a.j41(30,"ion-modal",17),a.DNE(31,b,1,1,"ng-template"),a.k0s()()()(),a.j41(32,"ion-col",14)(33,"div")(34,"h1",15),a.EFF(35,"Data de Expira\xe7\xe3o"),a.k0s(),a.j41(36,"ion-item",10),a.nrm(37,"ion-datetime-button",18),a.j41(38,"ion-modal",17),a.DNE(39,C,1,1,"ng-template"),a.k0s()()()()()(),a.j41(40,"div")(41,"h1",19),a.EFF(42,"Observa\xe7\xf5es"),a.k0s(),a.j41(43,"ion-item",10)(44,"ion-input",20),a.mxI("ngModelChange",function(s){return a.eBV(o),a.DH7(n.novaGarantia.observacoes,s)||(n.novaGarantia.observacoes=s),a.Njj(s)}),a.k0s()()(),a.j41(45,"div",21)(46,"ion-button",22),a.bIt("click",function(){return a.eBV(o),a.Njj(n.adicionarGarantia())}),a.j41(47,"b"),a.EFF(48,"Adicionar Garantia"),a.k0s()()()()}2&e&&(a.R7$(10),a.Y8G("ngIf",!n.novaGarantia.foto),a.R7$(),a.Y8G("ngIf",n.novaGarantia.foto),a.R7$(5),a.R50("ngModel",n.novaGarantia.nome),a.R7$(5),a.R50("ngModel",n.novaGarantia.modelo),a.R7$(9),a.Y8G("keepContentsMounted",!0),a.R7$(8),a.Y8G("keepContentsMounted",!0),a.R7$(6),a.R50("ngModel",n.novaGarantia.observacoes))},dependencies:[m.bT,m.B3,g.BC,g.vS,r.Jm,r.hU,r.W9,r.A9,r.K4,r.lO,r.iq,r.$w,r.uz,r.ln,r.Sb,r.Je,r.Gw],styles:['@charset "UTF-8";.form-group[_ngcontent-%COMP%]{text-align:center;margin-bottom:50px}.label[_ngcontent-%COMP%]{display:block}.input-container[_ngcontent-%COMP%]{display:inline-block}.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:350px;height:50px}.left-align[_ngcontent-%COMP%]{margin-left:2px}.inputBackground[_ngcontent-%COMP%]{background-color:#fff;padding:10px;border-radius:15px;border-color:#000;border-width:3px}.custom-button[_ngcontent-%COMP%]{width:200px;height:200px;padding:10px}.custom-icon[_ngcontent-%COMP%]{width:100px;height:100px}.custom-button2[_ngcontent-%COMP%]{width:80px;height:50px}.custom-button3[_ngcontent-%COMP%]{width:300px;height:50px}.custom-date[_ngcontent-%COMP%]{border-width:3px;background:#fff}.content-center[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;height:25vh}.foto-quadrada[_ngcontent-%COMP%]{width:200px;height:200px;background-size:cover;background-position:center}']}),c})()}];let x=(()=>{var t;class c{}return(t=c).\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.$C({type:t}),t.\u0275inj=a.G2t({imports:[u.iI.forChild(M),u.iI]}),c})(),P=(()=>{var t;class c{}return(t=c).\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.$C({type:t}),t.\u0275inj=a.G2t({imports:[m.MD,g.YN,r.bv,x]}),c})()}}]);