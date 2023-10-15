var DataTypes = require("sequelize").DataTypes;
var _antecedentes_higuiene_oral = require("./antecedentes_higuiene_oral");
var _antecedentes_salud = require("./antecedentes_salud");
var _asistentedental = require("./asistentedental");
var _atencion = require("./atencion");
var _consulta = require("./consulta");
var _controles = require("./controles");
var _datos_personales = require("./datos_personales");
var _examen_extraoral = require("./examen_extraoral");
var _examen_intraoral = require("./examen_intraoral");
var _factura = require("./factura");
var _historial_clinico = require("./historial_clinico");
var _horario = require("./horario");
var _iniciar_sesion = require("./iniciar_sesion");
var _inventario = require("./inventario");
var _notificacion = require("./notificacion");
var _odontologo = require("./odontologo");
var _paciente = require("./paciente");
var _pagos = require("./pagos");
var _persona = require("./persona");
var _personal = require("./personal");
var _proveedor = require("./proveedor");
var _reportes = require("./reportes");
var _rol = require("./rol");
var _secretaria = require("./secretaria");
var _turno = require("./turno");
var _usuario = require("./usuario");
var _usuario_rol = require("./usuario_rol");

function initModels(sequelize) {
  var antecedentes_higuiene_oral = _antecedentes_higuiene_oral(sequelize, DataTypes);
  var antecedentes_salud = _antecedentes_salud(sequelize, DataTypes);
  var asistentedental = _asistentedental(sequelize, DataTypes);
  var atencion = _atencion(sequelize, DataTypes);
  var consulta = _consulta(sequelize, DataTypes);
  var controles = _controles(sequelize, DataTypes);
  var datos_personales = _datos_personales(sequelize, DataTypes);
  var examen_extraoral = _examen_extraoral(sequelize, DataTypes);
  var examen_intraoral = _examen_intraoral(sequelize, DataTypes);
  var factura = _factura(sequelize, DataTypes);
  var historial_clinico = _historial_clinico(sequelize, DataTypes);
  var horario = _horario(sequelize, DataTypes);
  var iniciar_sesion = _iniciar_sesion(sequelize, DataTypes);
  var inventario = _inventario(sequelize, DataTypes);
  var notificacion = _notificacion(sequelize, DataTypes);
  var odontologo = _odontologo(sequelize, DataTypes);
  var paciente = _paciente(sequelize, DataTypes);
  var pagos = _pagos(sequelize, DataTypes);
  var persona = _persona(sequelize, DataTypes);
  var personal = _personal(sequelize, DataTypes);
  var proveedor = _proveedor(sequelize, DataTypes);
  var reportes = _reportes(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var secretaria = _secretaria(sequelize, DataTypes);
  var turno = _turno(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);
  var usuario_rol = _usuario_rol(sequelize, DataTypes);

  inventario.belongsTo(asistentedental, { as: "id_asistentedental_asistentedental", foreignKey: "id_asistentedental"});
  asistentedental.hasMany(inventario, { as: "inventarios", foreignKey: "id_asistentedental"});
  pagos.belongsTo(controles, { as: "id_control_controle", foreignKey: "id_control"});
  controles.hasOne(pagos, { as: "pago", foreignKey: "id_control"});
  antecedentes_higuiene_oral.belongsTo(historial_clinico, { as: "codigo_historial_historial_clinico", foreignKey: "codigo_historial"});
  historial_clinico.hasOne(antecedentes_higuiene_oral, { as: "antecedentes_higuiene_oral", foreignKey: "codigo_historial"});
  antecedentes_salud.belongsTo(historial_clinico, { as: "codigo_historial_historial_clinico", foreignKey: "codigo_historial"});
  historial_clinico.hasOne(antecedentes_salud, { as: "antecedentes_salud", foreignKey: "codigo_historial"});
  consulta.belongsTo(historial_clinico, { as: "codigo_historial_historial_clinico", foreignKey: "codigo_historial"});
  historial_clinico.hasOne(consulta, { as: "consultum", foreignKey: "codigo_historial"});
  controles.belongsTo(historial_clinico, { as: "codigo_historial_historial_clinico", foreignKey: "codigo_historial"});
  historial_clinico.hasMany(controles, { as: "controles", foreignKey: "codigo_historial"});
  datos_personales.belongsTo(historial_clinico, { as: "codigo_historial_historial_clinico", foreignKey: "codigo_historial"});
  historial_clinico.hasOne(datos_personales, { as: "datos_personale", foreignKey: "codigo_historial"});
  examen_extraoral.belongsTo(historial_clinico, { as: "codigo_historial_historial_clinico", foreignKey: "codigo_historial"});
  historial_clinico.hasOne(examen_extraoral, { as: "examen_extraoral", foreignKey: "codigo_historial"});
  examen_intraoral.belongsTo(historial_clinico, { as: "codigo_historial_historial_clinico", foreignKey: "codigo_historial"});
  historial_clinico.hasOne(examen_intraoral, { as: "examen_intraoral", foreignKey: "codigo_historial"});
  atencion.belongsTo(odontologo, { as: "id_odontologo_odontologo", foreignKey: "id_odontologo"});
  odontologo.hasMany(atencion, { as: "atencions", foreignKey: "id_odontologo"});
  horario.belongsTo(odontologo, { as: "id_odontologo_odontologo", foreignKey: "id_odontologo"});
  odontologo.hasMany(horario, { as: "horarios", foreignKey: "id_odontologo"});
  inventario.belongsTo(odontologo, { as: "id_odontologo_odontologo", foreignKey: "id_odontologo"});
  odontologo.hasMany(inventario, { as: "inventarios", foreignKey: "id_odontologo"});
  pagos.belongsTo(odontologo, { as: "id_odontologo_odontologo", foreignKey: "id_odontologo"});
  odontologo.hasMany(pagos, { as: "pagos", foreignKey: "id_odontologo"});
  personal.belongsTo(odontologo, { as: "id_odontologo_odontologo", foreignKey: "id_odontologo"});
  odontologo.hasMany(personal, { as: "personals", foreignKey: "id_odontologo"});
  proveedor.belongsTo(odontologo, { as: "id_odontologo_odontologo", foreignKey: "id_odontologo"});
  odontologo.hasMany(proveedor, { as: "proveedors", foreignKey: "id_odontologo"});
  reportes.belongsTo(odontologo, { as: "id_odontologo_odontologo", foreignKey: "id_odontologo"});
  odontologo.hasMany(reportes, { as: "reportes", foreignKey: "id_odontologo"});
  atencion.belongsTo(paciente, { as: "id_paciente_paciente", foreignKey: "id_paciente"});
  paciente.hasMany(atencion, { as: "atencions", foreignKey: "id_paciente"});
  pagos.belongsTo(paciente, { as: "id_paciente_paciente", foreignKey: "id_paciente"});
  paciente.hasMany(pagos, { as: "pagos", foreignKey: "id_paciente"});
  factura.belongsTo(pagos, { as: "id_pago_pago", foreignKey: "id_pago"});
  pagos.hasOne(factura, { as: "factura", foreignKey: "id_pago"});
  usuario.belongsTo(persona, { as: "id_persona_persona", foreignKey: "id_persona"});
  persona.hasOne(usuario, { as: "usuario", foreignKey: "id_persona"});
  pagos.belongsTo(personal, { as: "id_personal_personal", foreignKey: "id_personal"});
  personal.hasMany(pagos, { as: "pagos", foreignKey: "id_personal"});
  usuario_rol.belongsTo(rol, { as: "id_rol_rol", foreignKey: "id_rol"});
  rol.hasMany(usuario_rol, { as: "usuario_rols", foreignKey: "id_rol"});
  atencion.belongsTo(secretaria, { as: "id_secretaria_secretarium", foreignKey: "id_secretaria"});
  secretaria.hasMany(atencion, { as: "atencions", foreignKey: "id_secretaria"});
  factura.belongsTo(secretaria, { as: "id_secretaria_secretarium", foreignKey: "id_secretaria"});
  secretaria.hasMany(factura, { as: "facturas", foreignKey: "id_secretaria"});
  notificacion.belongsTo(secretaria, { as: "id_secretaria_secretarium", foreignKey: "id_secretaria"});
  secretaria.hasMany(notificacion, { as: "notificacions", foreignKey: "id_secretaria"});
  pagos.belongsTo(secretaria, { as: "id_secretaria_secretarium", foreignKey: "id_secretaria"});
  secretaria.hasMany(pagos, { as: "pagos", foreignKey: "id_secretaria"});
  atencion.belongsTo(turno, { as: "id_turno_turno", foreignKey: "id_turno"});
  turno.hasOne(atencion, { as: "atencion", foreignKey: "id_turno"});
  iniciar_sesion.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasOne(iniciar_sesion, { as: "iniciar_sesion", foreignKey: "id_usuario"});
  usuario_rol.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(usuario_rol, { as: "usuario_rols", foreignKey: "id_usuario"});

  return {
    antecedentes_higuiene_oral,
    antecedentes_salud,
    asistentedental,
    atencion,
    consulta,
    controles,
    datos_personales,
    examen_extraoral,
    examen_intraoral,
    factura,
    historial_clinico,
    horario,
    iniciar_sesion,
    inventario,
    notificacion,
    odontologo,
    paciente,
    pagos,
    persona,
    personal,
    proveedor,
    reportes,
    rol,
    secretaria,
    turno,
    usuario,
    usuario_rol,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
