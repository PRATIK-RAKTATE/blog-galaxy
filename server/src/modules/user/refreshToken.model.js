import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date },
    replacedByToken: { type: String },
    userAgent: String,
    ipAddress: String,
  },
  { timestamps: true }
);

export const RefreshToken = mongoose.model(
  "RefreshToken",
  refreshTokenSchema
);
