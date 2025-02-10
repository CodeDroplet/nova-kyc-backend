import { Request, Response } from "express";
import { formatResponse } from "../utils/formatResponse";
import db from "../db";
import { kycRequests, users } from "../db/schemas";
import { eq, count } from "drizzle-orm";
import { KycStatusType } from "../db/schemas/kycRequests";

class ReportsController {
  public static async read(req: Request, res: Response, next: any): Promise<any> {
    try {
      // Get total users count
      const [{ total: totalUsers }] = await db.select({ total: count(users.id) }).from(users);

      // Get KYC counts by status
      const [{ total: approvedKYC }] = await db
        .select({ total: count(kycRequests.id) })
        .from(kycRequests)
        .where(eq(kycRequests.status, KycStatusType.APPROVED));

      const [{ total: rejectedKYC }] = await db
        .select({ total: count(kycRequests.id) })
        .from(kycRequests)
        .where(eq(kycRequests.status, KycStatusType.REJECTED));

      const [{ total: pendingKYC }] = await db
        .select({ total: count(kycRequests.id) })
        .from(kycRequests)
        .where(eq(kycRequests.status, KycStatusType.PENDING));

      return formatResponse(res, 200, "Reports retrieved successfully", {
        totalUsers,
        approvedKYC,
        rejectedKYC,
        pendingKYC,
      });
    } catch (err: any) {
      next(err);
    }
  }
}

export default ReportsController;
