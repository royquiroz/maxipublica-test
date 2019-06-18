const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: "Campo de nombre es obligatorio"
    },
    email: {
      type: String,
      unique: true,
      required: "Campo de email es obligatorio"
    },
    fecha_nacimiento: {
      type: Date
    },
    status: {
      type: String,
      enum: ["confirmacion", "activo", "inactivo"],
      default: "confirmacion"
    },
    deportes_favoritos: {
      type: String,
      enum: ["futbol", "basquetbol", "natacion"]
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "update_at"
    },
    versionKey: false
  }
);

module.exports = mongoose.model("User", userSchema);
