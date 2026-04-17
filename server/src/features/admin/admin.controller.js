import { getAdminAnalytics } from "./admin.service.js";

function parseDays(value) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 30;
  }

  return Math.max(1, Math.min(365, Math.floor(parsed)));
}

export async function analytics(req, res, next) {
  try {
    const days = parseDays(req.query.days);
    const data = await getAdminAnalytics(days);

    return res.status(200).json({
      success: true,
      message: "Admin analytics fetched successfully",
      analytics: data,
    });
  } catch (error) {
    next(error);
  }
}
