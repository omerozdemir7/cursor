import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    watchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("WatchHistory", watchHistorySchema);

