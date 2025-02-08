import { eq } from "drizzle-orm";
import db from "../db";
import { kycRequests, type KycRequestType, type KycStatusType } from "../db/schemas/kycRequests";

class KYCRequest {
  static async create(
    userId: number,
    name: string,
    email: string,
    documentFront: string,
    documentBack: string,
  ): Promise<typeof KycRequestType> {
    const [{ id: kycID }] = await db
      .insert(kycRequests)
      .values({
        userId,
        name,
        email,
        documentFront,
        documentBack,
      })
      .$returningId();

    const newKYC = await db.select().from(kycRequests).where(eq(kycRequests.id, kycID));

    if (!newKYC.length) {
      throw new Error("KYC request not found");
    }

    return newKYC[0];
  }

  static async findOne(id: number): Promise<typeof KycRequestType | null> {
    const kyc = await db.select().from(kycRequests).where(eq(kycRequests.id, id));
    return kyc[0] || null;
  }

  static async findByUserId(userId: number): Promise<Array<typeof KycRequestType>> {
    return db.select().from(kycRequests).where(eq(kycRequests.userId, userId));
  }

  static async findAll(): Promise<Array<typeof KycRequestType>> {
    return db.select().from(kycRequests);
  }

  static async updateStatus(id: number, status: KycStatusType): Promise<typeof KycRequestType | null> {
    await db.update(kycRequests).set({ status }).where(eq(kycRequests.id, id));
    return this.findOne(id);
  }
}

export default KYCRequest;
